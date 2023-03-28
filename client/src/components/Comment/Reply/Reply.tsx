import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { grey, blue } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { createReply } from '../../../features/commentsSlice'


interface CommentProps {
  user: any, 
  pinId: any, 
  comment: IComment
}



const Reply = ({user, pinId, comment}:CommentProps) => {
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

  console.log(comment)

  return (
    <>
      <Box sx={{display: 'flex', paddingLeft: 7}}>
        <Avatar sx={{marginRight: 1, minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30}}>J</Avatar>
        <Typography sx={{ wordBreak: 'break-word', fontSize: 14, marginRight: 8 }}>{comment?.text}</Typography>
        
      </Box>
      <Box sx={{display: 'flex', marginLeft: 6.5, marginBottom: 2}}>
          <Typography sx={{fontSize: 12, marginRight: 1}}>2mo</Typography>
          <Box sx={{marginRight: 1, size: 'small'}}>
            <Button
              onClick={handleReplying}
            >
              Reply
            </Button>
          </Box>
          <Box sx={{marginRight: 1, paddingLeft: 1.5}}>Heart</Box>
          <Box sx={{marginRight: 1, paddingLeft: 1.5}}>...</Box>
          
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


