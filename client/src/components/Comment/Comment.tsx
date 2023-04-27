import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { grey, blue } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { createReply, deleteComment, getComments, heartCommentPin, unheartCommentPin, updateComment,  } from '../../features/commentsSlice'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { Circles } from 'react-loader-spinner';
import PinDetails from '../PinDetails/PinDetails';
import { GetUserById } from '../../features/usersSlice';


interface CommentProps {
  user: any, 
  pinId: any, 
  comment: any
  reply: boolean
}


const Comment = ({user, pinId, comment, reply}:CommentProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const commentsState = useSelector((state: RootState) => state.commentsState);
  let { comments } = commentsState
  const [replying, setReplying] = useState(false)
  const [replies, setReplies] = useState<any>()
  const [text, setText] = useState<any>()
  const [actionBar, setActionBar] = useState(false)
  const [updateHeadComment, setUpdateHeadComment] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isLoved, setIsLoved] = useState(false)
  const commenterId = comment.commentingUserId
  const [commenterUserName, setCommenterUserName] = useState('')
  const [commenterUserImage, setCommenterUserImage] = useState('')

  useEffect(() => {
    getCommenterUser()
  }, [])

  useEffect(() => {
    if (comment.hearts?.includes(user.result._id)) {
       setIsLoved(true)
    } 
    if (comment.parentId === null) {
      const commentReplies = comments.filter((reply:any) => reply.parentId == comment._id)
      setReplies(commentReplies)
    }  
 }, [comments])


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
      setUpdateHeadComment(false)
      await dispatch(getComments(pinId))      
      setLoading(false)
    }
  }

  const getCommenterUser = async () => {
  let data = await dispatch(GetUserById(commenterId))
    setCommenterUserName(data.payload.userName)
    setCommenterUserImage(data.payload.image)
  }

  const handleUpdateComment = async (e:any) => {
    setReplying(false)
    e.preventDefault()
    if (pinId) {
      setLoading(true)
      await dispatch(updateComment({pinId, commentId: comment._id, replyId: comment._id, text}))
      await dispatch(getComments(pinId))
      setUpdateHeadComment(false)
      setActionBar(false)
      setLoading(false)
    }
  }

  const handleDeleteComment = async (e:any) => {
    //e.preventDefault()
    if (pinId) {
      await dispatch(deleteComment({pinId, commentId: comment._id, replyId: comment._id}))
      setActionBar(false)
      await dispatch(getComments(pinId))
    }
  }

  const handleHeartPin = async (e:any) => {
    e.preventDefault()
    if (pinId) {      
      //setLoading(true)
      await dispatch(heartCommentPin({pinId, commentId: comment._id, userId: user.result._id, replyId: comment._id }))
      setIsLoved(true)
      await dispatch(getComments(pinId))
      //setLoading(false)
    }
  }

  const handleUnHeartPin = async (e:any) => {
    e.preventDefault()
    if (pinId) {      
      //setLoading(true)
      await dispatch(unheartCommentPin({pinId, commentId: comment._id, userId: user.result._id, replyId: comment._id }))
      setIsLoved(false)
      await dispatch(getComments(pinId))
      //setLoading(false)
    }
  }

  const handleOpenReplying = () => {
    setReplying((reply:any) => !reply)
  }

  const handleOpenActionBar = () => {
    setActionBar((prev) => !prev)
  }

  const getElapsedTime = () => {
    console.log(((new Date().getTime() - new Date(comment.createdAt).getTime()) / 1000) / 60, 'minutes')
  }

  const renderReply = () => (
    <Box sx={{marginLeft: 5}}>
      <Box sx={{display: 'flex'}}>
        <Avatar onClick={() => navigate(`/user-profile/${commenterId}`)} sx={{cursor: 'pointer', marginRight: 1, minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30}}>{commenterUserName?.charAt(0)}</Avatar>
        <Typography onClick={() => navigate(`/user-profile/${commenterId}`)} sx={{cursor: 'pointer', fontWeight: 'bold', wordBreak: 'break-word', fontSize: 14, marginRight: 1, marginTop: 0.5 }}> {commenterUserName}</Typography>               
      </Box>
      <Box><Typography sx={{ wordBreak: 'break-word', fontSize: 14, marginTop: 0.5, marginX: 5 }}>{comment?.text}</Typography></Box>
      <Box sx={{display: 'flex', marginLeft: 4.5, marginBottom: 2}}>
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
          <Box sx={{marginRight: 1}}>
            {(isLoved && comment.hearts?.length > 0)
            ?
            <Box sx={{display: 'flex'}}>
              <FavoriteRoundedIcon onClick={(e) => handleUnHeartPin(e)} sx={{cursor: 'pointer', color: 'red', marginRight: 1,marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} />              
              <Typography>{comment.hearts?.length}</Typography>
            </Box>
            :
            <Box sx={{display: 'flex'}}>
              <FavoriteBorderRoundedIcon onClick={(e) => handleHeartPin(e)} sx={{cursor: 'pointer', color: 'red', marginRight: 1,marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} />              
              {comment.hearts?.length > 0 &&
                <Typography>{comment.hearts.length}</Typography>
              }
            </Box>
            }
            </Box>
            {user?.result?._id === commenterId &&
              <Box sx={{marginRight: 1}}><MoreHorizIcon onClick={handleOpenActionBar} sx={{cursor: 'pointer', marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} /></Box>
            }
          {actionBar &&
            <Box sx={{position: 'relative', height: 150}}>
              <Box sx={{position: 'absolute', borderRadius: 2, backgroundColor: 'white', height: 100, width: 150, top: 30, right: -50, boxShadow:2, zIndex:2}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  <Button onClick={() => setUpdateHeadComment((prev) => !prev)}>Edit</Button>
                  <Button onClick={(e) => handleDeleteComment(pinId)}>Delete</Button>
                </Box>
              </Box>
            </Box>
          }
      </Box>
        {replying && 
              <form onSubmit={(e) => handleCreateComment({e, taggedUser: true})}>
                <TextField      
                  onChange={(e:any) => setText(e.target.value)}             
                  placeholder='Reply'
                  defaultValue={`@${commenterUserName} `}
                  multiline
                  maxRows={10} 
                  sx={{ typography: 'subtitle2', width: '75%', marginBottom: 1.5, marginLeft: 5, color: grey[600], "& fieldset": { borderRadius: 3 }}} 
                >
              </TextField>        
            </form>  
        }      
    </Box>
  )

  const renderHeadComment = () => (
    <Box sx={{marginLeft: 0}}>
      <Box sx={{display: 'flex'}}>
        <Avatar onClick={() => navigate(`/user-profile/${commenterId}`)} sx={{cursor: 'pointer', marginRight: 1, minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30}}>{commenterUserName?.charAt(0)}</Avatar>
        <Typography onClick={() => navigate(`/user-profile/${commenterId}`)} sx={{cursor: 'pointer', fontWeight: 'bold', wordBreak: 'break-word', fontSize: 14, marginRight: 1, marginTop: 0.5 }}>{commenterUserName}</Typography>               
      </Box>
      <Box><Typography sx={{ wordBreak: 'break-word', fontSize: 14, marginTop: 0.5, marginX: 5 }}>{comment?.text}</Typography></Box>
      <Box sx={{display: 'flex', marginLeft: 4.5, marginBottom: 2}}>
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
          <Box sx={{marginRight: 1}}>
            {(isLoved && comment.hearts?.length > 0)
            ?
            <Box sx={{display: 'flex'}}>
              <FavoriteRoundedIcon onClick={(e) => handleUnHeartPin(e)} sx={{cursor: 'pointer', color: 'red', marginRight: 1,marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} />              
              <Typography>{comment.hearts?.length}</Typography>
            </Box>
            :
            <Box sx={{display: 'flex'}}>
              <FavoriteBorderRoundedIcon onClick={(e) => handleHeartPin(e)} sx={{cursor: 'pointer', color: 'red', marginRight: 1,marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} />              
              {comment.hearts?.length > 0 &&
                <Typography>{comment.hearts.length}</Typography>
              }
            </Box>
            }
            </Box>
            {user?.result?._id === commenterId &&
              <Box sx={{marginRight: 1}}><MoreHorizIcon onClick={handleOpenActionBar} sx={{cursor: 'pointer', marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} /></Box>
            }
          {actionBar &&
            <Box sx={{position: 'relative', height: 150}}>
              <Box sx={{position: 'absolute', borderRadius: 2, backgroundColor: 'white', height: 100, width: 150, top: 30, right: -50, boxShadow:2, zIndex:2}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  <Button onClick={() => setUpdateHeadComment((prev) => !prev)}>Edit</Button>
                  <Button onClick={(e) => handleDeleteComment(e)}>Delete</Button>
                </Box>
              </Box>
            </Box>
          }
        
      </Box>
        {replying && 
              <form onSubmit={(e) => handleCreateComment({e, taggedUser: false})}>
                <TextField      
                  onChange={(e:any) => setText(e.target.value)}             
                  placeholder='Reply'
                  multiline
                  maxRows={10}  
                  sx={{ typography: 'subtitle2', width: '75%', marginBottom: 1.5, marginLeft: 5, color: grey[600], "& fieldset": { borderRadius: 3 }}} 
                >
              </TextField>        
            </form>  
        }      
    </Box>
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
      {!loading ?
        <>
          {updateHeadComment
          ?
            /* Head comment reply box */
            <>            
              <form onSubmit={handleUpdateComment}>
                  <TextField      
                    onChange={(e:any) => setText(e.target.value)}             
                    placeholder='Reply'
                    defaultValue={comment.text}
                    multiline
                    maxRows={10} 
                    sx={{ typography: 'subtitle2', width: '75%', marginBottom: 1.5, marginLeft: 5, color: grey[600], "& fieldset": { borderRadius: 3 }}} 
                  >
                </TextField>        
              </form>              
              <Button onClick={() => setUpdateHeadComment((prev) => !prev)}>Cancel</Button>
            </>
          :
            /* Head comment rendering and Reply indented rendering */
            <>            
              {reply ?        
                renderReply()
              :            
                renderHeadComment()            
              }
            </>            
          }
        </>
      :
        /* Loading annimation below */
        <Box sx={{position: 'relative', height: 60, paddingTop: 3, paddingLeft: 12, marginRight: 7 }}>
          <Circles 
              color={grey[400]}
              height={30}
              width={150}
          />
        </Box>    
      }

      {/* Nested replies below */}
      {replies?.length > 0 && (      
        replies.map((reply:any, i:number) => ( 
          <Comment key={i} user={user} pinId={pinId} comment={reply} reply={true} />
        ))
      )}
    </>
  )
}

export default Comment