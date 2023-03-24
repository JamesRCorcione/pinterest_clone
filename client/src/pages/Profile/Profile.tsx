import { Avatar, Box, Button, capitalize, Icon, Typography } from '@mui/material'
import React, { useState } from 'react'

const Profile = () => {
  const user = (JSON.parse(localStorage.getItem('profile') || "false"))
  const [isSavedTab, setIsSavedTav] = useState<boolean>(true)
  const userName = user?.result.userName

  return (
    <Box>
      <Box sx={{height: 360}}>
        <Box sx={{position: 'absolute', left: '50%'}}>
        <Box sx={{position: 'relative', left: '-50%'}}>
          <Avatar sx={{marginTop: 2, minHeight: 120, maxHeight: 120, minWidth: 120, maxWidth: 120}}>
            <Typography sx={{fontSize: 48, textTransform: 'capitalize', color: 'black'}}>{userName.charAt(0)}</Typography>
          </Avatar>          
        </Box>
        </Box>
        <Typography sx={{marginTop: 0.5, fontSize: 32, fontWeight: 400, textAlign:'center', paddingTop: 18}}>{userName}</Typography>
        <Typography sx={{marginTop: 0.5, fontSize: 12, textAlign:'center', textTransform: 'nospace' }}>@{userName.split(' ').join('')}</Typography>
        <Typography sx={{marginTop: 0.5, fontSize: 16, textAlign:'center', }}>0 following</Typography>
      

        <Box sx={{position: 'absolute', left: '50%', marginTop: 2}} >
          <Box sx={{position: 'relative', left: '-50%'}}>
            <Button sx={{marginX: 1, height: 40, borderRadius: 10, backgroundColor: 'grey'}} variant='outlined'>
              <Typography sx={{fontSize: 14, color: 'black'}}>Share</Typography>
              </Button>
            <Button sx={{marginX: 1, height: 40,borderRadius: 10, backgroundColor: 'grey'}} variant='outlined'>
            <Typography sx={{fontSize: 14, color: 'black'}}>Edit Profile</Typography>
            </Button>
          </Box>
        </Box>

      </Box>

      <Box sx={{position: 'absolute', left: '50%'}}>
        <Box sx={{position: 'relative', left: '-50%'}}>
          <Box><Button>Saved Pins</Button><Button>Created Pin</Button></Box>
          {isSavedTab 
          ?
            <Box>My Saved Pins</Box>
          :
            <Box>My Created Pins</Box>
          }

        </Box>
      </Box>
      
    </Box>
  )
}

export default Profile