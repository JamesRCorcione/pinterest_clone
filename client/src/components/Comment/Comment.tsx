import { Avatar, Box, Button, Divider, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { grey, blue, red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, createReply, deleteComment, getCommentsByPin, heartCommentPin, unheartCommentPin, updateComment,  } from '../../features/commentsSlice'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendIcon from '@mui/icons-material/Send';

import useStyle from './styles'

import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { Circles } from 'react-loader-spinner';
import PinDetails from '../PinDetails/PinDetails';
import { GetUserById } from '../../features/usersSlice';


interface CommentProps {
  index: any
  user: any, 
  pinId: any, 
  comment: any
  reply: boolean
}


const Comment = ({index, user, pinId, comment, reply}:CommentProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { classes } = useStyle()
  const usersState = useSelector((state: RootState) => state.usersState);
  let { users } = usersState
  let commentsState = useSelector((state: RootState) => state.commentsState);
  let { comments } = commentsState
  const [replying, setReplying] = useState(false)
  const [replies, setReplies] = useState<any>()
  const [text, setText] = useState<any>()
  const [actionBar, setActionBar] = useState(false)
  const [updateHeadComment, setUpdateHeadComment] = useState(false)
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [heartLoading, setHeartLoading] = useState(false)
  const [isLoved, setIsLoved] = useState(false)
  const commenterId = comment.commentingUserId
  const [commenterUserName, setCommenterUserName] = useState('')
  const [commenterUserImage, setCommenterUserImage] = useState('')
  const [loadingComment, setLoadingComment] = useState(false)

  //useEffect(() => {
  //  //const el = document.getElementById(`action-bar-${comment._id}`)
  //  //el.onclick = function () { alert('hi')}
  //}, [actionBar])

  useEffect(() => {
    getCommenterUser()
  }, [comments])

  useEffect(() => {
    if (comment.hearts?.includes(user.result._id)) {
       setIsLoved(true)
    } 
    if (comment.parentId === null) {
      const commentReplies = comments.filter((reply:any) => reply.parentId == comment._id)
      setReplies(commentReplies)
    }  
 }, [comments])


 function reply_click()
 {
     //alert(`action-bar-${comment._id}`)
     console.log(comments.length)
     setActionBar((prev) => !prev)
 }



  const handleCreateComment = async ({e, taggedUser}:any) => {
    setReplying(false)
    e.preventDefault()
    if (pinId) {
      const commenterId = user.result._id
      setLoading(true)
      // tagged needs to reference parentId, normal uses commentId normally
      // dispatches a createReply, because Id needs to be pushed to head comment
      if (taggedUser) {
        await dispatch(createReply({pinId, commentId: comment.parentId, replyId: null, text, commentingUserId: commenterId, taggedUser: commenterId}))     
      } else {
        await dispatch(createReply({pinId, commentId: comment._id, replyId: null, text, commentingUserId: commenterId, taggedUser: commenterId}))
      }
      let removeText = (document.getElementById('commentInput') as HTMLInputElement).value = ''
      setText(removeText)
      setUpdateHeadComment(false)
      await dispatch(getCommentsByPin(pinId))      
      setLoading(false)
    }
  }

  const getCommenterUser = async () => {
    if (users) {
      const commenterUser = await users.find((user:any) => user._id === commenterId)
      setCommenterUserName(commenterUser?.userName)
      setCommenterUserImage(commenterUser?.image)
    }    
  }

  const handleUpdateComment = async (e:any) => {
    setReplying(false)
    //e.preventDefault()
    if (pinId) {
      setActionBar(false)
      setUpdateHeadComment(false)
      setUpdating(true)
      await dispatch(updateComment({pinId, commentId: comment._id, replyId: comment._id, text}))
      await dispatch(getCommentsByPin(pinId))     
      
      setUpdating(false)
    }
  }

  const handleDeleteComment = async (e:any) => {
    //e.preventDefault()
    if (pinId) {
      setUpdating(true)
      await dispatch(deleteComment({pinId, commentId: comment._id, replyId: comment._id}))
      setActionBar(false)
      await dispatch(getCommentsByPin(pinId))
      setUpdating(false)
    }
  }

  const handleHeartPin = async (e:any) => {
    e.preventDefault()
    if (pinId) {      
      setHeartLoading(true)
      await dispatch(heartCommentPin({pinId, commentId: comment._id, userId: user.result._id, replyId: comment._id }))
      setIsLoved(true)
      await dispatch(getCommentsByPin(pinId))
      setHeartLoading(false)
    }
  }

  const handleUnHeartPin = async (e:any) => {
    e.preventDefault()
    if (pinId) {      
      setHeartLoading(true)
      await dispatch(unheartCommentPin({pinId, commentId: comment._id, userId: user.result._id, replyId: comment._id }))
      setIsLoved(false)
      await dispatch(getCommentsByPin(pinId))
      setHeartLoading(false)
    }
  }

  const handleOpenReplying = () => {
    setReplying((reply:any) => !reply)
  }

  const handleOpenActionBar = () => {
    setActionBar(true)
  }

  const getElapsedTime = () => {
    console.log(((new Date().getTime() - new Date(comment.createdAt).getTime()) / 1000) / 60, 'minutes')
  }
  

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

  const handleGoToProfile = () => {
    //window.scrollTo(0, 0)
    //setOpenMobileSearch(false)
    navigate(`/user-profile/${commenterId}`)    
    window.location.reload()
  }

  const renderHeart = () => (
    <Box sx={{marginRight: 1}}>
      {(isLoved && comment.hearts?.length > 0) ?
        <>
        {!heartLoading ?
          <Box sx={{display: 'flex'}}>
            <FavoriteRoundedIcon onClick={(e) => handleUnHeartPin(e)} sx={{cursor: 'pointer', color: 'red', marginRight: 1,marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} />              
            <Typography>{comment.hearts?.length}</Typography>
          </Box>
          :
          <Circles color={red[400]} height={15} width={15} />
          }
        </>
      :
        <>
          {!heartLoading ?
          <Box sx={{display: 'flex'}}>
            <FavoriteBorderRoundedIcon onClick={(e) => handleHeartPin(e)} sx={{cursor: 'pointer', color: 'red', marginRight: 1,marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} />              
            {comment.hearts?.length > 0 &&
              <Typography>{comment.hearts.length}</Typography>
            }
          </Box>
          :
          <Circles color={red[400]} height={15} width={15} />
          }
        </>
      }
    </Box>
  ) 

  const renderComment = ({margin, taggedUser}:any) => (
    <Box sx={{marginLeft: margin}}>
      <Box sx={{display: 'flex'}}>
      <Button 
            onClick={handleGoToProfile}
          >
        {commenterUserImage ?
          <Box sx={{borderRadius: 99, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden'}}>
            <img  
              src={commenterUserImage}
              width={40}
              height={40}
              alt="user-profile"
            />
          </Box>
        :
          <Avatar onClick={() => navigate(`/user-profile/${commenterId}`)} sx={{cursor: 'pointer', marginRight: 1, minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30}}>
            {commenterUserName?.charAt(0)}
          </Avatar>
        }
        </Button>
        <Typography onClick={() => navigate(`/user-profile/${commenterId}`)} sx={{cursor: 'pointer', fontWeight: 'bold', wordBreak: 'break-word', fontSize: 14, marginRight: 1, marginTop: 0.5 }}>{commenterUserName}</Typography>               
      </Box>
      
      {updateHeadComment ?
        /* Head comment reply box */
        <>            
          <form onSubmit={handleUpdateComment}>
              <TextField      
                id={'edit-reply'}
                onChange={(e:any) => setText(e.target.value)}             
                placeholder='Edit Reply'
                defaultValue={comment.text}
                multiline
                rows={comment.text.length/40}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateComment({e})
                  }
                }}
                sx={{ typography: 'subtitle2', width: '75%', marginBottom: 1.5, marginLeft: 5, color: grey[600], "& fieldset": { borderRadius: 3 }}} 
                InputProps={{endAdornment: 
                  <>
                  {(text || comment?.text) &&
                  <Button sx={{position: 'absolute', bottom: 10, right: 3, backgroundColor: red[500], minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30, borderRadius: 99}} onClick={(e) => handleUpdateComment(e)}>                    
                    <SendIcon sx={{color: 'white', paddingLeft: 0.3, paddingTop: 0.2, minHeight: 20, maxHeight: 20, minWidth: 20, maxWidth: 20}} />
                  </Button>
                  }
                  </>
                }}

              >
            </TextField>        
          </form>              
        </>
        :     
        /* Comment text */     
        <>
        {updating ?
          <Box sx={{position: 'relative', height: 60, marginLeft: 15, marginTop: 3}}><Circles color={grey[400]} height={30} width={30} /></Box>
        :
          <Typography sx={{ wordBreak: 'break-word', fontSize: 14, marginTop: 0.5, marginX: 5 }}>
            {comment?.text}
          </Typography>
        }
        </>
      }
      {/* info and menus under the comment */}
      <>
        <Box id='comment-container' sx={{display: 'flex', marginLeft: 4.5, marginBottom: 2}}>
          <Typography sx={{fontSize: 12, marginTop: 0.5, marginRight: 3}}>{y}</Typography>
          <Box sx={{marginRight: 1, size: 'small'}}>
            <Button 
              variant='text'
              disableElevation
              disableRipple
              sx={{marginLeft: 1, minHeight: 0, maxHeight: 0, minWidth: 0, maxWidth: 0}}
              onClick={handleOpenReplying}
            >
              <Typography sx={{fontWeight: 500, textTransform: 'capitalize', color: 'black', fontSize: 12, marginRight: 3.5}}>Reply</Typography>
            </Button>
          </Box>

          {renderHeart()}
          {user?.result?._id === commenterId &&
            <Box sx={{marginRight: 1}}><MoreHorizIcon id={`action-bar-${comment._id}`} onClick={reply_click} sx={{cursor: 'pointer', marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} /></Box>
          }
          {actionBar &&
            <Box sx={{position: 'relative', height: 150}}>
                  <Box sx={{position: 'absolute', borderRadius: 2, backgroundColor: 'white', height: 100, width: 150, top: 30, right: -50, boxShadow:2, zIndex:2}}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                      <Button onClick={() => {
                        setActionBar(false)
                        setUpdateHeadComment((prev) => !prev)}}
                      >
                        Edit
                      </Button>
                      <Button onClick={(e) => handleDeleteComment(e)}>Delete</Button>
                    </Box>
                  </Box>
            </Box>
          }            
        </Box>

          {replying && 
            <form onSubmit={(e) => handleCreateComment({e, taggedUser: taggedUser})}>
                    <TextField      
                      id={'reply'}
                      onChange={(e:any) => setText(e.target.value)}             
                      placeholder='Reply'
                      multiline                  
                      maxRows={10}  
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleCreateComment({e, taggedUser: taggedUser})
                        }
                      }}
                      sx={{ typography: 'subtitle2', width: '75%', marginBottom: 1.5, marginLeft: 5, color: grey[600], "& fieldset": { borderRadius: 3 }}} 
                      InputProps={{endAdornment: 
                        <>
                        {text &&
                          <Button sx={{position: 'relative', bottom: 0, backgroundColor: red[500], minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30, borderRadius: 99}} onClick={(e) => handleCreateComment({e, taggedUser: taggedUser})}>                    
                            <SendIcon sx={{color: 'white', paddingLeft: 0.3, paddingTop: 0.2, minHeight: 20, maxHeight: 20, minWidth: 20, maxWidth: 20}} />
                          </Button>
                          }
                        </>
                      }}
                     >                      
                  </TextField>
            </form>
          }
      </>
         
    </Box>
  )

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


  //Temp time keeping, just an accurate date of posting
  let x = new Date(comment.createdAt).toString().split(' ')
  let c = x.slice(1,4)
  let y = c.join('-')

  //Doesnt allow duplicate rendering of nested comments
  if (comment.parentId && !reply) {
    return null
  }

  return (
    <>
      {/* Head comment rendering and Reply indented rendering */}
      {reply ?       
      /* load over */ 
      <>
        {renderComment({margin: 5, taggedUser: true})}
        {loading && <Box sx={{position: 'relative', height: 60, marginLeft: 15, marginTop: 3}}><Circles color={grey[400]} height={30} width={30} /></Box>}
      </>
      :            
        /* load under */
        <>
        {renderComment({margin: 0, taggedUser: false})}
        {loading && <Box sx={{position: 'relative', height: 60, marginLeft: 15, marginTop: 3}}><Circles color={grey[400]} height={30} width={30} /></Box>}        
        </>
      } 

      {/* Nested replies below */}
      {replies?.length > 0 && (      
        replies.map((reply:any, i:number) => ( 
          <Comment key={i} index={i} user={user} pinId={pinId} comment={reply} reply={true} />
        ))
      )}
    </>
    
  )
}

export default Comment