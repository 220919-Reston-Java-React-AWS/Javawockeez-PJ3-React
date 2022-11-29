import * as React from 'react';
import { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { apiLogout } from '../../remote/social-media-api/auth.api';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { Link } from 'react-router-dom';
import DarkMode from '../DarkMode/DarkMode';

// converting avatar into a menu
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function Navbar() {

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(<></>);
  const [tipTitle, setTipTitle] = useState('');
  
  
  useEffect(() => {
      if(user) {
          setLoggedIn(<LogoutIcon />);
          setTipTitle('Logout');
      } else {
          setLoggedIn(<LoginIcon />);
          setTipTitle('Login');
      }
  }, [user]);

  // click event function for logging in and logging out
  function handleAuth() {
      if(user) {
          apiLogout();
          setUser();
          navigate('/');
      } else {
          navigate('/login'); 
      }
  }

  // click event function for going to user profile
  function handleMenuProfile() {
    navigate(`/profile/${user?.id}`); 
    
  }

  // click event function for going to user account
  function handleMenuAccount() {
    navigate(`/account`); 
  }

  let loginIcon = <></>

  if(tipTitle !== 'Logout'){
    loginIcon = 
    <>
      <Tooltip disableFocusListener disableTouchListener title={tipTitle}>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => handleAuth()}
            color="inherit"
        >
            {loggedIn}
        </IconButton>
      </Tooltip>
    </>
  }

  // code for menu functionality
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let menuIcon = <></>

  if(tipTitle === 'Logout'){
    menuIcon =
    <>
      <Tooltip title="Account settings" style={{overflow: 'hidden'}}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }} style={{backgroundColor: '#ed6c02'}}></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'hidden',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              overflow: 'hidden',
              width: 0,
              height: 0,
              bgcolor: 'background.paper',
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem onClick={() => handleMenuProfile()}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleMenuAccount()}>
          My Account
        </MenuItem>
        <Divider />
        <MenuItem
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => handleAuth()}
          color="inherit"
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar style={{overflow: 'hidden'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              Javawockeez
            </Link>
          </Typography>

          <DarkMode />
          
          {loginIcon}

          {menuIcon}
            
        </Toolbar>
      </AppBar>
    </Box>
  );
}
