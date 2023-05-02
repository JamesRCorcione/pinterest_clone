import { Avatar, Box, Button, capitalize, Icon, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { GetUserById, Logout, RemoveSavePin } from '../../features/usersSlice'

import { grey, red } from '@mui/material/colors';
import Pin from '../../components/Pin/Pin'
import Feed from '../../components/Feed/Feed'
import { deletePin, getPins, getPinsByCreator, getPinsByTags } from '../../features/pinsSlice'
import { fetchUser } from '../../utils/fetchUser'
import useStyles from './styles'
import Spinner from '../../components/Spinner/Spinner'
import TopNavbar from '../../components/TopNavbar/TopNavbar'
import Share from '../../components/Share/Share'
import EditProfile from '../../components/EditProfile/EditProfile'
import { Circles } from 'react-loader-spinner'
import LinearProgress from '@mui/material/LinearProgress';


const Profile = () => {
  const { userId } = useParams()
  const [currentUser, setCurrentUser] = useState<any>(fetchUser())
  const dispatch = useDispatch<AppDispatch>()
  const pinsState = useSelector((state: RootState) => state.pinsState);
  const { pins } = pinsState
  const usersState = useSelector((state: RootState) => state.usersState);
  const { users } = usersState
  const [profileUser, setProfileUser] = useState<any>()
  const location = useLocation()
  const [createdPins, setCreatedPins] = useState<IPin>()
  const [isSavedTab, setIsSavedTab] = useState<boolean>(true)
  const { classes } = useStyles()
  const navigate = useNavigate()
  const [openShare, setOpenShare] = useState<boolean>(false)
  const [openEditProfile, setOpenEditProfile] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)


  useEffect(() => {  
    if (!profileUser)  {
      getUserProfile() 
    }
  }, [users])

  async function getUserProfile() {
    setLoading(true)
    if (users) {
      const proUser = await users.find((user:any) => user._id === userId)
      setProfileUser(proUser)
    }
    await dispatch(getPinsByCreator(userId))
      .then((jsonData:any) => setCreatedPins(jsonData.payload))    
    setLoading(false)
  }

  const logoutUser = async () => {
    dispatch(Logout())
    //setProfileUser(null)
    navigate('/login')    
  }

  if (loading) (
    <Box sx={{position: 'absolute', top: 70, width: '100%', color: red[400]}}>
      <LinearProgress color='inherit' />
    </Box>
  )
  
  return (
    <>
    {profileUser &&
      <>
      <Box className={classes.topContainer}>
        <Box sx={{position: 'absolute', left: '50%',}}>
          <Box sx={{position: 'relative', left: '-50%'}}>
          {profileUser?.image 
          ?
            <Box className={classes.profileImage} sx={{borderRadius: 99, overflow: 'hidden'}}>
                <img  
                  src={profileUser?.image}
                  width={'200px'}
                  height={'auto'}
                  alt="user-profile"
                />
            </Box>
          :
            <Avatar className={classes.profileImage} >
              <Typography className={classes.userNameInitial} >{profileUser?.userName.charAt(0)}</Typography>
            </Avatar>
          }         
            <Typography className={classes.userName}>@{profileUser?.userName.split(' ').join('')}</Typography>
          </Box>
        </Box>
      </Box>        

      <Box className={classes.mobileLogout}>
        <Button className={classes.mobileLogoutButton} variant='outlined' onClick={logoutUser}>Logout</Button>
      </Box>

      <Box className={classes.buttonContainer} >
        
        <Box className={classes.shareButton}>
          {openShare &&
            <Box sx={{position: 'absolute', top: 60,  zIndex: 2}}>
              <Share image={profileUser?.image} />
            </Box>
          }
        </Box>

        <Box className={classes.editProfileButton}>
          {openEditProfile &&
            <Box sx={{position: 'absolute', top: 60, zIndex: 2}}>
              <EditProfile profileUser={profileUser} />
            </Box>
          }
        </Box>

        <Button className={classes.shareButton}  onClick={() => setOpenShare((prev) => !prev)} variant='outlined'>
          <Typography sx={{fontSize: 14, color: 'black'}}>Share</Typography>
        </Button>        
        
        {currentUser.result._id === profileUser?._id &&
          <Button className={classes.editProfileButton} onClick={() => setOpenEditProfile((prev) => !prev)} variant='outlined'>
            <Typography sx={{fontSize: 14, color: 'black'}}>Edit Profile</Typography>
          </Button>
        }
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
                <Feed pins={profileUser?.saves} />
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
    }
  </>
  )
}

export default Profile