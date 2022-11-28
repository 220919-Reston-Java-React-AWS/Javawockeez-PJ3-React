import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { apiAuthSampleQuestions1, apiAuthSampleQuestions2, apiAuthSampleQuestions3, apiGetQuestionsByEmail, apiRegister } from '../../remote/social-media-api/auth.api';
import { useState } from 'react';
import { sampleQuestionsModel } from '../../models/SampleQuestionsModel';
import Select from 'react-select';


const theme = createTheme();

export default function Register() {
  const navigate = useNavigate(); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await apiRegister(`${data.get('firstName')}`, `${data.get('lastName')}`, `${data.get('email')}`, `${data.get('password')}`, `${(Object(selectedOption1!)["question"])}`, `${data.get('answer1')}`, `${(Object(selectedOption2!)["question"])}`, `${data.get('answer2')}`, `${(Object(selectedOption3!)["question"])}`, `${data.get('answer3')}`)
    if (response.status >= 200 && response.status < 300) navigate('/login');
  };

  //set up constants for security questions
  const[selectedOption1, setSelectedOption1] = React.useState(null)
  const [questions1, setQuestions1] = useState<sampleQuestionsModel[]>([])
  const handleChange1 = (e:any) => {setSelectedOption1(e);}
  const[selectedOption2, setSelectedOption2] = React.useState(null)
  const [questions2, setQuestions2] = useState<sampleQuestionsModel[]>([])
  const handleChange2 = (e:any) => {setSelectedOption2(e);}
  const[selectedOption3, setSelectedOption3] = React.useState(null)
  const [questions3, setQuestions3] = useState<sampleQuestionsModel[]>([])
  const handleChange3 = (e:any) => {setSelectedOption3(e);}
  //get sample questions
  React.useEffect(() => {
    //scroll to top on page load
    window.scrollTo({top:0, left:0, behavior: 'smooth'});
    //get sample questions
    getSampleQuestions1();
    getSampleQuestions2();
    getSampleQuestions3();
  }, []);

  //async function for sample questions1
  const getSampleQuestions1 = async () => {
    const result = await apiAuthSampleQuestions1()
    setQuestions1(result.payload)
  }

  //async function for sample questions2
  const getSampleQuestions2 = async () => {
    const result = await apiAuthSampleQuestions2()
    setQuestions2(result.payload)
  }

  //async function for sample questions3
  const getSampleQuestions3 = async () => {
    const result = await apiAuthSampleQuestions3()
    setQuestions3(result.payload)
  }


  return (
    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="first-Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete=""
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Select 
                placeholder="Question 1"
                value={selectedOption1}
                options={questions1}
                getOptionLabel={option => option!.question}
                onChange={handleChange1}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="answer1"
                label="Answer"
                type="answer1"
                id="answer1"
                autoComplete="answer1"
                />
            </Grid>
            <Grid item xs={12}>
                <Select 
                placeholder="Question 2"
                value={selectedOption2}
                options={questions2}
                getOptionLabel={option => option!.question}
                onChange={handleChange2}
                />
              </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="answer2"
                label="Answer"
                type="answer2"
                id="answer2"
                autoComplete="answer2"
                />
            </Grid>
            <Grid item xs={12}>
                <Select 
                placeholder="Question 3"
                value={selectedOption3}
                options={questions3}
                getOptionLabel={option => option!.question}
                onChange={handleChange3}
                />
              </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="answer3"
                label="Answer"
                type="answer3"
                id="answer3"
                autoComplete="answer3"
                />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}