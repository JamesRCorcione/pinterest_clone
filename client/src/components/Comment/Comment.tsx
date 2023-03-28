import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { grey, blue } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { createReply } from '../../features/commentsSlice'
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

  console.log(comment?.replies?.length)

  return (
    <>
      <Box sx={{display: 'flex'}}>
        <Avatar sx={{marginRight: 1, minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30}}>J</Avatar>
        <Typography sx={{ wordBreak: 'break-word', fontSize: 14, marginRight: 8 }}>{comment?.text}</Typography>
        
      </Box>
      <Box sx={{display: 'flex', marginLeft: 4.5, marginBottom: 2}}>
          <Typography sx={{fontSize: 12, marginRight: 1}}>2mo</Typography>
          <Box sx={{marginRight: 1, size: 'small'}}>
            <Button
              onClick={handleReplying}
            >
              Reply
            </Button>
          </Box>
          <Box sx={{marginRight: 1}}>Heart</Box>
          <Box sx={{marginRight: 1}}>...</Box>
          
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


