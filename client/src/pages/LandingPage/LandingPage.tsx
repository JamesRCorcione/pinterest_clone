import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import decode from 'jwt-decode'

import { Logout, SignUp } from '../../features/usersSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginSignup from '../../components/LoginSignup/LoginSignup';
import { fetchUser } from '../../utils/fetchUser';



interface MyToken {
  name: string;
  exp: number;
}

const LandingPage = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  let user = fetchUser()
  const location = useLocation()
  const [openLogin, setOpenLogin] = React.useState<boolean>(false);
  const [isSignUp, setIsSignUp] = React.useState<boolean>(false);


  const handleSignUp = (isSignUp:boolean) => {
    setIsSignUp(isSignUp)
    setOpenLogin(() => true);
  }
  
  return (
    <Box>
      {openLogin &&
          <LoginSignup isSignUp={isSignUp} setOpenLogin={setOpenLogin} />
      }         

      <Box className={classes.container}>        
        <section className={classes.one}>
          
          <Box sx={{display: 'flex', height: 50, width: '100%'}}>
            <Box>
              <IconButton disableFocusRipple disableRipple>
                Pinterest
              </IconButton>
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'end', width: '100%' }}>
              <Button
                variant='contained'
                sx={{height: 40, borderRadius: 10, marginRight: 2}}
                onClick={() => handleSignUp(true)}
              >
                <Typography sx={{textTransform: 'none', fontSize: 14, fontWeight: 'bold'}}>Log in</Typography>
              </Button>
              <Button 
                variant='contained'
                sx={{height: 40, borderRadius: 10, marginRight: 2}}
                onClick={() => handleSignUp(false)}
              >
                <Typography sx={{textTransform: 'none', fontSize: 14, fontWeight: 'bold'}}>Sign up</Typography>
              </Button>
            </Box>
          </Box>

          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h1>First Page</h1>
          </Box>
        </section>
        <section className={classes.two}>
          <h1>Second Page</h1>
        </section>
        <section className={classes.three}>
          <h1>Third Page</h1>
        </section>
        <section className={classes.four}>
          <h1>Fourth Page</h1>
        </section>
        <section className={classes.five}>
          <h1>Fifth Page</h1>
        </section>
      </Box>
    </Box>
  )
}

export default LandingPage