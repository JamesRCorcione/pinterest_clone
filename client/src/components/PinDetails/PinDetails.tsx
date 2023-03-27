import Feed from '../Feed/Feed'
import { Box, Button, Typography, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPin } from '../../features/pinsSlice'
import { useDispatch } from 'react-redux'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UploadIcon from '@mui/icons-material/Upload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import useStyle from './styles'
import { SavePin } from '../../features/usersSlice'
import { fetchUser } from '../../utils/fetchUser'



const PinDetails = () => {
  const user = fetchUser()
  const dispatch = useDispatch<AppDispatch>()
  const [pin, setPin] = useState<IPin>()
  const [savingPost, setSavingPost] = useState(false)
  const { pinId } = useParams()
  const classes = useStyle()


  useEffect(() => {
    dispatch(getPin(pinId))
      .then((data:any) => setPin(data.payload))
  }, [pinId])
  
  let alreadySaved = user?.saves?.filter((save:any) => save?._id === pin?._id)
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];


  const savePin = async () => {
    if (alreadySaved.length === 0 && pin) {      
      setSavingPost(true)   
      await dispatch(SavePin({id: user._id, pin: pin}))
      .then(() => {
        //window.location.reload();
        setSavingPost(false);
      })
      
    }   
  }

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',  paddingBottom: 5}}>
        <Box sx={{display: 'flex', boxShadow: 8, borderRadius: 10,  width: 1000, marginTop: 2}}>
          <Box sx={{display: 'flex', borderRadius: 10, width: '50%'}}>
            <img className={classes.image} src={pin?.image}></img>
          </Box>


          <Box>           
          <Box sx={{display: 'flex'}}>
              <Box sx={{display: 'flex'}}>
                <MoreHorizIcon sx={{position: 'relative', left: 40, top: 50}} />
                <UploadIcon sx={{position: 'relative', left: 60, top: 50}}/>
                <ContentCopyIcon sx={{position: 'relative', left: 80, top: 50}} />
              </Box>

              <Box sx={{position: 'relative', left: 325, top: 40}}>              
                {alreadySaved?.length !== 0 ? (
                  <Button sx={{ borderRadius: 99, minHeight: 40, maxHeight: 40, minWidth: 70, maxWidth: 70, backgroundColor: 'red'}}
                    variant="contained" 
                    onClick={(e) => {
                      e.stopPropagation()
                      savePin()
                    }}
                    >
                      Saved
                  </Button>
                ) : (
                  <Button sx={{borderRadius: 99, minHeight: 40, maxHeight: 40, minWidth: 70, maxWidth: 70, backgroundColor: 'red'}}
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
            </Box>

          </Box>


          <Link sx={{position: 'absolute', left: 665, top: 175, color: 'inherit'}}>{pin?.destination}</Link>
          <Box>
            <Typography sx={{position: 'absolute', left: 665, top: 215}}>{pin?.title}</Typography>
            <Typography sx={{position: 'absolute', left: 665, top: 255}}>{pin?.text}</Typography>
          </Box>
          <Box>
            <Typography sx={{position: 'absolute', left: 665, top: 300,}}>Comments</Typography>
            <Typography sx={{position: 'absolute', left: 665, top: 335,}}>No comments yet! Add one to start the conversation.</Typography>
          </Box>
        </Box>
      </Box>

      


      <Box sx={{position: 'absolute', left: '50%'}}>
        <Box sx={{position: 'relative', left: '-50%'}}>
          <Typography>More like this</Typography>
        </Box>
      </Box>

      <Box sx={{paddingTop: 5}}>
        <Feed />
      </Box>
    </Box>
  )
}

export default PinDetails