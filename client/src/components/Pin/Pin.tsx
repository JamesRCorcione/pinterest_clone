import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiTwotoneDelete } from 'react-icons/ai'
import { fetchUser } from '../../utils/fetchUser'
import { Avatar, Box, Button, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UploadIcon from '@mui/icons-material/Upload';

import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { SavePin } from '../../features/usersSlice'
import { grey } from '@mui/material/colors'
import { deletePin } from '../../features/pinsSlice'
import { Divider } from '@material-ui/core'

interface PinProps {
    pin: IPin
}

const Pin = ({ pin }:PinProps) => {
  const user = fetchUser()
  const [postHovered, setPostHovered] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  const [openPinMenu, setOpenPinMenu] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const navigate = useNavigate()
  const { classes } = useStyles()
  const dispatch = useDispatch<AppDispatch>()
  const { postedBy, image, _id, destination } = pin

 useEffect(() => {
  setOpenMobileMenu(false)
 }, [])

  let alreadySaved = user?.result.saves.filter((save:any) => save?._id === pin?._id)
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : []


  const savePin = async (e:any) => {    
    if (alreadySaved?.length === 0) {
      setSavingPost(true)
      await dispatch(SavePin({user, pin}))
      .then(() => {
        window.location.reload();
        setSavingPost(false);      
      })
      .catch((error:any) => console.log(error))
    }   
  }
  
  const handleGoToProfile = () => {
    navigate(`/user-profile/${postedBy?.userId}`)
    window.location.reload();
  }

  const handleGoToPin = () => {
    navigate(`/pin-detail/${_id}`)
    window.location.reload();
  }

  const handleDeletePin = async (e:any) => {
    await dispatch(deletePin(pin._id))
  }

  return (  
    <>
    <Box>

      {/* Handles on hover image -> Buttons display */}
      <Box
        className={classes.container} 
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={handleGoToPin}
      >

        {/* Switches rendering for if post is hovered with mouse */}
        {!postHovered 
          ?
           <img className={classes.imageOp} alt="user-post" src={image}  /> 
          : 
          <>
            <img className={classes.image} alt="user-post" src={image}  />
            <Box className={classes.onHoverImageContainer}>

            {/* Save button logic and buttons */}
            <Box className={classes.saveButtonContainer}>              
              {alreadySaved?.length !== 0 ? (
                <Button 
                  className={classes.savedButton}
                  variant="contained" 
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    savePin(e)
                  }}
                >
                    Saved
                </Button>
              ) : (
                <Button 
                  className={classes.saveButton}
                  variant="contained" 
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    savePin(e)
                  }}
                  type="button" 
                  >
                    {savingPost ? 'Saving...' : 'Save'}
                </Button>                
              )}
            </Box>

            {/* Button for html link */}
            <Box>
              <Button
                  className={classes.htmlLinkButton}
                  href={`${destination}`}
                  variant='contained'
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  {destination?.length < 12 ?
                    <Typography sx={{fontSize: 10, color: 'black'}}>{destination}</Typography>
                  :
                  <Typography sx={{fontSize: 10, color: 'black'}}>{destination?.slice(12,23)}...</Typography>
                  }
              </Button>
            </Box>

            {/* Button for sharing */}
            <Box>
              <Button 
                className={classes.shareImageButton}
                href={`${image}?dl=`}
                download
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <UploadIcon />
              </Button>
            </Box>

            {/* Button for more action menu to open */}
            <Box>
                <Button 
                  className={classes.moreActionsButton}
                  href={`${image}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()                    
                    setOpenPinMenu((prev) => !prev)
                  }}
                >
                  <MoreHorizIcon />
                </Button>
            </Box>  

          </Box>
          </>
        }
      </Box>

      {/* Pin title */}
      <Box sx={{marginLeft: 2}}>
        <Typography sx={{fontSize: 14}}>{pin?.title}</Typography>
      </Box>
          
      {/* Pin Username and image */}
      <Box sx={{display: 'flex'}}>
        <Button 
          style={{ backgroundColor: 'transparent' }} 
          onClick={() => navigate(`/user-profile/${postedBy?.userId}`)}
          sx={{marginLeft: 0.5, textTransform: 'capitalize'}}
        >
          {postedBy?.image 
          ?
            <img  
              src={postedBy?.image}
              alt="user-profile"
            />
          :
            <Avatar sx={{minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30}}>{postedBy?.userName?.charAt(0)}</Avatar>
          }
          <Typography sx={{marginLeft:1, fontSize: 12, color: 'black', boxShadow: 'none', textDecoration: 'none'}}>{postedBy?.userName}</Typography>
        </Button>
      </Box> 

      <Box className={classes.mobileButtonContainer}>
        <Button 
          className={classes.mobileActionMoreButton}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()                    
            setOpenMobileMenu((prev) => !prev)
          }}
        >
          <MoreHorizIcon />
        </Button>
        <Divider />
      </Box>

        
        {/* ... Menu Opening */}
    {openPinMenu &&
      <Box sx={{position: 'relative', left: 175, bottom: 75}}>
        <Box sx={{position: 'absolute', height: 'auto', width: 120, borderRadius: 2, boxShadow: 5, backgroundColor: 'white'}}>
          <Button
              style={{ backgroundColor: 'transparent' }} 
              onClick={() => {}}
              sx={{marginLeft: 0.5, textTransform: 'capitalize'}}
          >
              <Typography sx={{marginLeft: 2}}>Edit Pin</Typography>
          </Button>
          <Button
            style={{ backgroundColor: 'transparent' }} 
            onClick={(e) => handleDeletePin(e)}
            sx={{marginLeft: 0.5, textTransform: 'capitalize'}}
          >
            <Typography sx={{marginLeft: 2}}>Delete Pin</Typography>
          </Button>
        </Box>
      </Box>
    }
    {openMobileMenu &&
      <Box sx={{position: 'relative'}}>
        <Box className={classes.mobileActionMenu}>
          <Button
              style={{ backgroundColor: 'transparent' }} 
              onClick={(e) => savePin(e)}
              sx={{marginLeft: 0.5, textTransform: 'capitalize'}}
          >
              <Typography sx={{marginLeft: 2}}>Save Pin</Typography>
          </Button>

        </Box>
    </Box>
    }
    </Box>    
    </>
  )
}

export default Pin