import Feed from '../Feed/Feed'
import { Box, Button, Typography, Link, TextField, Input, Avatar } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getPin } from '../../features/pinsSlice'
import { useDispatch, useSelector } from 'react-redux'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UploadIcon from '@mui/icons-material/Upload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';
import { Divider } from '@mui/material';
import { grey, blue } from '@mui/material/colors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



import Comment from '../Comment/Comment'
import useStyle from './styles'
import { SavePin } from '../../features/usersSlice'
import { fetchUser } from '../../utils/fetchUser'
import { createComment, getComments } from '../../features/commentsSlice'
import { Circles } from 'react-loader-spinner'

const getTotalComments = (comments:IComment[]) => {
  let total = comments?.length
  comments.map((comment, i) => total += comment.replies?.length)
  return total
}

const PinDetails = () => {
  const user = fetchUser()
  const dispatch = useDispatch<AppDispatch>()
  const commentsState = useSelector((state: RootState) => state.commentsState);
  const { comments } = commentsState
  const [pin, setPin] = useState<IPin>()
  const [totalComments, setTotalComments] = useState(0)
  const [savingPost, setSavingPost] = useState(false)
  const [expandComments, setExpandComments] = useState(false)
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState<any>()
  const { pinId } = useParams()
  const classes = useStyle()
  const location = useLocation()

  useEffect(() => {
    getPinDetails()    
  }, [location])

  useEffect(() => {    
    getNewComment()
  }, [comments.length])
  
  let alreadySaved = user?.saves?.filter((save:any) => save?._id === pin?._id)
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];


  const getPinDetails = async () => {
    window.scrollTo(0, 0) 
    //Need another loading screen for the whole pin
    setLoading(true)
    await dispatch(getPin(pinId))
      .then((data:any) => setPin(data.payload))  
    await dispatch(getComments(pinId))
    setLoading(false)     
  }

  const getNewComment = async () => {
    setLoading(true)
    await dispatch(getComments(pinId))
    setLoading(false)
  }

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
      const userCommenting = {
        userId: user._id,
        userName: user.userName,
        userImage: user.image
      }
      setLoading(true)
      await dispatch(createComment({pinId, text, userCommenting }))
      setText('')
      setLoading(false)
    }
  }

  const handleExpandComments = () => {
    setExpandComments((expand) => !expand)
  }

  function detailsRender()  {
    return (
      <>
      <Box sx={{display: 'flex', marginLeft: 1, width: 400,}}>
        <Link>{pin?.destination}</Link>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: 1, width: 400,}}>
        <Box sx={{display: 'flex',}}>
          {pin?.title}
        </Box>
        <Box sx={{display: 'flex',}}>
          {pin?.text}
        </Box>
      </Box>
      <Box sx={{display: 'flex',width: 400}}>
        {pin?.postedBy.image}
        {pin?.postedBy.userName}
      </Box>
      <Box sx={{display: 'flex'}}>
        <Typography sx={{marginTop: 1}}>
            {comments.length} Comments 
          </Typography>
        <Button onClick={handleExpandComments}
        sx={{borderRadius: 99, marginTop: 0.5, marginLeft: 1, minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30}}>                
          <KeyboardArrowDownIcon sx={{color: 'black'}} />
        </Button>
      </Box>
      {loading &&
        <Box sx={{position: 'relative', marginLeft: 8, marginTop: 3, marginBottom: 3}}>
        <Circles 
            color={grey[400]}
            height={30}
            width={150}
        />
      </Box>
      }
      </>
    )
  }


  return (
    <>
    <Box>  
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginY: 2}}>
        <Box sx={{display: 'flex', borderRadius: 10, boxShadow: 10, width: 800, height: 'auto'}}>
          
          <img className={classes.image} src={pin?.image}></img>

          <Box sx={{display: 'flex', flexDirection: 'column', flex: 'wrap', maxHeight: '92vh', height: 'auto', width: 400}}>  

            <Box sx={{display: 'flex', width: 400}}>
                <MoreHorizIcon sx={{position: 'relative', left: 30, top: 40}} />
                <UploadIcon sx={{position: 'relative', left: 50, top: 40}}/>
                <ContentCopyIcon sx={{position: 'relative', left: 70, top: 40}} />
                <Box sx={{position: 'relative', top: 30, left: 225}}>
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

            {expandComments
            ?
            <Box sx={{flex: 'wrap',overflowY: 'auto', overflowX: 'hidden', height: '100%', marginTop: 5,  marginRight: 2, marginLeft: 2}}>
              {detailsRender()}              
            </Box>
            :
            <Box sx={{flex: 'wrap', overflowY: 'auto', overflowX: 'hidden', height: '100%', marginTop: 5, marginRight: 2, marginLeft: 2}}>
              {detailsRender()}
              <Box sx={{display: 'flex', flexDirection: 'column',  overflowY: 'auto',  height: 'auto', width: 400}}>
                {comments &&
                  comments.map((comment:IComment, i:number) => (
                    <Comment key={i} pinId={pinId} user={user} comment={comment} />
                  ))
                }
              </Box>              
            </Box>   
            }         
            <Box sx={{display: 'flex', height: 70, flexDirection: 'column', justifyContent: 'end', alignContent: 'end'}}>
              <Divider /> 
            <Box sx={{marginBottom: 1, display: 'flex', justifyContent: 'end', alignItems: 'end'}}>              
                <Avatar sx={{marginBottom: 1, marginLeft: 2, marginRight: 2}}>{user.userName.charAt(0)}</Avatar>
                <Box sx={{marginTop: 1, marginRight: 5}} className={classes.searchBar}>
                  <form onSubmit={handleComment}>
                    <Input      
                      onChange={(e:any) => setText(e.target.value)}             
                      placeholder='Add a comment'
                      disableUnderline={true} 
                      sx={{ typography: 'subtitle2', width: '100%', marginTop: 1.5, marginLeft: 2, color: grey[600]}} 
                    />        
                  </form>                        
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
    </>
  )
}

export default PinDetails