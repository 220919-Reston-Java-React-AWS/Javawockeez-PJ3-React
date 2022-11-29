import { Typography, TextField, Button, Card } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { apiForgotPassword, apiGetQuestionsByEmail } from "../../remote/social-media-api/auth.api";
import SampleQuestionsModel from "../../models/SampleQuestionsModel";
import { useState } from "react";
import React from "react";
import { error } from "console";


const theme = createTheme();

export default function ResetPasswordSubmit() {
  const navigate = useNavigate(); 

  //set constants for password reset
  const [questions, setQuestions] = useState<SampleQuestionsModel[]>([])

  //get questions from backend
  const fetchQuestions = async () => {
    // get window url path name (removes domain)
    const location = window.location.pathname;
    // get the user id at the end of path
    const strUserEmail = location.substring(location.lastIndexOf('/') + 1)
    //set the questions to display
    const result = await apiGetQuestionsByEmail(strUserEmail)
    setQuestions(result.payload)
}
//submit forgot password request
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // get window url path name (removes domain)
    const location = window.location.pathname;
    // get the user id at the end of path
    const strUserEmail = location.substring(location.lastIndexOf('/') + 1)
    const data = new FormData(event.currentTarget);
    const response = await apiForgotPassword(`${strUserEmail}`, `${Object(questions![0])["question"]}`, `${data.get('answer1')}`, `${Object(questions![1])["question"]}`, `${data.get('answer2')}`, `${Object(questions![2])["question"]}`, `${data.get('answer3')}`, `${data.get('password')}`)
    if (response.status >= 200 && response.status < 300){ 
    navigate('/login');}
  };

React.useEffect(() => {
    //scroll to top on page load
    window.scrollTo({top:0, left:0, behavior: 'smooth'});
    //get questions
    fetchQuestions();
  }, []);

  return(
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
              Reset Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <div data-testid="question">
                {Object(questions![0])["question"]}
                </div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="answer1"
                label="Answer"
                name="answer1"
                autoComplete="answer1"
                autoFocus
              />
              <div id="question">
                {Object(questions![1])["question"]}
                </div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="answer2"
                label="Answer"
                name="answer2"
                autoComplete="answer2"
                autoFocus
              />
              <div id="question">
                {Object(questions![2])["question"]}
                </div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="answer3"
                label="Answer"
                name="answer3"
                autoComplete="answer3"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                autoComplete="password"
                autoFocus
              />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            </Box>
        </Box>
      </Container>
      );
    }