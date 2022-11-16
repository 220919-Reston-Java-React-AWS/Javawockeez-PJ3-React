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
import Profile from '../../models/Profile';


export default function UserProfile(){
    const [post, setPosts] = useState<Post[]>([])
    const [user, setUser] = useState<User>();
    const [profile, setProfile] = useState<Profile>();
    let userNameText = `User does not exist`;
    let userAboutText = `${user?.firstName} ${user?.lastName} has yet to write about themselves. They'll get around to it at some point.`;

    // for vertical tabs
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // On window page load
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); //scroll to top on page load
        fetchProfileNameData(); // user profile data
        fetchPostData(); // get post data for user profile
        fetchProfileData(); // get profile about and images
    }, []);

    // Get the User's Name using the url
    const fetchProfileNameData = async() => {
        // get window url path name (removes domain)
        const location = window.location.pathname;
        // get the user id at the end of path
        const strUserId = location.substring(location.lastIndexOf('/') + 1)
        
        // get user data
        const response = await apiGetUserProfileName(strUserId);
        if (response.status >= 200 && response.status < 300) {
            setUser(response.payload);
        }   
    }

    if (user !== undefined) {   
        userNameText = `${user.firstName} ${user.lastName}`;
    }

    // Get the User's Name using the url
    const fetchProfileData = async() => {
        // get window url path name (removes domain)
        const location = window.location.pathname;
        // get the user id at the end of path
        const strUserId = location.substring(location.lastIndexOf('/') + 1)
        
        // get user data
        const response = await apiGetProfileByUserId(strUserId);
        if (response.status >= 200 && response.status < 300) {
            setProfile(response.payload);
        }   
    }

    // Get Posts that User has made, the user is based on the url -> /profile/{id}
    const fetchPostData = async () => {
        // get window url path name (removes domain)
        const location = window.location.pathname;
        // get the user id at the end of path
        const strUserId = location.substring(location.lastIndexOf('/') + 1)

        const result = await apiGetAllPostsById(strUserId)
        setPosts(result.payload.reverse())
    }

    if(profile?.about !== undefined && user){
        userAboutText = String(profile?.about);
    }
    else if(user?.firstName === undefined){
        userAboutText = "";
    }

    // Error message in case of no posts where made
    let noPostsText = <></>;

    if(post.length === 0 && user) {
        noPostsText = 
        <h2 style={{textAlign: 'center', marginTop: '3%', color: 'gray'}}>
            This user has yet to make a post.
        </h2>;
    }

    // To determine if there is a banner image to display
    let bannerImage = <></>;

    if(profile?.bannerImageUrl !== undefined){
        bannerImage = 
        <Box
            component="img"
            sx={{
                mt: '5vh', 
                height:'25vh',
                width: '75vw',
                maxHeight: { xs: '25vh', md: '25vh' },
                maxWidth: { xs:'75vw', md:'75vw'},
                fit: 'cover'
            }}
            alt="Profile Banner"
            src={profile?.bannerImageUrl}
        />
    }

    // Display this for web page
    return (
        <>
           <Navbar />

            {/* Using grid to layout the profile page */}
            <Grid container 
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                { bannerImage }

                {/* The profile header: user name */}
                <Grid item >
                    <Typography variant="h3" sx={{mt:'2vh'}}>{ userNameText }</Typography>
                </Grid>
            </Grid>

            {/* Main Profile Content -  Tab navgiation on Left*/}
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="stretch"
                sx={{mt:'1vh'}}
            >
                {/* Tab bar to navigate content */}
                <Grid item>
                    <Box
                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: "100vh" }}
                    >
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab label="Posts" {...a11yProps(0)} />
                            <Tab label="About Me" {...a11yProps(1)} />
                            <Tab label="Following" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                </Grid>

                {/* The Tab Content */}
                <Grid item xs={9} >
                    <Box 
                        sx={{ flexGrow: 1, display: 'flex', minHeight: "100vh" }}
                        style={{overflow: 'auto'}}
                    >
                        <TabPanel value={value} index={0}>
                            {post.map((item) =>(
                                    <PostCard post={item} key={item.id}/>
                                ))
                            }
                            { noPostsText }
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Typography variant="h5">{ userAboutText }</Typography>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>
                    </Box>
                </Grid>
            </Grid>
           
        </>
    )
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}