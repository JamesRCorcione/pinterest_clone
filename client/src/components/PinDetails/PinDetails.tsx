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
import { createReply, getReplies } from '../../features/repliesSlice'





const PinDetails = () => {
  const user = fetchUser()
  const dispatch = useDispatch<AppDispatch>()
  const commentsState = useSelector((state: RootState) => state.commentsState);
  let { comments } = commentsState
  const repliesState = useSelector((state: RootState) => state.repliesState);
  let { replies } = repliesState
  const [pin, setPin] = useState<IPin>()
  const [savingPost, setSavingPost] = useState(false)
  const [expandComments, setExpandComments] = useState(true)
  const [totalComments, setTotalComments] = useState<number>()
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState<any>()
  const { pinId } = useParams()
  const { classes } = useStyle()
  const location = useLocation()
  
  let alreadySaved = user?.result?.saves?.filter((save:any) => save?._id === pin?._id)
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  useEffect(() => {
    const getComment = async () => {
      getPinDetails()
      getNewComment()         
    }
    getComment()
  }, [dispatch])

  const getPinDetails = async () => {
    window.scrollTo(0, 0) 
    //Need another loading screen for the whole pin
    setLoading(true)
    const data = await dispatch(getPin(pinId))
    setPin(data.payload)
    setLoading(false)     
  }

  const getNewComment = async () => {
    setLoading(true)
    await dispatch(getComments(pinId))
    await dispatch(getReplies(pinId))
    setLoading(false)
  }

  const savePin = async () => {
    if (alreadySaved.length === 0 && pin) {      
      setSavingPost(true)   
      await dispatch(SavePin({user, pin}))
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
        userId: user.result._id,
        userName: user?.result.userName,
        userImage: user?.result.image
      }
      setLoading(true)
      await dispatch(createComment({ pinId, text, userCommenting }))
      getNewComment()
      setText('')
      setLoading(false)
    }
  }

  const handleExpandComments = () => {
    setExpandComments((expand) => !expand)
  }


  return (
    <>
      <Box className={classes.pageContainer}>
        <Box className={classes.pinContainer}>

          <Box className={classes.topButtonsMobileContainer}>
                <MoreHorizIcon sx={{position: 'relative', left: 30, top: 25}} />
                <UploadIcon sx={{position: 'relative', left: 50, top: 25}}/>
                <ContentCopyIcon sx={{position: 'relative', left: 70, top: 25}} />

              <Box className={classes.saveButtonContainer}>
                {alreadySaved?.length !== 0 ? (
                  <Button 
                    className={classes.savedButton}
                    variant="contained" 
                    onClick={(e) => {
                      e.stopPropagation()
                      savePin()
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
                      savePin()
                    }}
                    type="button" 
                  >
                    {savingPost ? 'Saving...' : 'Save'}
                  </Button>                  
                )}
              </Box>
          </Box>      
          <img className={classes.mobileImage} src={pin?.image}></img>
          <img className={classes.image} src={pin?.image}></img>
          <Box className={classes.commentSectionContainer}>  

            <Box className={classes.topButtonsContainer}>
                <MoreHorizIcon sx={{position: 'relative', left: 30, top: 25}} />
                <UploadIcon sx={{position: 'relative', left: 50, top: 25}}/>
                <ContentCopyIcon sx={{position: 'relative', left: 70, top: 25}} />

              <Box className={classes.saveButtonContainer}>
                {alreadySaved?.length !== 0 ? (
                  <Button 
                    className={classes.savedButton}
                    variant="contained" 
                    onClick={(e) => {
                      e.stopPropagation()
                      savePin()
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
                      savePin()
                    }}
                    type="button" 
                  >
                    {savingPost ? 'Saving...' : 'Save'}
                  </Button>                  
                )}
              </Box>
            </Box>              

              
            <Box>
              <Box sx={{display: 'flex', marginLeft: 1, width: 'auto',}}>
                <Link>{pin?.destination}</Link>
              </Box>
              <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: 1, width: 'auto',}}>
                <Box sx={{display: 'flex',}}>
                  {pin?.title}
                </Box>
                <Box sx={{display: 'flex',}}>
                  {pin?.text}
                </Box>
              </Box>
              <Box sx={{display: 'flex',width: 'auto'}}>
                {pin?.postedBy.image}
                {pin?.postedBy.userName}
                {pin?.tags}
              </Box>
              <Box sx={{display: 'flex'}}>
                <Typography sx={{marginTop: 1}}>
                  {comments?.length + replies?.length} Comments 
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
            </Box> 

            {expandComments &&
              <Box className={classes.openCommentsContainer}>
                <Box className={classes.commentSection}>
                  {comments &&
                    comments.map((comment:IComment, i:number) => (
                      <Comment key={i} pinId={pinId} user={user} comment={comment} commentReplies={replies} />
                    ))
                  }
                </Box>
              </Box>
            }

            <Box className={classes.commentInputContainer}>
              <Divider />
            <Box className={classes.profileImage}>
                <Avatar sx={{marginBottom: 1, marginLeft: 2, marginRight: 2}}>
                  {user.result.userName.charAt(0)}
                </Avatar>
                <Box sx={{marginTop: 1, marginRight: 5}} className={classes.inputBar}>
                  <form onSubmit={handleComment}>
                    <Input
                      className={classes.input}
                      onChange={(e:any) => setText(e.target.value)}
                      placeholder='Add a comment'
                      disableUnderline={true}
                    />
                  </form>
                </Box>
              </Box>
            </Box>

          </Box>
        </Box>
      </Box>      


      <Box sx={{display: 'flex', justifyContent: 'center', width: '100%', paddingTop: 10}}>
        <Typography sx={{fontSize: 22}}>More like this</Typography>
      </Box>

      <Box sx={{width: '100%'}}>
        <Feed />
      </Box>
    </>
  )
}

export default PinDetails