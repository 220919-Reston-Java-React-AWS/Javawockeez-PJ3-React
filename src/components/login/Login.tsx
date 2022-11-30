import * as React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { apiLogin } from '../../remote/social-media-api/auth.api';
import { UserContext } from '../../context/user.context';
import DarkMode from '../DarkMode/DarkMode';
import './Login.css'


const theme = createTheme();

// The login page for the site.
// The user may either enter their email and password, or go to another page to register/reset password.
export default function Login() {

  //* ----------     VARIABLES     ---------- *//

  // The hook for setting the current user in the application.
  const { setUser } = useContext(UserContext);
  // Navigation to other pages within this site.
  const navigate = useNavigate();
  // Error text. Appears if login is not successful, and details why.
  const [errText, setErrText] = useState("");


  //* ----------     METHODS     ---------- *//

  // Handle the submission of the login request. THe email and password are sent to the backend to be verified.
  // If successful, the user is navigated to the main page.
  // Otherwise, text appears detailing why (bad email/password)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the page from refreshing
    event.preventDefault();
    // Get the login data from the form.
    const data = new FormData(event.currentTarget);
    
    // Send the login request to the backend.
    const response = await apiLogin(`${data.get('email')}`, `${data.get('password')}`);

    // React to the response.
    if (response.status >= 200 && response.status < 300) {
      // If successful, save the user's information and go to the main page.
      setUser(response.payload);
      navigate('/');

    } else if (response.payload.message) {
      // If there is an error message (presumably bad password or email) display the message on the page.
      setErrText("* " + response.payload.message)

    } else {
      // Otherwise, something unexpected and irrecoverable has happened. This should not happen.
      alert('The system has encountered an unexpected error')
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={4} md={12}>
                <Link href="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Grid item xs={4} md={12}>
                <Link href="reset-password" variant="body2">
                  {"Forgot Password? Reset Password"}
                </Link>
              </Grid>
              <Grid item xs={4} md={12} className='error-text'>
                {errText}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}