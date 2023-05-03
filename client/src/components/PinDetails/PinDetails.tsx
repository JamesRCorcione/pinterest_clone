import Feed from '../Feed/Feed'
import { Box, Button, Typography, Link, TextField, Input, Avatar, LinearProgress } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { deletePin, getPin } from '../../features/pinsSlice'
import { useDispatch, useSelector } from 'react-redux'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UploadIcon from '@mui/icons-material/Upload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';
import { Divider } from '@mui/material';
import { grey, blue, red } from '@mui/material/colors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LinkIcon from '@mui/icons-material/Link';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import FileSaver from 'file-saver'
import Share from '../Share/Share'

import Comment from '../Comment/Comment'
import useStyle from './styles'
import { fetchUser } from '../../utils/fetchUser'
import { createComment, getComments, getCommentsByPin } from '../../features/commentsSlice'
import { Circles } from 'react-loader-spinner'

import { handleDownload, handleDeletePin, removeSavePin, savePin, } from '../../utils/pinUtils'
import { GetUserById, getUsers } from '../../features/usersSlice'
import { getImageDimensions } from '../../utils/getImageHeight'
import Spinner from '../Spinner/Spinner'
import SendIcon from '@mui/icons-material/Send';


const PinDetails = ({pinId, pin, imageDimensions, creatorUserName, creatorUserImage}:any) => {
  let user = fetchUser()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  
  const { classes } = useStyle()
  const commentsState = useSelector((state: RootState) => state.commentsState);
  let { comments } = commentsState  

  const [openPinMenu, setOpenPinMenu] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  const [expandComments, setExpandComments] = useState(false)

  const [loadingComment, setLoadingComment] = useState(false)
  const [text, setText] = useState<any>()
  const [openShare, setOpenShare] = useState<boolean>(false)  
  
  
  let totalSaved = user?.result.saves.filter((save:any) => save?._id === pin?._id)
  let saved = totalSaved?.length > 0 ? true : false

  const handleComment = async (e:any) => {
    //e.preventDefault()
    if (pinId) {
      setLoadingComment(true)
      await dispatch(createComment({ pinId, text, commentingUserId: user.result._id }))
      await dispatch(getCommentsByPin(pinId))     
      let removeText = (document.getElementById('commentInput') as HTMLInputElement).value = ''
      setText(removeText)
      setLoadingComment(false)      
    }
  }

  const handleUpdatePin = (e:any) => {
    if (pinId) {
      setOpenPinMenu(false)
      navigate('/createPin', { state: { pin } })
    }
  }

  const handleExpandComments = () => {
    setExpandComments((expand) => !expand)
  }  

  const handleGoToProfile = () => {
    //window.scrollTo(0, 0)
    //setOpenMobileSearch(false)
    navigate(`/user-profile/${user?.result._id}`)    
    window.location.reload()
  }

  const renderInputBox = () => (
    <>
    {/* Comments are expanded and rendering below*/}
      <Box className={classes.commentInputContainer}>
        <Divider />
          <Box className={classes.profileImage}>
          {user.result.image ?
            <Box onClick={handleGoToProfile} sx={{cursor: 'pointer', borderRadius: 99, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden', marginBottom: 1, marginLeft: 2, marginRight: 2}}>
              <img  
                src={user.result.image}
                width={40}
                height={40}
                alt="user-profile"
              />
            </Box>
          :
            <Avatar sx={{marginBottom: 1, marginLeft: 2, marginRight: 2}}>
              {user?.result.userName.charAt(0)}
            </Avatar>
          }
          <Box sx={{marginTop: 1, marginRight: 5}} className={classes.inputBar}>
            <TextField
              id={'commentInput'}
              className={classes.input}
              onChange={(e:any) => setText(e.target.value)}
              placeholder='Add a comment'
              multiline
              maxRows={10} 
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleComment({e})
                }
              }}
              InputProps={{endAdornment: 
                <>
                {text &&
                <Button sx={{position: 'relative', bottom: 0, backgroundColor: red[500], minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30, borderRadius: 99}} onClick={(e) => handleComment(e)}>
                  <SendIcon sx={{color: 'white', paddingLeft: 0.3, paddingTop: 0.2, minHeight: 20, maxHeight: 20, minWidth: 20, maxWidth: 20}} />
                </Button>
              }
                </>
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  )

  const renderMobileView = () => (
    <>
    <img className={classes.mobileImage} width={'100vw'} height={'auto'} src={pin?.image}></img>
    <Box className={classes.topButtonsMobileContainer}>
        
      <Button className={classes.shareButton} onClick={(e) => handleDownload({e, pin})}>              
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
                savePin({e, user, pin, saved, dispatch})
              }}
              type="button" 
            >
              {savingPost ? 'Saving...' : 'Save'}
            </Button>                  
          )}
       </Box>
    </Box>  
    </>
  )

  console.log('im',imageDimensions)

  return (
    <>  
      <Box className={classes.pinContainer}>
        <Box className={classes.imageContainer} sx={{height: imageDimensions.h}}>
          {/* Mobile view is rendered below */}
          {renderMobileView()}

          {/* Non mobile dynamic view rendering below */}
          <img className={classes.image} width={400} height={'auto'} src={pin?.image}></img>
          <Box className={classes.commentSectionContainer}>   

            {/* Action bar rendered below */}
            <Box className={classes.topButtonsContainer}> 
              <Button className={classes.shareButton} onClick={(e) => handleDownload({e, pin})}>              
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
                    onClick={(e) => removeSavePin({e, user, pin, saved, dispatch})}
                  >
                    Saved
                  </Button>
                ) : (
                  <Button 
                    className={classes.saveButton}
                    variant="contained" 
                    onClick={(e) => {
                      e.stopPropagation()
                      savePin({e, user, pin, saved, dispatch})
                    }}
                    type="button" 
                  >
                    {savingPost ? 'Saving...' : 'Save'}
                  </Button>                  
                )}
              </Box>
            </Box>     

            {/* Pin Details are rending below */}
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
              <Box sx={{display: 'flex', width: 'auto'}}>
              <Button 
                onClick={handleGoToProfile}
              >
              {creatorUserImage ?
                <Box sx={{borderRadius: 99, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden'}}>
                  <img  
                    src={creatorUserImage}
                    width={40}
                    height={40}
                    alt="user-profile"
                  />
                </Box>
              :
                <Avatar sx={{marginBottom: 1, marginLeft: 2, marginRight: 2}}>
                  {user?.result.userName.charAt(0)}
                </Avatar>
              }
              </Button>
                {creatorUserName}
                {pin?.tags}
              </Box>
              <Box sx={{display: 'flex'}}>
                <Typography sx={{marginTop: 1}}>
                  {comments.length} Comments 
                </Typography>
                <Button onClick={handleExpandComments}
                sx={{borderRadius: 99, marginTop: 0.5, marginLeft: 1, minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30}}>
                  {!expandComments ?
                    <KeyboardArrowDownIcon sx={{color: 'black'}} />
                  :
                  <KeyboardArrowRightIcon sx={{color: 'black'}} />
                  }
                </Button>
              </Box>
            </Box> 

            {/* Comments are expanded and rendering below*/}
            {expandComments ?
              <Box className={classes.openCommentsContainer}>
                <Box className={classes.commentSection}>
                  {comments &&
                    comments.map((comment:IComment, i:number) => (
                      <Comment key={i} index={i} pinId={pinId} user={user} comment={comment} reply={false} />
                    ))
                  }
                </Box>
              </Box>
            :
            <Box className={classes.openCommentsContainer}></Box>
            }   
            {/** Input box under here originally */}       
            {renderInputBox()}
          </Box>

        </Box>
      </Box>
    </>

  )
}

export default PinDetails