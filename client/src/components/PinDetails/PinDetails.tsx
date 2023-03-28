import Feed from '../Feed/Feed'
import { Box, Button, Typography, Link, TextField, Input, Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPin } from '../../features/pinsSlice'
import { useDispatch, useSelector } from 'react-redux'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UploadIcon from '@mui/icons-material/Upload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';
import { Divider } from '@mui/material';
import { grey, blue } from '@mui/material/colors';


import Comment from '../Comment/Comment'
import useStyle from './styles'
import { SavePin } from '../../features/usersSlice'
import { fetchUser } from '../../utils/fetchUser'
import { createComment, getComments } from '../../features/commentsSlice'



const PinDetails = () => {
  const user = fetchUser()
  const dispatch = useDispatch<AppDispatch>()
  const [pin, setPin] = useState<IPin>()
  const [savingPost, setSavingPost] = useState(false)
  
  const [text, setText] = useState<any>()
  const { pinId } = useParams()
  const classes = useStyle()

  const commentsState = useSelector((state: RootState) => state.commentsState);
  const { comments } = commentsState

  useEffect(() => {
    dispatch(getComments(pinId))
  }, [dispatch])

  console.log(comments)

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
  
  const handleComment = async (e:any) => {
    e.preventDefault()
    if (pinId) {
      await dispatch(createComment({pinId, text, userName: user.userName, userImage: user.userImage}))
    }
  }

  

  return (
    <Box>
    <Box sx={{height: 'auto'}}>  
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2, height: 'auto'}}>
        <Box sx={{display: 'flex', borderRadius: 10, boxShadow: 10, width: 800, height: 'auto'}}>
          <Box sx={{display: 'flex', height: 'auto', width: 400}}>
            <img className={classes.image} src={pin?.image}></img>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', flex: 'wrap', height: 500, width: 400,}}>  

            <Box sx={{display: 'flex', height: 80, width: 400,}}>
                <MoreHorizIcon sx={{position: 'relative', left: 0, top: 50}} />
                <UploadIcon sx={{position: 'relative', left: 20, top: 50}}/>
                <ContentCopyIcon sx={{position: 'relative', left: 40, top: 50}} />
                <Box sx={{position: 'relative', top: 35, left: 250}}>
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
            <Box sx={{flex: 'wrap', overflowY: 'auto', overflowX: 'hidden', marginTop: 5, marginRight: 2, marginLeft: 2}}>
              <Box sx={{display: 'flex', height: 20, width: 400,}}>
                <Link>{pin?.destination}</Link>
              </Box>
              <Box sx={{display: 'flex', height: 150, width: 400,}}>
                <Box>
                  {pin?.title}
                <Box>
                </Box>
                  {pin?.text}
                </Box>
              </Box>
              <Box sx={{display: 'flex', height: 100, width: 400, backgroundColor: 'pink'}}>
                {pin?.postedBy.image}
                {pin?.postedBy.userName}
              </Box>
              <Box sx={{display: 'flex', flexDirection: 'column',  overflowY: 'auto', minHeight: 100, height: 'auto', width: 400,}}>
                Comments
                {comments &&
                  comments.map((comment:IComment, i:number) => (
                    <Comment key={i} pinId={pinId} user={user} comment={comment} />
                  ))
                }
                </Box>
              <Box sx={{position: 'absolute', bottom: 70, height: 70, width: 375, backgroundColor: 'pink'}}>
                <Box sx={{display: 'flex'}}>
                  <Divider />
                <Avatar sx={{marginTop: 1, marginLeft: 2, marginRight: 2}}>{user.userName.charAt(0)}</Avatar>
                <Box className={classes.searchBar}>
                  <form onSubmit={handleComment}>
                    <Input      
                      onChange={(e:any) => setText(e.target.value)}             
                      placeholder='Add a comment'
                      disableUnderline={true} 
                      sx={{ typography: 'subtitle2', width: '180%', marginTop: 1.5, marginLeft: 2, color: grey[600]}} 
                    />        
                  </form>                        
                </Box>
              </Box>
              </Box>
            </Box>
          </Box>
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