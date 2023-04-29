import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiTwotoneDelete } from 'react-icons/ai'
import { fetchUser } from '../../utils/fetchUser'
import { Avatar, Box, Button, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UploadIcon from '@mui/icons-material/Upload';

import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserById, RemoveSavePin, SavePin } from '../../features/usersSlice'
import { grey } from '@mui/material/colors'
import { deletePin } from '../../features/pinsSlice'
import { Divider } from '@material-ui/core'
import FileSaver from 'file-saver'

import { handleDownload, handleDeletePin, removeSavePin, savePin } from '../../utils/pinUtils'
import { handleGoToPin, handleGoToProfile } from '../../utils/navigationUtils'
import { getImageDimensions } from '../../utils/getImageHeight'
import Spinner from '../Spinner/Spinner'

interface PinProps {
    pin: IPin
}

const Pin = ({ pin }:PinProps) => {
  let user = fetchUser()
  const [loading, setLoading] = useState(false)
  const [postHovered, setPostHovered] = useState(false)
  const navigate = useNavigate()
  const [savingPost, setSavingPost] = useState(false)
  const [openPinMenu, setOpenPinMenu] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const usersState = useSelector((state: RootState) => state.usersState);
  const { users } = usersState

  
  const { classes } = useStyles()
  const dispatch = useDispatch<AppDispatch>()
  const { creatorId, image, _id, destination } = pin
  const [creatorUserName, setCreatorUserName] = useState('')
  const [creatorUserImage, setCreatorUserImage] = useState('')
  const [imageDimensions, setImageDimensions] = useState<any>()


  let totalSaved = user?.result.saves.filter((save:any) => save?._id === pin?._id)
  let saved = totalSaved?.length > 0 ? true : false

  useEffect(() => {
    setOpenMobileMenu(false)  
    user = fetchUser()
    totalSaved = user?.result.saves.filter((save:any) => save?._id === pin?._id)
    saved = totalSaved?.length > 0 ? true : false    
  }, [])

  useEffect(() => {
    getCreatorUser()
  }, [users])

  const getCreatorUser = async () => {
    //let data = await dispatch(GetUserById(creatorId))
    if (users) {
      const creatorUser = await users.find((user:any) => user._id === creatorId)
      setCreatorUserName(creatorUser?.userName)
      setCreatorUserImage(creatorUser?.image)
    }

    await getImageDimensions(pin.image)
      .then((d) => setImageDimensions(d))
    
  }

  console.log('imdim',imageDimensions)


  return (  
    <Box>
      {/* Handles on hover image -> Buttons display */}
      <Box
        className={classes.container} 
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => handleGoToPin({_id, navigate})}
      >

        {/* Switches rendering for if post is hovered with mouse */}
        {!postHovered 
          ?
           <img className={classes.imageOp}  alt="user-post" src={image}  /> 
          : 
          <>
            <img className={classes.image} height={imageDimensions.h} width={imageDimensions.w} alt="user-post" src={image}  />
            <Box className={classes.onHoverImageContainer}>

            {/* Save button logic and buttons */}
            <Box className={classes.saveButtonContainer}>              
              {saved ? (
                <Button 
                  className={classes.savedButton}
                  variant="contained" 
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    removeSavePin({e, user, pin, saved, dispatch})
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
                    savePin({e, user, pin, saved, dispatch})
                  }}
                  type="button" 
                  >
                    {savingPost ? 'Saving...' : 'Save'}
                </Button>                
              )}
            </Box>

            {/* Button for html link */}
            {destination &&
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
            }

            {/* Button for sharing */}
            <Box>
              <Button 
                className={classes.shareImageButton}
                
                onClick={(e) => handleDownload({e, pin})}
              >
                <UploadIcon />
              </Button>
            </Box>

            {/* Button for more action menu to open */}
            {user.result._id === pin.creatorId &&
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
            }
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
          onClick={() => handleGoToProfile({creatorId, navigate})}
          sx={{marginLeft: 0.5, textTransform: 'capitalize'}}
        >
          {creatorUserImage 
          ?
            <Box sx={{borderRadius: 99, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden'}}>
              <img  
                src={creatorUserImage}
                width={40}
                height={40}
                alt="user-profile"
              />
            </Box>
          :
            <Avatar sx={{minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30}}>{creatorUserName.charAt(0)}</Avatar>
          }
          <Typography sx={{marginLeft:1, fontSize: 12, color: 'black', boxShadow: 'none', textDecoration: 'none'}}>{creatorUserName}</Typography>
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
              onClick={(e) => handleDeletePin({pinId: pin._id})}
              sx={{marginLeft: 0.5, textTransform: 'capitalize'}}
            >
              <Typography sx={{marginLeft: 2}}>Delete Pin</Typography>
            </Button>
          </Box>
        </Box>
      }

      {/* ... Mobile Menu Opening */}
      {openMobileMenu &&
        <Box sx={{position: 'relative'}}>
          <Box className={classes.mobileActionMenu}>
            <Button
                style={{ backgroundColor: 'transparent' }} 
                onClick={(e) => savePin({e, user, pin, saved, dispatch})}
                sx={{marginLeft: 0.5, textTransform: 'capitalize'}}
            >
                <Typography sx={{marginLeft: 2}}>Save Pin</Typography>
            </Button>

          </Box>
      </Box>
      }

    </Box>    
  )
}

export default Pin