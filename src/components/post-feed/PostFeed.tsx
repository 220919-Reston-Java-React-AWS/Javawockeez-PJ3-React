import React, { useEffect, useState, useContext } from 'react';
import { Box, Container, Grid, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Post from '../../models/Post';
import { PostCard } from './PostCard';
import { UserContext } from '../../context/user.context';
import { apiGetAllPosts } from '../../remote/social-media-api/postFeed.api';
import { apiUpsertPost } from '../../remote/social-media-api/post.api';
import {censor} from "../../remote/profanity-api/profanity.api"

// Essentially the main page. This component renders a list of posts/comments for the user to see
export const PostFeed = () => {

    //* ----------    VARIABLES     ---------- *//

    // The list of posts
    const [posts, setPosts] = useState<Post[]>([])
    // The user viewing the page (if not logged in, user is null, and no posts load)
    const { user } = useContext(UserContext);
    // Self-explanatory. This appears at the top of the page to greet users. Once logged in, it will include the user's name.
    let welcomeText = 'Welcome!'
    // Form for new posts. To be filled out below.
    let postForm = <></>;
    // Text for when there's no posts. To be filled out below. (Basically just becomes "There are no posts, share your thoughts!")
    let noPostsText = <></>;


    //* ----------     METHODS     ---------- *//

    // What to do when a new post is submitted.
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent page from reloading.
        event.preventDefault();

        // Get the data from the form, and then clear the form for new posts.
        const data = new FormData(event.currentTarget);
        event.currentTarget.reset();

        // Use api to filter profanity.
        let censoredText = await censor(data.get('postText')?.toString() || '')

        // Create a post and send it to the back-end.
        let payload = new Post(0, censoredText, data.get('postImage')?.toString() || '', [], user, new Date());
        await apiUpsertPost(payload);

        // Refetch posts to update page (so any new posts submitted while posting appear too)
        fetchData();
    }

    // Get all the posts (proper, not each comment separately too) from the backend
    const fetchData = async () => {
        // Fetch the posts from the back-end.
        const result = await apiGetAllPosts()
        // Update the list-of-posts hook
        setPosts(result.payload.reverse())
    }

    // How a comment can be deleted from this (to be sent to each comment later)
    const handlePostRemoval = (post:Post) => {
        // Filter out this post, and reset the list
        setPosts( posts.filter(e => e !== post) )
    }


    //* ----------     EFFECTS     ---------- *//

    // Initializing
    useEffect(() => {
        //scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        
        // Get the list of posts
        fetchData()
    }, []);
    

    //* ----------     SET CONTENT     ---------- *//

    // What to do if the user is signed in.
    if (user) {
        // Include the new-post form at the top of the page
        postForm = <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          required
            id="postText"
            name='postText'
            label="Thoughts You Would Like to Share?"
            multiline={true}
            fullWidth
            sx={{"& textarea": {padding: "5px"}, backgroundColor: "box-color"}}
          />
          <TextField
              id="postImage"
              name="postImage"
              label="Add an Image or Diagram?"
              fullWidth
              variant="standard"
              sx={{"& label": {paddingLeft: "10px"}}}
          />
          <Button 
              type="submit"
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              color="warning"
          >
              Create Post
          </Button>
        </Box>
        
        // Change the welcome text to include their name.
        welcomeText = `Welcome, ${user.firstName}!`
    }

    // Text to show if there are no posts in the database (shouldn't really appear unless waiting for the request.)
    if(posts.length === 0) {
        noPostsText = 
        <h2 style={{textAlign: 'center', marginTop: '3%', color: 'gray'}}>
            There are no posts, share your thoughts!
        </h2>;
    }
    

    //* ----------     RETURN     ---------- *//

    return (
        <>
           <Container maxWidth="xl" sx={{
                height: 'auto',
                overflow: 'auto'
            }}>
                <h2 style={{textAlign: 'center'}}>{ welcomeText }</h2>
                { postForm }             
            </Container> 
            <Grid container justifyContent={"center"}>
                <Grid item sx={{width: '60%', mb: '20px'}} >
                    {posts.map((item) =>(
                    <PostCard post={item} key={item.id} postRemoval={handlePostRemoval}/>
                ))
                }
                </Grid> 
            </Grid>
            { noPostsText } 
        </>
    )
};