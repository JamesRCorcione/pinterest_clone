import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { grey, blue } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import {  getComments, heartCommentPin } from '../../../features/commentsSlice'

import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';
import Comment from '../Comment';
import { createReply, heartRepliesPin } from '../../../features/repliesSlice';

interface CommentProps {
  user: any, 
  pinId: any, 
  comment: IComment
  commentId: any
}

const Reply = ({user, pinId, comment, commentId}:CommentProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [replying, setReplying] = useState(false)
  const [text, setText] = useState<any>()

  const handleReplying = () => {
    setReplying((reply:any) => !reply)
  }
  
  const handleReplySubmit = (e:any) => {
    e.preventDefault()
    if (pinId) {
      const userCommenting = {
        userId: user._id,
        userName: user.userName,
        userImage: user.image
      }
      
      dispatch(createReply({pinId, commentId, replyId: comment._id, text, userCommenting, taggedUser: null }))
    }
  }

  const handleHeartPin = (e:any) => {
    e.preventDefault()
    if (pinId) {
      dispatch(heartCommentPin({pinId, commentId, userId: comment.userCommenting?.userId, replyId: comment._id }))
    }
  }

  console.log(comment, comment.hearts)
  
  return (
    <>
    <Box sx={{paddingLeft: 7, marginRight: 7}}>
      <Box sx={{display: 'flex'}}>
        <Avatar onClick={() => navigate(`/user-profile/${user._id}`)} sx={{cursor: 'pointer', marginRight: 1, minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30}}>{user.userName.charAt(0)}</Avatar> 
        {(comment.taggedUser)
        ?
          <Typography sx={{wordBreak: 'break-word'}}>{comment._id} {comment.userCommenting?.userName} @{comment.taggedUser} {comment?.text}</Typography>
        :
          <Typography sx={{wordBreak: 'break-word'}}>{comment._id} {comment.userCommenting?.userName} {comment?.text}</Typography>
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
            {(comment.hearts?.length > 0 )
            ?
            <Box sx={{display: 'flex'}}>
              <FavoriteRoundedIcon sx={{color: 'red', marginRight: 1,marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} />              
              <Typography>{comment.hearts.length}</Typography>
            </Box>
            :
            <FavoriteBorderRoundedIcon onClick={(e) => handleHeartPin(e)} sx={{cursor: 'pointer', color: 'red', marginRight: 1,marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} />              
            }
            </Box>
          <Box sx={{marginRight: 1}}><MoreHorizIcon sx={{marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} /></Box>
          
      </Box>
      </Box>
      {replying && 
            <form onSubmit={handleReplySubmit}>
              <TextField      
                onChange={(e:any) => setText(e.target.value)}             
                placeholder='Reply'
                rows={2} 
                sx={{ typography: 'subtitle2', width: '75%', marginBottom: 1.5, marginLeft: 5, color: grey[600], "& fieldset": { borderRadius: 3 }}} 
              >
            </TextField>        
          </form>  
      }   
    </>
  )
}

export default Reply