import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { grey, blue } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import {  deleteReply, getComments, heartReplyPin, unheartReplyPin, updateReply } from '../../../features/commentsSlice'

import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link, useNavigate } from 'react-router-dom';
import Comment from '../Comment';
import { createReply, heartRepliesPin } from '../../../features/repliesSlice';
import { Circles } from 'react-loader-spinner';

interface CommentProps {
  user: any, 
  pinId: any, 
  comment: any
  commentId: any
}

const Reply = ({user, pinId, comment, commentId}:CommentProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [replying, setReplying] = useState(false)
  const [actionBar, setActionBar] = useState(false)
  const [updateComment, setUpdateComment] = useState(false)
  const [text, setText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isLoved, setIsLoved] = useState<boolean>(false)


  useEffect(() => {
     if (comment.hearts?.includes(user.result._id)) {
        setIsLoved(true)
     } 
  }, [])


  const handleReplying = () => {
    setReplying((reply:any) => !reply)
  }
  
  const handleReplySubmit = async (e:any) => {
    e.preventDefault()
    setReplying(false)
    if (pinId) {
      const userCommenting = {
        userId: user.result._id,
        userName: user.result.userName,
        userImage: user.result.image
      }
      setLoading(true)
      await dispatch(createReply({pinId, commentId, replyId: comment._id, text, userCommenting, taggedUser: null }))
      await dispatch(getComments(pinId))
      setLoading(false)
    }
  }

  const handleOpenActionBar = () => {
    setActionBar((prev) => !prev)
  }

  const handleDelete = async (e:any) => {
    e.preventDefault()
    if (pinId) {
      await dispatch(deleteReply({pinId, commentId, replyId: comment._id}))
      setActionBar(false)
      await dispatch(getComments(pinId))
    }
  }

  const handleUpdate = async (e:any) => {
    setReplying(false)
    e.preventDefault()
    if (pinId) {
      await dispatch(updateReply({pinId, commentId, replyId: comment._id, text}))
      setUpdateComment(false)
      setActionBar(false)
      await dispatch(getComments(pinId))
    }
  }

  const handleHeartPin = async (e:any) => {
    e.preventDefault()
    if (pinId) {
      setLoading(true)
      await dispatch(heartReplyPin({pinId, commentId, userId: user.result._id, replyId: comment._id }))
      
      setIsLoved(true)
      await dispatch(getComments(pinId))
      setLoading(false)
    }
  }

  const handleUnHeartPin = async (e:any) => {
    e.preventDefault()
    if (pinId) {      
      setLoading(true)
      await dispatch(unheartReplyPin({pinId, commentId, userId: user.result._id, replyId: comment._id }))
      await dispatch(getComments(pinId))
      setIsLoved(false)            
      setLoading(false)
    }
  }

  if (loading) return  (
    <Box sx={{position: 'relative', height: 60, paddingTop: 3, paddingLeft: 12, marginRight: 7 }}>
      <Circles 
          color={grey[400]}
          height={30}
          width={150}
      />
    </Box>
  )

  //<Link to={`/user-profile/${comment.taggedUser._id}`}>{`@${comment.taggedUser.userName}`}</Link>


  return (
    <>
    
    {updateComment
    ?
    <Box>
      <form onSubmit={handleUpdate}>
          <TextField      
            onChange={(e:any) => setText(e.target.value)}             
            placeholder='Reply'
            rows={2} 
            sx={{ typography: 'subtitle2', width: '75%', marginBottom: 1.5, marginLeft: 5, color: grey[600], "& fieldset": { borderRadius: 3 }}} 
          >
        </TextField>        
      </form>  
      <Button onClick={() => setUpdateComment((prev) => !prev)}>Cancel</Button>
      </Box>
    :
    <>
    <Box sx={{paddingLeft: 7, marginRight: 7}}>
      <Box sx={{display: 'flex'}}>
        <Avatar onClick={() => navigate(`/user-profile/${user.result._id}`)} sx={{cursor: 'pointer', marginRight: 1, minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30}}>{user?.result.userName?.charAt(0)}</Avatar> 
          <Typography onClick={() => navigate(`/user-profile/${comment?.userCommenting?.userId}`)} sx={{cursor: 'pointer', fontWeight: 'bold', wordBreak: 'break-word', fontSize: 14, marginRight: 1, marginTop: 0.5 }}>{comment.userCommenting.userName}</Typography>
      </Box>

      <Box sx={{display: 'flex'}}>
        {(comment.taggedUser)
        ?          
          <Typography sx={{ wordBreak: 'break-word', fontSize: 14, marginTop: 0.5,  marginX: 2 }}>{comment?.text}</Typography>
        :
          <Typography sx={{wordBreak: 'break-word', fontSize: 14, marginTop: 0.5,  marginX: 2}}>{comment.userCommenting.userName} {comment?.text}</Typography>
        }
      </Box>

      <Box sx={{display: 'flex', marginLeft: 4.5, marginBottom: 2}}>
          <Typography sx={{fontSize: 12, marginTop: 0.5, marginRight: 3}}>2mo</Typography>
          <Box sx={{marginRight: 1, size: 'small'}}>
            <Button 
              variant='text'
              disableElevation
              disableRipple
              sx={{marginLeft: 1, minHeight: 0, maxHeight: 0, minWidth: 0, maxWidth: 0}}
              onClick={handleReplying}
            >
              <Typography sx={{fontWeight: 500, textTransform: 'capitalize', color: 'black', fontSize: 12, marginRight: 3.5}}>Reply</Typography>
            </Button>
          </Box>
          <Box sx={{marginRight: 1}}>
          {(isLoved && comment.totalHearts > 0)
            ?
            <Box sx={{display: 'flex'}}>
              <FavoriteRoundedIcon onClick={(e) => handleUnHeartPin(e)} sx={{cursor: 'pointer', color: 'red', marginRight: 1,marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} />              
              <Typography>{comment.totalHearts}</Typography>
            </Box>
            :
            <Box sx={{display: 'flex'}}>
              <FavoriteBorderRoundedIcon onClick={(e) => handleHeartPin(e)} sx={{cursor: 'pointer', color: 'red', marginRight: 1,marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} />              
              {comment.totalHearts > 0 &&
                <Typography>{comment.totalHearts}</Typography>
              }
            </Box>
            }
            </Box>
          <Box sx={{marginRight: 1}}><MoreHorizIcon onClick={handleOpenActionBar} sx={{ cursor: 'pointer', marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} /></Box>
          {actionBar &&
            <Box sx={{position: 'relative', height: 150}}>
              <Box sx={{position: 'absolute', borderRadius: 2, backgroundColor: 'white', height: 100, width: 150, top: 30, right: -50, boxShadow:2, zIndex:2}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  <Button onClick={() => setUpdateComment((prev) => !prev)}>Edit</Button>
                  <Button onClick={(e) => handleDelete(e)}>Delete</Button>
                </Box>
              </Box>
            </Box>
          }

      </Box>
      </Box>
      {replying && 
            <form onSubmit={handleReplySubmit}>
              <TextField
                onChange={(e:any) => setText(e.target.value)}             
                defaultValue={`@${comment.taggedUser?.userName}`}
                rows={2} 
                sx={{ typography: 'subtitle2', width: '75%', marginBottom: 1.5, marginLeft: 5, color: grey[600], "& fieldset": { borderRadius: 3 }}} 
              >
            </TextField>        
          </form>  
      }   
      </>
    }
    </>
  )
}

export default Reply