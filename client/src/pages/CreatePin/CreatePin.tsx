import { Box, Button, Chip, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { uuid } from 'uuidv4'
import Spinner from '../../components/Spinner/Spinner'

import { createPin } from '../../features/pinsSlice'
import FileBase from 'react-file-base64'
import { grey } from '@mui/material/colors'
import TopNavbar from '../../components/TopNavbar/TopNavbar'


interface CreatePinProps {
    user: {
      result: IUser    
    }
}


const CreatePin = ({user}:CreatePinProps) => {
    const temp : string[] = []
    const [pin, setPin] = useState({ title: '', text: '', tags: temp, creatorId: user?.result._id, postedBy: {userId: user?.result._id, userName: user?.result.userName, image: null}, image: '', destination: '' })
    const [tag, setTag] = useState<string>('')
    const [chips, setChips] = useState<string[]>([])
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()    

    const handlePinSave = async (e:React.FormEvent) => {
      e.preventDefault()
      pin.tags = chips
      await dispatch(createPin(pin))
      setPin({ title: '', text: '', tags: [], creatorId: user?.result._id, postedBy: {userId: '', userName: '', image: null}, image: '', destination: '' })
      navigate('/')
    }

    const setTags = async () => {
      
    }

    const handleDeleteTag = (chipDelete:string) => {
      const updatedChips = chips.filter((chip) => chip !== chipDelete)
      setChips(updatedChips)
    } 
    

    const handlePin = () => {
      setChips([...chips, tag])     
    }

  return (
    <>
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
      
      <Box>
        <TextField 
            sx={{backgroundColor: 'white'}}
            name="tags" 
            variant="outlined" 
            label="Add A New Tag" 
            fullWidth 
            value={tag} 
            onChange={(e:any) => setTag(e.target.value)}
          />  
        <Button
            onClick={handlePin}
            type="submit"
            variant="contained"
            size="small"
            sx={{
              marginLeft: 10,
              fontFamily: "'Abel', 'sansSerif'",
            }}
          >
              Add Tag       
          </Button>
        </Box>
        {chips &&
          chips?.map((chip:any, i:number) => (
            <Chip key={i} label={chip} onDelete={() => handleDeleteTag(chip)} />
          ))
        }
        
    </Box>
    
    </Box>
    <TopNavbar />
    </>
  )
}

export default CreatePin