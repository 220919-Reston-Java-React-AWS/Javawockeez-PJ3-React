import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Button } from '@mui/material';
// import Navbar from '../navbar/Navbar';
import { PostCard } from './PostCard';
import Post from '../../models/Post';
import { apiGetAllPosts } from '../../remote/social-media-api/postFeed.api';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import TextField from '@mui/material/TextField';
import { apiUpsertPost } from '../../remote/social-media-api/post.api';
import {censor} from "../../remote/profanity-api/profanity.api"


export const PostFeed = () => {  
    const [posts, setPosts] = useState<Post[]>([])
    const { user } = useContext(UserContext);
    let welcomeText = 'Welcome!'
    let postForm = <></>;
    let noPostsText = <></>;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        event.currentTarget.reset();

        let censoredText = await censor(data.get('postText')?.toString() || '')
        //let censoredText = data.get('postText')?.toString() || ''

        let payload = new Post(0, censoredText, data.get('postImage')?.toString() || '', [], user, new Date());
        await apiUpsertPost(payload);
        fetchData();
    }

    const fetchData = async () => {
        const result = await apiGetAllPosts()
        setPosts(result.payload.reverse())
    }

    const handlePostRemoval = (post:Post) => {
        setPosts( posts.filter(e => e !== post) )
    }

    useEffect(() => {
        fetchData()
    }, []);

    if (user) {
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
        
        welcomeText = `Welcome, ${user.firstName}!`
    }

    useEffect(() => {
        //scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        
        fetchData()
       }, []);


       if(posts.length === 0) {
            noPostsText = 
            <h2 style={{textAlign: 'center', marginTop: '3%', color: 'gray'}}>
                There are no posts, share your thoughts!
            </h2>;
       }
    
    return (
        <>
           {/* <Navbar /> */}
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