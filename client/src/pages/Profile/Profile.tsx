import { Avatar, Box, Button, capitalize, Icon, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { GetUserById, Logout, updateSaves } from '../../features/usersSlice'

import { grey } from '@mui/material/colors';
import Pin from '../../components/Pin/Pin'
import Feed from '../../components/Feed/Feed'
import { deletePin, getPins, getPinsByCreator, getPinsByTags } from '../../features/pinsSlice'
import { fetchUser } from '../../utils/fetchUser'
import useStyles from './styles'
import Spinner from '../../components/Spinner/Spinner'
import TopNavbar from '../../components/TopNavbar/TopNavbar'

const Profile = () => {
  const { userId } = useParams()
  const [user, setUser] = useState<any>(fetchUser())
  const dispatch = useDispatch<AppDispatch>()
  const pinsState = useSelector((state: RootState) => state.pinsState);
  const { pins } = pinsState
  //const [user, setUser] = useState<IUser>()
  const location = useLocation()
  const [createdPins, setCreatedPins] = useState<IPin>()
  const [isSavedTab, setIsSavedTab] = useState<boolean>(true)
  const [loading, setLoading] = useState(false)
  const { category } = useParams()
  const { classes } = useStyles()
  const navigate = useNavigate()
  

  useEffect(() => {
    async function updateUserSaves() {
      await dispatch(getPinsByCreator(userId))
      .then((jsonData:any) => setCreatedPins(jsonData.payload))
    }
    updateUserSaves()   
  }, [location, dispatch])

  useEffect(() => {
    async function loadPins() {
      setLoading(true)

      if(category) {
        await dispatch(getPinsByTags(category))
      } else {
        await dispatch(getPins(null))
      }
      setLoading(false)
    }
    loadPins()
  }, [location, category])

  const logoutUser = () => {
    dispatch(Logout())
    setUser(null)
    navigate('/login')    
  }
  

  return (
    <>
      <Box className={classes.topContainer}>
        <Box sx={{position: 'absolute', left: '50%',}}>
          <Box sx={{position: 'relative', left: '-50%'}}>
            <Avatar className={classes.profileImage}>
              <Typography className={classes.userNameInitial}>{user?.result.userName.charAt(0)}</Typography>
            </Avatar>          
            <Typography className={classes.userName}>@{user?.result.userName.split(' ').join('')}</Typography>
          </Box>
        </Box>
      </Box>        

      <Box className={classes.mobileLogout}>
        <Button className={classes.mobileLogoutButton} variant='outlined' onClick={logoutUser}>Logout</Button>
      </Box>

      <Box className={classes.buttonContainer} >
        <Button className={classes.shareButton} variant='outlined'>
          <Typography sx={{fontSize: 14, color: 'black'}}>Share</Typography>
        </Button>
        <Button className={classes.editProfileButton} variant='outlined'>
          <Typography sx={{fontSize: 14, color: 'black'}}>Edit Profile</Typography>
        </Button>
      </Box>      

      <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: 35}}>
        <Button onClick={() => setIsSavedTab(false)}>Created</Button>
        <Button onClick={() => setIsSavedTab(true)}>Saved</Button>
      </Box>

      <Box sx={{display: 'flex', justifyContent: 'center'}}>
          {isSavedTab 
          ?
            <>
            {!pins?.length 
            ?
              <h2>No Pins Available</h2>
            :
              <Box sx={{width: '100%'}}>
                <Feed pins={user.result.saves} />
              </Box>
            } 
            </>
          :
          <Box sx={{width: '100%'}}>
            <Feed pins={createdPins} />                       
          </Box>
          }      
              
        </Box>         
    </>         
  )
}

export default Profile