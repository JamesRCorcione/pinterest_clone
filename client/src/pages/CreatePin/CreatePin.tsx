import { Box, Button, Chip, Input, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { createPin } from '../../features/pinsSlice'
import FileBase from 'react-file-base64'
import { grey } from '@mui/material/colors'
import useStyles from './styles'

interface CreatePinProps {
    user: {
      result: IUser    
    }
}

const CreatePin = ({user}:CreatePinProps) => {
  const [tag, setTag] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])
    const [pin, setPin] = useState({ title: '', text: '', tags: tags, creatorId: user?.result._id, totalComments: 0, postedBy: {userId: user?.result._id,  userName: user?.result.userName, image: null}, image: '', destination: '' })    
    const [chips, setChips] = useState<string[]>([])
    const navigate = useNavigate()
    const { state } = useLocation()  
    const { classes } = useStyles()
    const dispatch = useDispatch<AppDispatch>()   
    
    useEffect(() => {
      if (state) {
        console.log(state.pin)
        setPin({title: state.pin.title, text: state.pin.text, tags: state.pin.tags, creatorId: user?.result._id, totalComments: state.pin.totalComments, postedBy: state.pin.postedBy, image: state.pin.image, destination: state.pin.destination })    
        setChips(state.pin.tags)
      }
    }, [state])

    const handlePinSave = async (e:React.FormEvent) => {
      e.preventDefault()
      pin.tags = chips
      try{
        await dispatch(createPin(pin)).unwrap()
        setPin({ title: '', text: '', tags: [], creatorId: user?.result._id, totalComments: 0, postedBy: {userId: '', userName: '', image: null}, image: '', destination: '' })
        navigate('/')
      } catch (error:any) {
        alert(error.message)
      }
    }



    const handleDeleteTag = (chipDelete:string) => {
      const updatedChips = chips.filter((chip) => chip !== chipDelete)
      setChips(updatedChips)
    }     

    const handleAddTag = (e:any) => {
      e.preventDefault()
      if (!chips.includes(tag) && tag !== '') {
        setChips([...chips, tag])
       
      } else {
        alert('Please Enter a New Tag!')
      }
      e.target.reset()
      console.log(e.target)
    }

  return (
    <Box className={classes.background}>
      <Box className={classes.createPinContainer} >
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
          <form onSubmit={(e) => handleAddTag(e)} >
            <Input 
              sx={{backgroundColor: 'white'}}
              name="tags" 
              fullWidth 
              value={tag} 
              onChange={(e:any) => setTag(e.target.value)}
            />  
          </form>
          <Button
              onClick={handleAddTag}
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
  )
}

export default CreatePin