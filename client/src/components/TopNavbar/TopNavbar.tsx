import { Avatar, Box, Button, IconButton, Input, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { grey, blue } from '@mui/material/colors';
import React from 'react'

import NotificationsIcon from '@mui/icons-material/Notifications';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import pinterestLogo from '../../media/pinterest-logo.png'
import useStyles from './styles'
import { useNavigate } from 'react-router-dom';

const TopNavbar = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const handleCreatePin = () => {
    navigate('/createPin')
  }
  const handleNavigateHome = () => {
    navigate('/')
  }

  return (
    <Box className={classes.navbar}>

      <Box sx={{display: 'flex', flexDirection: 'row', height: '100%' }}>
        <IconButton onClick={handleNavigateHome} sx={{marginTop: 1.8, marginLeft: 2, borderRadius: 99, maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}>
          <img src={pinterestLogo} alt='website icon' height='25px' />
        </IconButton>
        <Box className={classes.boxList}>
        <Button onClick={handleNavigateHome} sx={{top: 10, borderRadius: 99, maxWidth: '70px', maxHeight: '50px', minWidth: '70px', minHeight: '50px'}}>
          <Typography variant='subtitle1' color='black'>
            Home
          </Typography>
        </Button>
        </Box>
        <Box className={classes.boxList}>
        <Button sx={{top: 10, borderRadius: 99, maxWidth: '70px', maxHeight: '50px', minWidth: '70px', minHeight: '50px'}}>
          <Typography variant='subtitle1' color='black'>
            Today
          </Typography>
        </Button>
        </Box>
        <Box className={classes.boxList}>
        <Button onClick={handleCreatePin} sx={{top: 10, borderRadius: 99, maxWidth: '500px', maxHeight: '50px', minWidth: '100px', minHeight: '50px'}}>
          <Typography variant='subtitle1' color='black'>
            Create            
          </Typography>
          <KeyboardArrowDownIcon sx={{color:'black'}} />
        </Button>
        </Box>
      </Box>

      <Box className={classes.searchBar}>
        <SearchIcon sx={{paddingTop: 1.5, marginLeft: 2, color: grey[600]}} />  
        <Input placeholder='Search Pinterest' disableUnderline={true} sx={{ typography: 'subtitle2', width: '100%', marginTop: 0.5, marginLeft: 1, color: grey[600]}} />
      </Box>

      <Box sx={{display:'flex', justifyContent:'end', height: '100%'}}>
        <Button sx={{top: 12, borderRadius: 99, maxWidth: '50px', maxHeight: '50px', minWidth: '50px', minHeight: '50px'}}>
          <NotificationsIcon sx={{maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px', color: 'grey'}} />
        </Button>
        <Button sx={{top: 12, borderRadius: 99, maxWidth: '50px', maxHeight: '50px', minWidth: '50px', minHeight: '50px'}}>
          <SmsRoundedIcon sx={{maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px', color: 'grey'}}  />
        </Button>
        <Button sx={{top: 12, borderRadius: 99, maxWidth: '50px', maxHeight: '50px', minWidth: '50px', minHeight: '50px'}}>
        <Avatar sx={{maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px'}} />
        </Button>
        <Button sx={{top: 22, borderRadius: 99, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
          <KeyboardArrowDownIcon sx={{color: 'grey'}} />
        </Button>
      </Box>

    </Box>
  )
}

export default TopNavbar