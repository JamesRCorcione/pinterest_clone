import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { uuid } from 'uuidv4'
import Spinner from '../../components/Spinner/Spinner'

import { createPin } from '../../features/pinsSlice'
import { SetMealOutlined } from '@mui/icons-material'
import FileBase from 'react-file-base64'


interface CreatePinProps {
    user: IUser    
}


const CreatePin = ({user}:CreatePinProps) => {
    const [pin, setPin] = useState({ title: '', text: '', creatorId: user?._id, postedBy: {userId: user?._id, userName: user?.userName, image: null}, image: '', destination: '' })
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const handlePinSave = (e:React.FormEvent) => {
      e.preventDefault()

      
      dispatch(createPin(pin))
      setPin({ title: '', text: '', creatorId: user?._id, postedBy: {userId: '', userName: '', image: null}, image: '', destination: '' })
      navigate('/')
    }


    const categories = [
      {
        name: 'nature',
        image: 'https://res.cloudinary.com/dspevi97j/image/upload/v1679943182/b9ubgbulndo4txnvd9cu.jpg',
      },
      {
        name: 'space',
        image: 'https://res.cloudinary.com/dspevi97j/image/upload/v1679952013/mp1x32v4zpv15hyqovgq.jpg',
      },
    ]


  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <form onSubmit={handlePinSave}>
        <br />
        <br />
        <input
          type="text"
          placeholder="Enter a Title"
          value={pin.title}
          onChange={(e) => setPin({ ...pin, title: e.target.value })}
        />
        <br />
        <br />
        <TextField
          sx={{backgroundColor: 'white'}}
          type="text"
          placeholder="Enter Post Text"
          fullWidth
          multiline
          rows={5}
          value={pin.text}
          onChange={(e) => setPin({ ...pin, text: e.target.value })}
        />
        <br />
        <br />
        <TextField 
          sx={{backgroundColor: 'white'}}
          name="tags" 
          variant="outlined" 
          label="Tags (coma separated)" 
          fullWidth 
          value={pin.destination} 
          onChange={(e:any) => setPin({ ...pin, destination: e.target.value })}
         />        
        <div><FileBase type="file" multiple={false} onDone={({ base64 }:any) => setPin({ ...pin, image: base64 })} /></div>
    
        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{
            margin: "0.9rem 0rem",
            fontFamily: "'Abel', 'sansSerif'",
          }}
        >
            Add Post         
        </Button>
      </form>  
    </Box>
  )
}

export default CreatePin