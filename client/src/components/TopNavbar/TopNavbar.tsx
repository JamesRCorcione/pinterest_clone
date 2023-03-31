import { Avatar, Box, Button, IconButton, Input, Menu, MenuItem, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { grey, blue } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'

import NotificationsIcon from '@mui/icons-material/Notifications';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import decode from 'jwt-decode'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import pinterestLogo from '../../media/pinterest-logo.png'
import useStyles from './styles'
import { useLocation, useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { Logout } from '../../features/usersSlice';
import { fetchUser } from '../../utils/fetchUser';
import Search from '../Search/Search';


interface MyToken {
  name: string
  exp: number
}

const TopNavbar = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const [user, setUser] = useState<any>(fetchUser())
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [openMenu, setOpenMenu] = useState<boolean>()
  const [openChat, setOpenChat] = useState<boolean>()
  const [openNotifications, setOpenNotifications] = useState<boolean>()

  const logoutUser = () => {
    dispatch(Logout())
    setUser(null)
    window.location.reload();
    navigate('/landingPage')
    
  }

  useEffect(() => {
      const token = user?.token
      if(token) {
          const decodedToken = decode<MyToken>(token)  

          if(decodedToken.exp * 1000 < new Date().getTime()) logoutUser()
      }        

      setUser(fetchUser())
  }, [location])

  const handleOpenMenu = () => {
    setOpenMenu((openMenu) => !openMenu)
    setOpenNotifications(false)    
    setOpenChat(false)
  }
  const handleOpenChat = () => {
    setOpenChat((openChat) => !openChat)
    setOpenNotifications(false)
    setOpenMenu(false)    
  }
  const handleOpenNotifcations = () => {
    setOpenNotifications((openNotifications) => !openNotifications)
    setOpenMenu(false)
    setOpenChat(false)
    
  }
  const handleSearch = (e:any) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`)
  }
  const handleGoToProfile = () => {
    navigate(`/user-profile/${user._id}`)
    window.location.reload();
  }

  const notifications = document.getElementById('notifications');
  const chat = document.getElementById('chat');
  const menu = document.getElementById('menu');



  return (
    <Box className={classes.navbar}>

      <Box sx={{display: 'flex', flexDirection: 'row', height: '100%' }}>
        <IconButton onClick={() => navigate('/')} sx={{marginTop: 1.8, marginLeft: 2, borderRadius: 99, maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}>
          <img src={pinterestLogo} alt='website icon' height='25px' />
        </IconButton>
        <Box className={classes.boxList}>
        <Button onClick={() => navigate('/')} sx={{top: 10, borderRadius: 99, maxWidth: '70px', maxHeight: '50px', minWidth: '70px', minHeight: '50px'}}>
          <Typography variant='subtitle1' color='black'>
            Home
          </Typography>
        </Button>
        </Box>
        <Box onClick={() => navigate(`/today`)} className={classes.boxList}>
        <Button sx={{top: 10, borderRadius: 99, maxWidth: '70px', maxHeight: '50px', minWidth: '70px', minHeight: '50px'}}>
          <Typography variant='subtitle1' color='black'>
            Today
          </Typography>
        </Button>
        </Box>
        <Box className={classes.boxList}>
        <Button onClick={() => navigate('/createPin')} sx={{top: 10, borderRadius: 99, maxWidth: '500px', maxHeight: '50px', minWidth: '100px', minHeight: '50px'}}>
          <Typography variant='subtitle1' color='black'>
            Create            
          </Typography>
          <KeyboardArrowDownIcon sx={{color:'black'}} />
        </Button>
        </Box>
      </Box>

      <Box className={classes.searchBar}>
        <form onSubmit={(e) => handleSearch(e)}>
          <SearchIcon sx={{paddingTop: 1.5, marginLeft: 2, color: grey[600]}} /> 
          <Input 
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search Pinterest' disableUnderline={true} sx={{position: 'abolute', bottom: 30, left: 40, typography: 'subtitle2', width: '100%', marginLeft: 1, color: grey[600]}} 
          />
        </form>
      </Box>

      <Box sx={{display:'flex', justifyContent:'end', height: '100%'}}>
        <Button  onClick={handleOpenNotifcations}
          sx={{top: 12, borderRadius: 99, maxWidth: '50px', maxHeight: '50px', minWidth: '50px', minHeight: '50px'}}>
          <NotificationsIcon sx={{maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px', color: 'grey'}} />
        </Button>
        <Button onClick={handleOpenChat}
        sx={{top: 12, borderRadius: 99, maxWidth: '50px', maxHeight: '50px', minWidth: '50px', minHeight: '50px'}}>
          <SmsRoundedIcon sx={{maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px', color: 'grey'}}  />
        </Button>
        <Button onClick={handleGoToProfile}sx={{top: 12, borderRadius: 99, maxWidth: '50px', maxHeight: '50px', minWidth: '50px', minHeight: '50px'}}>
        <Avatar sx={{maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px'}} />
        </Button>

        <Button     
          sx={{top: 22, borderRadius: 99, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
          onClick={handleOpenMenu}
        >
          <KeyboardArrowDownIcon sx={{color: grey[500]}} />
        </Button>
        {openMenu && 
          <Box sx={{position: 'absolute', top: 55, right: 10}}>
            <Box id='menu' sx={{height: 250, width: 200, borderRadius: 3, backgroundColor: 'white', boxShadow: 5}}>
              <Button onClick={() => navigate(`/user-profile/${user._id}`)} sx={{paddingRight: 10, marginTop: 2, height: 50, width: '100%'}}>Profile</Button>
              <Button onClick={logoutUser} sx={{paddingRight: 10, height: 50, width: '100%'}}>Logout</Button>
            </Box>
          </Box>
        }
        {openChat &&
          <Box sx={{position: 'absolute', top: 78, right: 10}}>
            <Box id='chat' sx={{height: '93vh', width: 380, borderRadius: 3, backgroundColor: 'white', boxShadow: 5}}>
              <Typography sx={{textAlign: 'center'}}>Chat Coming Soon!</Typography>
            </Box>
          </Box>
        }
        {openNotifications &&
          <Box sx={{position: 'absolute', top: 78, right: 10}}>
            <Box id='notifications' sx={{height: '93vh', width: 380, borderRadius: 3, backgroundColor: 'white', boxShadow: 5}}>
            <Typography sx={{textAlign: 'center'}}>Notifactions Coming Soon!</Typography>
            </Box>
          </Box>
        }                  
      </Box>

    </Box>
  )
}

export default TopNavbar