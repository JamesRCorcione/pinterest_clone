import Feed from '../Feed/Feed'
import { Box, Button, Typography, Link, TextField, Input, Avatar } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { deletePin, getPin } from '../../features/pinsSlice'
import { useDispatch, useSelector } from 'react-redux'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UploadIcon from '@mui/icons-material/Upload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';
import { Divider } from '@mui/material';
import { grey, blue } from '@mui/material/colors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LinkIcon from '@mui/icons-material/Link';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import FileSaver from 'file-saver'
import Share from '../Share/Share'



import Comment from '../Comment/Comment'
import useStyle from './styles'
import { RemoveSavePin, SavePin } from '../../features/usersSlice'
import { fetchUser } from '../../utils/fetchUser'
import { createComment, getComments } from '../../features/commentsSlice'
import { Circles } from 'react-loader-spinner'


const PinDetails = () => {
  let user = fetchUser()
  const dispatch = useDispatch<AppDispatch>()
  const commentsState = useSelector((state: RootState) => state.commentsState);
  let { comments } = commentsState
  const pinsState = useSelector((state: RootState) => state.pinsState);
  let { pins } = pinsState
  const [pin, setPin] = useState<IPin>()
  const navigate = useNavigate()
  const [openPinMenu, setOpenPinMenu] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  const [expandComments, setExpandComments] = useState(true)
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState<string>('')
  const [openShare, setOpenShare] = useState<boolean>(false)
  const { pinId } = useParams()
  const { classes } = useStyle()
  
  let totalSaved = user?.result.saves.filter((save:any) => save?._id === pin?._id)
  let saved = totalSaved?.length > 0 ? true : false

  console.log(saved, user.result.saves)

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
    setLoading(false)
  }

  const savePin = async () => {
    if (!saved && pin) {      
      setSavingPost(true)   
      await dispatch(SavePin({user, pin}))
      .then(() => {
        //window.location.reload();
        setSavingPost(false);
      })      
    }   
  }  

  const removeSavePin = async (e:any) => {   
    user = fetchUser()
    if (saved) {
      setSavingPost(true)
      await dispatch(RemoveSavePin({user, pin}))
      .then(() => {
       //window.location.reload();
        setSavingPost(false);      
      })
      .catch((error:any) => console.log(error))  
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
      e.target.reset()
      setLoading(false)
    }
  }

  const handleDeletePin = async (e:any) => {    
    if (pinId) {
      await dispatch(deletePin({pinId}))
      setOpenPinMenu(false)
      navigate('/')
    }
  }

  const handleExpandComments = () => {
    setExpandComments((expand) => !expand)
  }

  const handleUpdatePin = (e:any) => {
    if (pinId) {
      setOpenPinMenu(false)
      navigate('/createPin', { state: { pin } })
    }
  }



  async function handleDownload() {
    FileSaver.saveAs(pin?.image.toString()!, `${pin?.title.toString()!}.jpg`);
  }

  return (
    <>
      <Box className={classes.pageContainer}>
        <Box className={classes.pinContainer}>

          <Box className={classes.topButtonsMobileContainer}>
              
          <Button className={classes.shareButton} onClick={() => handleDownload()}>              
                <DownloadIcon />              
              </Button>            
              <Button className={classes.downloadButton} onClick={() => setOpenShare((prev) => !prev)}>
                <ShareIcon />
              </Button>    
              {openShare &&
                <Box sx={{position: 'absolute', top: 60, left: 38, zIndex: 2}}>
                  <Share image={pin?.image} />
                </Box>
              }
              {user.result._id === pin?.creatorId &&
              <>
                <Button 
                  className={classes.actionButton}
                  onClick={() => setOpenPinMenu((prev) => !prev)}
                >
                  <MoreHorizIcon />
                </Button>
                {openPinMenu &&                  
                    <Box sx={{position: 'absolute', width: 0}}>
                        <Box sx={{position: 'relative', display: 'flex', flexDirection: 'column', borderRadius: 2, left: 130, top: 60, height: 80, width: 150, backgroundColor: 'white', boxShadow: 2, zIndex: 200}}>
                          <Button onClick={(e) => handleUpdatePin(pinId)}>Edit</Button>
                          <Button onClick={(e) => handleDeletePin(pinId)}>Delete</Button>
                    </Box>
                  </Box>
                }
                
              </>
              }

              <Box className={classes.saveButtonContainer}>
                {saved ? (
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
              <Button className={classes.shareButton} onClick={() => handleDownload()}>              
                <DownloadIcon />              
              </Button>            
              <Button className={classes.downloadButton} onClick={() => setOpenShare((prev) => !prev)}>
                <ShareIcon />
              </Button>    
              {openShare &&
                <Box sx={{position: 'absolute', top: 60, left: 38, zIndex: 2}}>
                  <Share image={pin?.image} />
                </Box>
              }
              {user.result._id === pin?.creatorId &&
              <>
                <Button 
                  className={classes.actionButton}
                  onClick={() => setOpenPinMenu((prev) => !prev)}
                >
                  <MoreHorizIcon />
                </Button>
                {openPinMenu &&                  
                    <Box sx={{position: 'absolute', width: 0}}>
                        <Box sx={{position: 'relative', display: 'flex', flexDirection: 'column', borderRadius: 2, left: 130, top: 60, height: 80, width: 150, backgroundColor: 'white', boxShadow: 2, zIndex: 200}}>
                          <Button onClick={(e) => handleUpdatePin(pinId)}>Edit</Button>
                          <Button onClick={(e) => handleDeletePin(pinId)}>Delete</Button>
                    </Box>
                  </Box>
                }
                
              </>
              }
              <Box className={classes.saveButtonContainer}>
                {saved ? (
                  <Button 
                    className={classes.savedButton}
                    variant="contained" 
                    onClick={removeSavePin}
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
            </Box> 

            {expandComments ?
              <Box className={classes.openCommentsContainer}>
                <Box className={classes.commentSection}>
                  {comments &&
                    comments.map((comment:IComment, i:number) => (
                      <Comment key={i} pinId={pinId} user={user} comment={comment} reply={false} />
                    ))
                  }
                </Box>
              </Box>
              :
              <>
              {/* Not a fan of this solution, but it works fine */}
              <Box sx={{height: 100}}></Box>
              </>
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
        <Feed pins={pins} />
      </Box>
    </>
  )
}

export default PinDetails