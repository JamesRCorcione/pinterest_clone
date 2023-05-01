import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useStyles from './styles'
import pinterestLogo from '../../media/pinterest-logo.png'
import LoginSignup from '../../components/LoginSignup/LoginSignup';
import shareVideo from '../../media/share.mp4'
import { grey, red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../utils/fetchUser';
import { Logout } from '../../features/usersSlice';
import { useNavigate } from 'react-router-dom';

interface MyToken {
  name: string;
  exp: number;
}

const Login = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [openLogin, setOpenLogin] = React.useState<boolean>(false);
  const [isSignUp, setIsSignUp] = React.useState<boolean>(false);
  const usersState = useSelector((state: RootState) => state.usersState);
  const dispatch = useDispatch<AppDispatch>()
  const { users } = usersState

  useEffect(() => {
    navigate('/login')
  }, [])

  const handleSignUp = (isSignUp:boolean) => {
    setIsSignUp(isSignUp)
    setOpenLogin(() => true);
  }
  
  return (
    <Box sx={{overflowX: 'hidden'}}>
      {openLogin &&
          <LoginSignup isSignUp={isSignUp} setOpenLogin={setOpenLogin} />
      }           

      <Box className={classes.container}>   
          <Box sx={{display: 'flex', position: 'absolute', width: '100%', paddingBottom: 1, backgroundColor: grey[100], height: 50, overflowX: 'hidden', zIndex: 2}}>
            <Box>
              <IconButton sx={{position: 'absolute', top: 8, marginLeft: 1}} disableFocusRipple disableRipple>
                <img src={pinterestLogo} alt='website icon' height='25px' width='25px' />
              </IconButton>
              <IconButton sx={{position: 'absolute', left: 35}} disableFocusRipple disableRipple>
                <Typography sx={{color: red[700], marginTop: 1.2, marginLeft: 1}}>Pinterest</Typography>
              </IconButton>
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'end', width: '100%' }}>
              <Button
                variant='contained'
                sx={{height: 40, borderRadius: 10, marginRight: 3, backgroundColor: red[700], '&:hover': { backgroundColor: red[900] }}}
                onClick={() => handleSignUp(true)}
              >
                <Typography sx={{textTransform: 'none', fontSize: 14, fontWeight: 'bold'}}>Log in</Typography>
              </Button>
            </Box>
          </Box>
            <video 
              src={shareVideo}
              loop
              controls={false}
              muted
              autoPlay
              className={classes.video}
            />
      </Box>
      
    </Box>
  )
}

export default Login