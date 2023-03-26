import { Box, Button, IconButton } from '@mui/material'
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


  const handleSignUp = () => {
    setOpenLogin(() => true);
  }
  
  return (
    <Box>
      {openLogin &&
          <LoginSignup setOpenLogin={setOpenLogin} />
      }
      
      <Box sx={{ backgroundColor: 'white', zIndex: 2000, width: '100%', display: 'flex', flexDirection: 'row', position: 'fixed', top: 0}}>
        <Box>
          <IconButton disableFocusRipple disableRipple>
            Pinterest
          </IconButton>
        </Box>

        <Box sx={{position: 'absolute', top: 5, right: 10}}>
          <Button>
            Login
          </Button>
          <Button onClick={handleSignUp}>
            Sign Up
          </Button>
        </Box>
      </Box>

      <Box className={classes.container}>
        <section className={classes.one}>
          <h1>First Page</h1>
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