import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { uuid } from 'uuidv4'
import Spinner from '../../components/Spinner/Spinner'

import { createPin } from '../../features/pinsSlice'
import FileBase from 'react-file-base64'
import { grey } from '@mui/material/colors'


interface CreatePinProps {
    user: IUser    
}


const CreatePin = ({user}:CreatePinProps) => {
    const [pin, setPin] = useState({ title: '', text: '', category: '', creatorId: user?._id, postedBy: {userId: user?._id, userName: user?.userName, image: null}, image: '', destination: '' })
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const handlePinSave = (e:React.FormEvent) => {
      e.preventDefault()

      
      dispatch(createPin(pin))
      setPin({ title: '', text: '', category: '', creatorId: user?._id, postedBy: {userId: '', userName: '', image: null}, image: '', destination: '' })
      navigate('/')
    }

    //Starting Categories
    const categories = [
      {
        name: 'Home Decor',
      },
      {
        name: 'DIY and Crafts',
      },
      {
        name: 'Food and Drink',
      },
      {
        name: 'Women\’s Fashion',
      },
      {
        name: 'Health and Wellness',
      },
      {
        name: 'Sports',
      },
      {
        name: 'Travel',
      },
      {
        name: 'Cars',
      },
      {
        name: 'Gardening',
      },
      {
        name: 'Weddings',
      },
    ]


  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', height: '94vh', backgroundColor: grey[300]}}>
    <Box sx={{ marginTop: 5, marginBottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, height: 650, width: 800, backgroundColor: 'white'}}>
      <form onSubmit={handlePinSave}>
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
          placeholder="Enter Pin Text"
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
          label="External Website Link" 
          fullWidth 
          value={pin.destination} 
          onChange={(e:any) => setPin({ ...pin, destination: e.target.value })}
         />     

        <div className="flex flex-col">
          <div>
            <p className="mb-2 font-semibold text-lg sm:text-xl">Choose Pin Category</p>
            <select
              onChange={(e) => setPin({ ...pin, category: e.target.value })}
              className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="other" className="bg-white">Select Category</option>
                {categories.map((category, i) => (
                  <option key={i} className="text-base border-0 outline-none capitalize bg-white text-black" value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
          </div>
        </div>

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
    </Box>
  )
}

export default CreatePin