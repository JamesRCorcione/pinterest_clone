import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { fetchUser } from '../../utils/fetchUser'
import { Avatar, Box, Button, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UploadIcon from '@mui/icons-material/Upload';

import useStyles from './styles'

import { getImageDimensions } from '../../utils/getImageHeight'
import { useDispatch, useSelector } from 'react-redux'
import { SavePin } from '../../features/usersSlice'
import userEvent from '@testing-library/user-event'
import { grey } from '@mui/material/colors'


interface PinProps {
    pin: IPin
}

const Pin = ({ pin }:PinProps) => {
  const user = fetchUser()
  const [postHovered, setPostHovered] = useState(false)  
  const [savingPost, setSavingPost] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()  
  const classes = useStyles()
  const { postedBy, image, _id, destination } = pin
  

  let alreadySaved = user?.saves?.filter((save:any) => save?._id === pin?._id)
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];


  const savePin = async () => {
    if (alreadySaved.length === 0) {      
      setSavingPost(true)   
      await dispatch(SavePin({id: user._id, pin: pin}))
      .then(() => {
        //window.location.reload();
        setSavingPost(false);
      })      
    }   
  }
  
  const handleGoToProfile = () => {
    navigate(`/user-profile/${postedBy?.userId}`)
    window.location.reload();
  }
  

  return (  
    <Box>
      <Box
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className={classes.container}        
        >
        
        {!postHovered ?
         ( <img className={classes.imageOp} alt="user-post" src={image}  /> )
        : (
          <>
          <img className={classes.image} alt="user-post" src={image}  />
          <Box 
            sx={{position: 'absolute', top:0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}
            >
            <Box sx={{display: 'flex', alignItems: 'center', justifyItems: 'justify-between'}}>
              
              {alreadySaved?.length !== 0 ? (
                <Button sx={{position: 'absolute', top: 10, right: 10, borderRadius: 99, minHeight: 40, maxHeight: 40, minWidth: 70, maxWidth: 70, backgroundColor: 'red'}}
                  variant="contained" 
                  onClick={(e) => {
                    e.stopPropagation()
                    savePin()
                  }}
                  >
                    Saved
                </Button>
              ) : (
                <Button sx={{position: 'absolute', top: 10, right: 10, borderRadius: 99, minHeight: 40, maxHeight: 40, minWidth: 70, maxWidth: 70, backgroundColor: 'red'}}
                  variant="contained" 
                  onClick={(e) => {
                    e.stopPropagation()
                    savePin()
                  }}
                  type="button" 
                  >
                    {savingPost ? 'Saving...' : 'Save'}
                </Button>
                
              )}
            </Box>


            <Box>
                <Button
                  sx={{'&:hover': { backgroundColor: grey[100], opacity: 1}, minHeight: 30, maxHeight: 30, minWidth: 90, maxWidth: 120, borderRadius: 99, position: 'absolute', bottom: 15, left: 10, backgroundColor: grey[200], opacity: 0.9}}
                  href={`${destination}`}
                  variant='contained'
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  {destination.length < 12 ?
                    <Typography sx={{fontSize: 10, color: 'black'}}>{destination}</Typography>
                  :
                  <Typography sx={{fontSize: 10, color: 'black'}}>{destination.slice(12,23)}...</Typography>
                  }
                </Button>
              </Box>

              <Box>
                <Button 
                  sx={{'&:hover': { backgroundColor: grey[100], opacity: 1}, minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30, backgroundColor: grey[200], borderRadius: 99, position: 'absolute', bottom: 15, right: 60, opacity: 0.9 }}
                  href={`${image}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <UploadIcon />
                </Button>
            </Box>

            <Box>
                <Button 
                  className={classes.bottomButtons}
                  sx={{'&:hover': { backgroundColor: grey[100], opacity: 1}, minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30, backgroundColor: grey[200], borderRadius: 99, position: 'absolute', bottom: 15, right: 15, opacity: 0.9}}
                  href={`${image}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <MoreHorizIcon />
                </Button>
            </Box>

            <Box>
                 
                  {(false) && (                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        //deletePin(_id)
                      }}
                    >

                    <AiTwotoneDelete />
                    </button>
                  )}
            </Box>
          </Box>
          </>
        )}
        </Box>
          <Box sx={{marginLeft: 2}}>
            <Typography sx={{fontSize: 14}}>{pin.title}</Typography>
          </Box>

          
      <Box sx={{display: 'flex'}}>
        <Button 
          style={{ backgroundColor: 'transparent' }} 
          onClick={handleGoToProfile}
          sx={{marginLeft: 0.5, textTransform: 'capitalize'}}
        >
          {postedBy?.image 
          ?
            <>
              <img  
                src={postedBy?.image}
                alt="user-profile"
              />
            </>
          :
            <>
              <Avatar sx={{minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30}}>{postedBy?.userName.charAt(0)}</Avatar>
            </>
          }
          <Typography sx={{marginLeft:1, fontSize: 12, color: 'black', boxShadow: 'none', textDecoration: 'none'}}>{postedBy?.userName}</Typography>
        </Button>
      </Box>          
    </Box>
  )
}

export default Pin
