import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import styled from "styled-components";

import { Box, Paper, Grid} from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import Post from "../../models/Post";
import { UserContext } from '../../context/user.context';
import {censor} from "../../remote/profanity-api/profanity.api";
import { apiDeletePost, apiUpsertPost } from '../../remote/social-media-api/post.api';

import "./PostCard.css"

// The elements to be defined when creating the element (postRemoval is *optional*, but not really, for backwards-compatibility)
interface postProps {
    post: Post, // The post itself
    key: number, // A unique identifier (ideally, just the post id)
    postRemoval?:(post:Post) => void, // The method by which this post can be deleted from its container.
}

// A simple interface to help with the expanding window for comments.
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// How the pop-up should be expanded
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    marginLeft: 'auto',
}));


// The Card itself, shows info about the post for post-feeds.

export const PostCard = (props: postProps) => {

  //* ----------     VARIABLES     ---------- *//

  // The user (null if they are not signed in)
  const { user } = useContext(UserContext);
  // A hook to determine whether the comments are expanded.
  const [expanded, setExpanded ] = React.useState(false);

  // It's ridiculous, but it works - Basically, triggered whenever an update is needed, and useEffect doesn't quite work.
  const [dummyHook, setDummyHook] = React.useState(false);

  // Content to be filled in later
  let media = <></>;
  let commentForm = <></>;
  let commentEditForm = <></>;


  //* ----------     METHODS     ---------- *//

  // Expand the comments when icon is clicked.
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Post a comment. Censor the text and send the data to the back-end.
  const handleComment = async (event: React.FormEvent<HTMLFormElement>) => {

    // Prevent page from reloading
    event.preventDefault();
    // Get the data from the form
    const data = new FormData(event.currentTarget);
    // Reset the form so the user can make a new post. (Otherwise their previous post would remain in the input-box)
    event.currentTarget?.reset(); // If this isn't right here, it doesn't work??

    // Send the text to an external api to remove profanity
    let censoredText = await censor(data.get('commentText')?.toString() || '')
    
    // Save the new comment in the post's list of comments
    props.post.comments.push(new Post(0, censoredText, '', [], user, new Date()));

    // Send the updated post (namely it's comments) to the front end to be saved.
    let payload = props.post;
    let newPostResponse = await apiUpsertPost(payload);

    // The there is no error message, include the updated ID (important!), list of comments, and postDate 
    // in the front-end so the data is in-sync.
    if (!newPostResponse.payload.message){
      props.post.id = newPostResponse.payload.id;
      props.post.comments = newPostResponse.payload.comments;
      props.post.postDate = newPostResponse.payload.postDate;
    }

    // Rerender the DOM so the content appears.
    setDummyHook(!dummyHook)
  }

  // Handle the editing of a post. Similar to a new post, the content is censored and then saved to the back end.
  // Less logic is required since the object already exists and only one field should be changed.
  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent page from reloading
    event.preventDefault();
    // Get the data from the form
    const data = new FormData(event.currentTarget);

    // Send the text to an external api to remove profanity
    let censoredText = await censor(data.get('commentText')?.toString() || '')
    props.post.text = censoredText;

    // Upload the edited post
    let payload = props.post;
    await apiUpsertPost(payload);

    // Rerender the DOM
    setDummyHook(!dummyHook)
  }

  // Handle the deletion of a comment. Comment is deleted from the front and back separately.
  const handleDelete = async (event: React.FormEvent) => {
    // Tell the back end to delete the post. All comments are deleted too.
    let payload = props.post;
    await apiDeletePost(payload);

    // Trigger the method which deletes this post's card from the parent's container. 
    // This should be passed in by whatever is creating the card.
    if (props.postRemoval) {props.postRemoval(props.post)}

    // Alert the user to the success (happens everytime, currently there is no logic to check for issues or non-existence front-or-back)
    alert('Post deleted successfully');
  }

  // This method is passed to any comments on this posts.
  // If a comment is deleted, this tells this post to remove it from the list of comment on the post.
  // Done in lou of refreshing and reloading the posts every time.
  const handleCommentRemoval = (comment:Post) => {
    // Remove the comment from this post's comment list.
    props.post.comments = props.post.comments.filter( e => e !== comment )
    // Rerender the DOM
    setDummyHook(!dummyHook);
  }


  //* ----------     SET CONTENT     ---------- *//

  // The form through which a user can make a comment.
  // Contains a text-input box, and a submit button.
  // Appears when the comment icon is clicked and the user is logged in.
  commentForm = 
  <Paper
      component="form"
      sx={{ p: '4px 0', display: 'flex', alignItems: 'center', width: '100%', mb: '15px' }}
      elevation={1}
      onSubmit={handleComment}>
  <InputBase
        sx={{ ml: 1, flex: 1 }}
        id='commentText'
        name='commentText'
        placeholder="Make a comment..."
        inputProps={{ 'aria-label': 'Make a comment' }}
        multiline={true}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="submit">
        <AddCircleIcon color="warning" />
      </IconButton>
  </Paper>

  // The form through which a user can edit a comment.
  // Contains a text-input box, a submit button, and a delete-post icon.
  // Appears when the 'Edit post' text is clicked on one of the user's posts.
  commentEditForm = 
  <Popup trigger={<p className="edit-post-text" id={`${props.post.id}`}>Edit post</p>}>
    <Card>
      <Box component='form' onSubmit={handleEdit} noValidate sx={{ mt: 1 }}>

        <InputBase
         sx={{ ml: 1, flex: 1 }}
         id='commentText'
         name='commentText'
         defaultValue={props.post.text}
         inputProps={{ 'aria-label': 'Edit comment' }}
         multiline={true}
        />

        <IconButton type="submit" sx={{ p: '10px' }} aria-label="submit">
          <AddCircleIcon color="warning" />
        </IconButton>

        <IconButton id='delete-button' type="button" onClick={handleDelete} sx={{ p: '10px' }} aria-label="delete">
          <DeleteIcon sx={{ color: "rgb(100, 100, 150)" }} />
        </IconButton>

      </Box>
    </Card>
  </Popup>

  // If an image-url is included, display the image
  if (props.post.imageUrl) {
    media = <CardMedia
    component="img"
    src = {props.post.imageUrl}
    alt="post image"
    sx={{maxHeight: "300px", width: "auto", marginLeft: "auto", marginRight: "auto" }}
  />
  }

  
  //* ----------     RETURN     ---------- *//

  return (
    <Card sx={{maxWidth:"100%", marginTop:"3%", border:1, borderColor:'secondary.main', borderRadius:'16px' }}>
      
    <CardHeader
      title={props.post.author ? `${props.post.author.firstName} ${props.post.author.lastName}` : "Anonymous"}
      avatar={
          <Avatar sx={{ bgcolor: '#ed6c02' }} aria-label="recipe">
            <Link to={`/profile/${props.post.author?.id}`} style={{ textDecoration: 'none', color: 'white' }}>
              <PersonIcon style={{ textDecoration: 'none' }}/>
            </Link>
          </Avatar>
        }

        /> 
      { media }
      <CardContent>
        <Typography variant="body2" color="text.secondary" whiteSpace={'pre-wrap'}>
          <i>
            {`Created on ${new Date(props.post.postDate).toDateString()}`}
          </i>
          <br/>
          {props.post.text}
        </Typography>
      </CardContent>

      <div className="card-footer">

        {/* npm i reactjs-popup */}
        {user?.id==props.post.author?.id ? commentEditForm : null}
        

      <CardActions disableSpacing>
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <InsertCommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          { user ? commentForm : null }
          <Typography paragraph>comments:</Typography>
          <Grid container justifyContent={"center"}>
                <Grid item sx={{width: '100%'}} >
                    {props.post.comments.map((item) =>(
                    <PostCard post={item} key={item.id} postRemoval={handleCommentRemoval}/>
                ))
                }
                </Grid> 
            </Grid>
        </CardContent>
      </Collapse>
      </div>
    </Card>
      );
}