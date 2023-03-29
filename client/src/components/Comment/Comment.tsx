import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { grey, blue } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { createReply, getComments } from '../../features/commentsSlice'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Reply from './Reply/Reply';


interface CommentProps {
  user: any, 
  pinId: any, 
  comment: IComment
}

function generateReplies({user, pinId, comment}:CommentProps) {
  console.log('replies',comment)
  return (
    comment?.replies.map((reply) => (
      <Reply user={user} pinId={pinId} comment={reply} />
    ))
  )
}




const Comment = ({user, pinId, comment}:CommentProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [replying, setReplying] = useState(false)
  const [text, setText] = useState<any>()

  const handleReplying = () => {
    setReplying((reply:any) => !reply)
  }
  
  const handleReplySubmit = async (e:any) => {
    e.preventDefault()
    if (pinId) {
      await dispatch(createReply({pinId, commentId: comment._id, text, userName: user.userName, userImage: user.userImage}))
    }
  }

  if (comment.parentId) {
    return null
  } 

  return (
    <>
      <Box sx={{display: 'flex'}}>
        <Avatar sx={{marginRight: 1, minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30}}>J</Avatar>
        <Typography sx={{fontWeight: 'bold', wordBreak: 'break-word', fontSize: 14, marginRight: 1, marginTop: 0.5 }}>Anon</Typography>
        <Typography sx={{ wordBreak: 'break-word', fontSize: 14, marginTop: 0.5 }}>{comment?.text}</Typography>
        
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
          <Box sx={{marginRight: 1}}><FavoriteBorderRoundedIcon sx={{color: 'red', marginRight: 1,marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} /></Box>
          <Box sx={{marginRight: 1}}><MoreHorizIcon sx={{marginTop: 0.75, minHeight: 15, maxHeight: 15, minWidth: 15, maxWidth: 15}} /></Box>
          
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
      
      {comment?.replies?.length > 0 &&
        generateReplies({user, pinId, comment})
      }
    </>
  )
}

export default Comment


