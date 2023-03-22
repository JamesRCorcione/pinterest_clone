import { Avatar, Box, Button, IconButton, Input, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { grey, blue } from '@mui/material/colors';
import React from 'react'

import NotificationsIcon from '@mui/icons-material/Notifications';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import pinterestLogo from '../../media/pinterest-logo.png'
import useStyles from './styles'

const TopNavbar = () => {
  const classes = useStyles()

  return (
    <Box className={classes.navbar}>

      <Box sx={{display: 'flex', flexDirection: 'row', height: '100%' }}>
        <IconButton sx={{marginTop: 2, marginLeft: 1, borderRadius: 99, maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}>
          <img src={pinterestLogo} alt='website icon' height='25px' />
        </IconButton>
        <Box className={classes.boxList}>
        <Button sx={{top: 10, borderRadius: 99, maxWidth: '80px', maxHeight: '60px', minWidth: '80px', minHeight: '60px'}}>
          <Typography variant='subtitle1'>
            Home
          </Typography>
        </Button>
        </Box>
        <Box className={classes.boxList}>
        <Button sx={{top: 10, borderRadius: 99, maxWidth: '80px', maxHeight: '60px', minWidth: '80px', minHeight: '60px'}}>
          <Typography variant='subtitle1'>
            Today
          </Typography>
        </Button>
        </Box>
        <Box className={classes.boxList}>
        <Button sx={{top: 10, borderRadius: 99, maxWidth: '100px', maxHeight: '60px', minWidth: '100px', minHeight: '60px'}}>
          <Typography variant='subtitle1'>
            Create            
          </Typography>
          <KeyboardArrowDownIcon />
        </Button>
        </Box>
      </Box>

      <Box className={classes.searchBar}>
        <SearchIcon sx={{paddingTop: 1, marginLeft: 2, color: grey[600]}} />  
        <Input placeholder='Search Pinterest' disableUnderline={true} sx={{ typography: 'subtitle2', width: '100%', marginTop: 0.5, marginLeft: 1, color: grey[600]}} />
      </Box>

      <Box sx={{display:'flex', justifyContent:'end', height: '100%', right: 170, top: 0, backgroundColor: 'pink'}}>
        <Button sx={{top: 18, borderRadius: 99, maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}>
          <NotificationsIcon />
        </Button>
        <Button sx={{top: 18, borderRadius: 99, maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}>
          <SmsRoundedIcon />
        </Button>
        <Button sx={{top: 18, borderRadius: 99, maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}>
        <Avatar sx={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}} />
        </Button>
        <Button sx={{top: 18, borderRadius: 99, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
          <KeyboardArrowDownIcon />
        </Button>
      </Box>

    </Box>
  )
}

export default TopNavbar