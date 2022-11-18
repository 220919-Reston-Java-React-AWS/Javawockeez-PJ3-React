import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Button, Avatar } from '@mui/material';
import Navbar from '../navbar/Navbar';
import Post from '../../models/Post';
import { apiGetAllPosts } from '../../remote/social-media-api/postFeed.api';
import { useContext } from 'react';
import { User } from '../../context/user.context';
import TextField from '@mui/material/TextField';
import { apiUpsertPost } from '../../remote/social-media-api/post.api';
import { apiGetAllPostsById, apiGetUserProfileName, apiGetProfileByUserId } from '../../remote/social-media-api/profile.api';
import { PostCard } from '../post-feed/PostCard';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Profile from '../../models/Profile';



export default function Error(){
    const navigate = useNavigate();

    useEffect(() => {
        // scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        
        //timeout to redirect to main page
        setTimeout(() =>{
            navigate('/');
        }, 10000)
    }, []);
    
    return(
        <>
           {/* <Navbar /> */}

            {/* Using grid to layout the profile page */}
            <Grid container 
                direction="column"
                justifyContent="center"
                alignItems="center"
            >

                {/* The profile header: user name */}
                <Grid item justifyContent="center">
                    <Typography variant="h1" sx={{mt:'2vh'}} align='center'> 
                        404: Page does not exist 
                    </Typography>
                    
                    <Typography variant="h4" sx={{mt:'2vh'}} align='center'> 
                        Redirecting back to main 
                    </Typography>
                </Grid>
            </Grid>
        </>
    )

    
}