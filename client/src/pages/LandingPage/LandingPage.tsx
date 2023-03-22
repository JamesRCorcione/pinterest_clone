import { Box, Button, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import decode from 'jwt-decode'

import { Logout, SignUp } from '../../features/usersSlice';
import { useLocation } from 'react-router-dom';
import LoginSignup from '../../components/LoginSignup/LoginSignup';



interface MyToken {
  name: string;
  exp: number;
}

const LandingPage = () => {
  const classes = useStyles()
  const location = useLocation()
  const [openLogin, setOpenLogin] = React.useState<boolean>(false);
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('profile') || "false"))

  const handleSignUp = () => {
    setOpenLogin(() => true);
  }

  const logoutUser = () => {
    dispatch(Logout())
    setUser({ userName: '', email: '', password: '', birthday: null })
  }

  useEffect(() => {
      const token = user?.token
      if(token) {
          const decodedToken = decode<MyToken>(token)      
          

          if(decodedToken.exp * 1000 < new Date().getTime()) logoutUser()
      }        

      setUser((JSON.parse(localStorage.getItem('profile') || "false")))
  }, [location])


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
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}

