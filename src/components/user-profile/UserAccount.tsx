import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Button, Avatar, Modal } from '@mui/material';
import Navbar from '../navbar/Navbar';
import Post from '../../models/Post';
import { apiGetAllPosts } from '../../remote/social-media-api/postFeed.api';
import { useContext } from 'react';
import { User } from '../../context/user.context';
import TextField from '@mui/material/TextField';
import { apiUpsertPost } from '../../remote/social-media-api/post.api';
import { apiGetAllPostsById, apiGetUserProfileName, apiGetProfileByUserId, apiPatchProfileData } from '../../remote/social-media-api/profile.api';
import { PostCard } from '../post-feed/PostCard';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Profile from '../../models/Profile';
import { UserContext } from '../../context/user.context';
import { UserProfileContext } from '../../context/profile.context';
import { useNavigate } from 'react-router-dom';
import Account from '../../models/Account';
import { apiPatchAccountData } from '../../remote/social-media-api/account.api';


export default function UserAccount(){
    //------- States
    const [post, setPosts] = useState<Post[]>([])
    const { user } = useContext(UserContext);   //user should be logged in
    const { setProfileContext } = useContext(UserProfileContext); // Storing logged in user's profile data 
    const [profile, setProfile] = useState<Profile>(); // Profile state used for this page
    const { setUser } = useContext(UserContext);

    //------- States reflecting change settings inputs
    const [textInputBanner, setTextInputBanner] = useState(''); // get the text input from the Change Banner Img setting
    const [textInputAbout, setTextInputAbout] = useState(''); // get the text input from the Change About Me setting
    const [textInputFirstName, setTextInputFirstName] = useState(''); // get the text input from the Change Account First Name setting
    const [textInputLastName, setTextInputLastName] = useState(''); // get the text input from the Change Account Last Name setting
    const [textInputEmail, setTextInputEmail] = useState(''); // get the text input from the Change Banner Account Email setting
    const [textInputPassword, setTextInputPassword] = useState(''); // get the text input from the Change Account Password setting

    //-------- default values to display
    let userNameText = `This page requires users to log into their account.`;
    let userAboutText = `${user?.firstName} ${user?.lastName} has yet to write about themselves. They'll get around to it at some point.`;

    //-------- for vertical tabs
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    //-------- for model handling and state, each modal must have a different state
    const [open, setOpen] = React.useState(false);  // change banner image
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    const [open2, setOpen2] = React.useState(false); // change about me info
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const [open3, setOpen3] = React.useState(false); // change account info
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);

    //-------- On window page load
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); //scroll to top on page load

        // console.log(user?.id);
        redirectLogin(); // redirect if not logged in
        fetchPostData(); // get post data for user profile
        fetchProfileData(); // get profile about and images
    }, []);

    //-------- Redirect if not logged in
    const navigate = useNavigate();

    const redirectLogin = async() => {
        if (user === undefined) {   
            //timeout to redirect to login
            setTimeout(() =>{
                navigate('/login');
            }, 5000)
        }  
    }

    //--------- set user profile name
    if (user !== undefined) {   
        userNameText = `${user.firstName} ${user.lastName}`;
    }

    //--------- Get the User's Name using the User Context
    const fetchProfileData = async() => {
        // get the user id at the end of path
        const strUserId = String(user?.id);
        
        // get user data
        const response = await apiGetProfileByUserId(strUserId);
        
        // console.log(response.payload);
        if (response.status >= 200 && response.status < 300) {
            setProfileContext(response.payload);
            setProfile(response.payload)
        }
    }

    //---------- Get Posts that User has made user User Context
    const fetchPostData = async () => {
        // get the user id at the end of path
        const strUserId = String(user?.id);

        const result = await apiGetAllPostsById(strUserId)
        setPosts(result.payload.reverse())
    }

    //---------- Set the About Me context
    if(profile?.about !== undefined && user){
        userAboutText = String(profile?.about);
    }
    else if(user?.firstName === undefined){
        userAboutText = "";
    }

    //---------- Default context in case of no posts where made
    let noPostsText = <></>;

    //--------- If logged in and no posts, say user didn't make any posts yet
    if(post.length === 0 && user) {
        noPostsText = 
        <h2 style={{textAlign: 'center', marginTop: '3%', color: 'gray'}}>
            This user has yet to make a post.
        </h2>;
    }

    //---------- Default if there is no banner image to display
    let bannerImage = <></>;

    //---------- To determine if there is a banner image to display
    if(profile?.bannerImageUrl !== undefined){
        // console.log('banner url: ' + profile?.bannerImageUrl);
        
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

    //--------- Update Banner Image event
    const handleBannerUpdate = async(event: React.SyntheticEvent) => {
        // console.log(textInputBanner);
        
        const updatedProfile = new Profile(Number(profile?.id), String(profile?.about), String(profile?.avatarImageUrl), textInputBanner, user)
        // console.log(updatedProfile);

        //  update the banner url in database
        const response = await apiPatchProfileData(updatedProfile);
        
        // refresh profile data
        fetchProfileData();    

        //close modal
        handleClose()
    };

    // input field change
    const handleTextInputBannerChange = (event:any) => {
        setTextInputBanner(event.target.value);
    };

    //--------- Update About Me event
    const handleAboutMeUpdate = async(event: React.SyntheticEvent) => {
        // console.log(textInputAbout);
        
        const updatedProfile = new Profile(Number(profile?.id), textInputAbout, String(profile?.avatarImageUrl), String(profile?.bannerImageUrl), user)
        // console.log(updatedProfile);

        //  update the banner url in database
        const response = await apiPatchProfileData(updatedProfile);
        
        // refresh profile data
        fetchProfileData();

        //close modal
        handleClose2()
    };
    
    // input field change
    const handleTextInputAboutMeChange = (event:any) => {
        setTextInputAbout(event.target.value);
    };


    //--------- Update Account event
    const handleAccountUpdate = async(event: React.SyntheticEvent) => {
        let id:number;
        let email:string;
        let password:string;
        let firstName:string;
        let lastName:string;

        // find correct values if fields not all filled
        id = Number(user?.id);
        email = String(textInputEmail !== "" ? textInputEmail : user?.email);
        password = String(textInputPassword !== "" ? textInputPassword : '');
        firstName = String(textInputFirstName !== "" ? textInputFirstName : user?.firstName);
        lastName = String(textInputLastName !== "" ? textInputLastName : user?.lastName);
        
        const updatedAccount = new Account(id, email, password, firstName, lastName);
        // console.log(updatedAccount);

        //  update user account in database
        const response = await apiPatchAccountData(updatedAccount);
        
        // re-set the user data
        if (response.status >= 200 && response.status < 300) {
            setUser(response.payload);
        }

        // refresh the profile data form update
        fetchPostData()
        fetchProfileData()

        //close modal
        handleClose3()
    };

    // input field change
    const handleTextInputFirstNameChange = (event:any) => {
        setTextInputFirstName(event.target.value);
    };
    // input field change
    const handleTextInputLastNameChange = (event:any) => {
        setTextInputLastName(event.target.value);
    };
    // input field change
    const handleTextInputEmailChange = (event:any) => {
        setTextInputEmail(event.target.value);
    };
    // input field change
    const handleTextInputPasswordChange = (event:any) => {
        setTextInputPassword(event.target.value);
    };


    //--------- Display this for web page
    return (
        <main>
           {/* <Navbar /> */}

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
                sx={{mt:'2.5vh', mb: '1vh'}}
            >
                {/* Tab bar to navigate content */}
                <Grid item>
                    <Box
                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: "90vh" }}
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
                            <Tab label="Settings" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                </Grid>

                {/* The Tab Content */}
                <Grid item xs={9} sx={{borderRight: 1, borderLeft:0, borderBottom:0,borderColor: 'grey.300' }}>
                    <Box 
                        sx={{ flexGrow: 1, display: 'flex', maxHeight: "90vh"}}
                        style={{overflow: 'auto'}}
                    >
                        {/************* User Posts ******************/}
                        <TabPanel value={value} index={0} >
                            {post.map((item) =>(
                                    <PostCard post={item} key={item.id}/>
                                ))
                            }
                            { noPostsText }
                        </TabPanel>

                        {/*************  User About Me ******************/}
                        <TabPanel value={value} index={1}>
                            <Typography variant="h5" style={{whiteSpace: 'pre-wrap'}}>{ userAboutText }</Typography>
                        </TabPanel>
                        
                        {/*********** Modal Update Settings *************/}
                        <TabPanel value={value} index={2}>
                            <Typography variant="h6">Change Profile Banner Image</Typography>
                            <br/>
                            <Button onClick={handleOpen} variant="contained">Update Profile Banner</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-profile-banner"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-profile-banner" variant="h6" component="h2">
                                        Insert the image URL you want your profile banner to display.
                                    </Typography>

                                    <Box sx={{ maxWidth: '100%', mt: '2vh' }} >
                                        <TextField fullWidth 
                                            label="Banner URL" 
                                            id="inputBannerURL" 
                                            sx={{bgcolor:'white', color:'black'}} 
                                            onChange= {handleTextInputBannerChange}
                                            helperText='Character Limit: 255'
                                            inputProps={{ maxLength: 255 }}
                                        />
                                    </Box>

                                    <Button variant="contained" color="error" sx={{ mt: '2vh' }} onClick={handleBannerUpdate}>
                                        Update
                                    </Button>
                                </Box>
                            </Modal>
                            
                            <br/><br/><br/>

                            <Typography variant="h6">Change About Me</Typography>
                            <br/>
                            <Button onClick={handleOpen2} variant="contained">Update About Me</Button>
                            <Modal
                                open={open2}
                                onClose={handleClose2}
                                aria-labelledby="modal-about-me"
                                aria-describedby="modal-about-me-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-about-me" variant="h6" component="h2">
                                        Insert what you want your 'About Me' to be.
                                    </Typography>
                                    
                                    <Box sx={{ maxWidth: '100%', mt: '2vh' }}>
                                        <TextField fullWidth 
                                            multiline rows={5} 
                                            id="inputAboutMe" 
                                            label="About Me" 
                                            defaultValue= {profile?.about} 
                                            sx={{bgcolor:'white', color:'black'}}
                                            helperText='Character Limit: 255'
                                            inputProps={{ maxLength: 255 }}
                                            onChange= {handleTextInputAboutMeChange}
                                        />
                                    </Box>

                                    <Button variant="contained" color="error" sx={{ mt: '2vh' }} onClick={handleAboutMeUpdate}>
                                        Update
                                    </Button>

                                </Box>
                            </Modal>

                            <br/><br/><br/>

                            <Typography variant="h6">Change Account Information</Typography>
                            <br/>
                            <Button onClick={handleOpen3} variant="contained">Update Account</Button>
                            <Modal
                                open={open3}
                                onClose={handleClose3}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Insert changes you want to update about your account.
                                    </Typography>
                                    
                                    <Box sx={{ maxWidth: '100%', mt: '2vh' }} >
                                        <TextField fullWidth label="First Name" id="inputFirstName" sx={{bgcolor:'white', color:'black'}}
                                            inputProps={{ maxLength: 255 }}
                                            onChange= {handleTextInputFirstNameChange}
                                        />
                                    </Box>

                                    <Box sx={{ maxWidth: '100%', mt: '2vh' }} >
                                        <TextField fullWidth label="Last Name" id="inputLastName" sx={{bgcolor:'white', color:'black'}}
                                            inputProps={{ maxLength: 255 }}
                                            onChange= {handleTextInputLastNameChange}
                                        />
                                    </Box>
                                    
                                    <Box sx={{ maxWidth: '100%', mt: '2vh' }} >
                                        <TextField fullWidth label="Email" id="inputEmail" sx={{bgcolor:'white', color:'black'}}
                                            inputProps={{ maxLength: 255 }}
                                            onChange= {handleTextInputEmailChange}
                                        />
                                    </Box>

                                    
                                    <Box sx={{ maxWidth: '100%', mt: '2vh' }} >
                                        <TextField fullWidth label="Password" id="inputPassword" sx={{bgcolor:'white', color:'black'}} 
                                            inputProps={{ maxLength: 255 }}
                                            onChange= {handleTextInputPasswordChange}
                                        />
                                    </Box>

                                    <Button variant="contained" color="error" sx={{ mt: '2vh' }} onClick={handleAccountUpdate}>
                                        Update
                                    </Button>
                                </Box>
                            </Modal>
                        </TabPanel>
                    </Box>
                </Grid>
            </Grid>
           
        </main>
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

//--------- Modal Style
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    bgcolor: 'gray',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
