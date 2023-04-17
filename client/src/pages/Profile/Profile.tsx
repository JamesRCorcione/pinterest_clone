import { Avatar, Box, Button, capitalize, Icon, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { GetUserById, updateSaves } from '../../features/usersSlice'

import { grey } from '@mui/material/colors';
import Pin from '../../components/Pin/Pin'
import Feed from '../../components/Feed/Feed'
import MasonryLayout from '../../components/MasonryLayout/MasonryLayout'
import { deletePin, getPins, getPinsByCreator, getPinsByTags } from '../../features/pinsSlice'
import { fetchUser } from '../../utils/fetchUser'
import useStyles from './styles'
import Spinner from '../../components/Spinner/Spinner'
import TopNavbar from '../../components/TopNavbar/TopNavbar'

const Profile = () => {
  const { userId } = useParams()
  let user = fetchUser()
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


  useEffect(() => {
    async function updateUserSaves() {
      const ids = pins.map((pin:any) => pin._id)
      let updatedSaves = user?.result.saves?.filter((save:any) => ids.includes(save._id))
      if (!updatedSaves) updatedSaves = []
      await dispatch(updateSaves({user, updatedSaves}))
      user = fetchUser()
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
  

  return (
    <>
      <Box sx={{display: 'flex'}}>
        <Box sx={{position: 'absolute', left: '50%'}}>
          <Box sx={{position: 'relative', left: '-50%'}}>
            <Avatar className={classes.profileImage}>
              <Typography className={classes.userNameInitial}>{user?.result.userName.charAt(0)}</Typography>
            </Avatar>          
            <Typography className={classes.userName}>@{user?.result.userName.split(' ').join('')}</Typography>
          </Box>
        </Box>
        </Box>        

        <Box className={classes.buttonContainer} >
            <Button className={classes.shareButton} variant='outlined'>
              <Typography sx={{fontSize: 14, color: 'black'}}>Share</Typography>
              </Button>
            <Button className={classes.editProfileButton} variant='outlined'>
            <Typography sx={{fontSize: 14, color: 'black'}}>Edit Profile</Typography>
            </Button>
        </Box>
      

      <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: 30}}>
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
              <Box sx={{width: '100%', paddingTop: 8}}>
                <MasonryLayout pins={user?.result.saves} />
              </Box>
            } 
            </>
          :
          <Box sx={{width: '100vw', paddingTop: 8}}>
            <MasonryLayout pins={createdPins} />                       
          </Box>
          }      
              
        </Box>         
    </>
  )
}

export default Profile