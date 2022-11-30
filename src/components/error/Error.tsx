import { useEffect } from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

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
        <main id='Error'>
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
        </main>
    )
}