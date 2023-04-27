import { Box, Button, Chip, Input, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { createPin } from '../../features/pinsSlice'
import FileBase from 'react-file-base64'
import { FileUploader } from "react-drag-drop-files"
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
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [pin, setPin] = useState({ title: '', text: '', tags: tags, creatorId: user?.result._id, totalComments: 0, image: '', destination: '' })    
    const [chips, setChips] = useState<string[]>([])
    const navigate = useNavigate()
    const { state } = useLocation()  
    const { classes } = useStyles()
    const dispatch = useDispatch<AppDispatch>()   
    
    useEffect(() => {
      if (state) {
        setPin({title: state.pin.title, text: state.pin.text, tags: state.pin.tags, creatorId: user?.result._id, totalComments: state.pin.totalComments, image: state.pin.image, destination: state.pin.destination })    
        //setPin({title: state.pin.title, text: state.pin.text, tags: state.pin.tags, creatorId: user?.result._id, totalComments: state.pin.totalComments, postedBy: state.pin.postedBy, image: state.pin.image, destination: state.pin.destination })    
        setChips(state.pin.tags)
      }
    }, [state])

    const handlePinSave = async (e:React.FormEvent) => {
      e.preventDefault()
      pin.tags = chips
      try{
        await dispatch(createPin(pin)).unwrap()
        setPin({ title: '', text: '', tags: [], creatorId: user?.result._id, totalComments: 0, image: '', destination: '' })
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

    }

    const handlePhotoUpload = async (e:any) => {
      let file = e.target.files[0]
      let reader = new FileReader()

      if (file) {
        reader.readAsDataURL(file)
        reader.onload = function(){
          let fileInfo = {
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000) + ' kB',
            base64: reader.result,
            file: file,
          }

          if (fileInfo.base64)
            setPin({ ...pin, image: fileInfo.base64.toString() })
          return fileInfo
        }
      }
    }

    const handleDrag = (e:any) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    }

    const handleDrop = function(e:any) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        // at least one file has been dropped so do something
        // handleFiles(e.dataTransfer.files);
        let file = e.dataTransfer.files[0]
        let reader = new FileReader()
        
        if (file) {
          reader.readAsDataURL(file)
          reader.onload = function(){
            let fileInfo = {
              name: file.name,
              type: file.type,
              size: Math.round(file.size / 1000) + ' kB',
              base64: reader.result,
              file: file,
            }
  
            if (fileInfo.base64)
              setPin({ ...pin, image: fileInfo.base64.toString() })
            return fileInfo
          }
        }

      
      }
    };

  return (
    <Box className={classes.background}>
      <Box className={classes.createPinContainer}>

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

        <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <label title='Photo Upload'>
              <Box 
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag} 
                  onDragOver={handleDrag} 
                  onDrop={handleDrop}
                  draggable
                  sx={{display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '20vw',
                    padding: 5,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: 'green',
                    borderRadius: 5,
                    color: 'green',
                  }}>
                    Drag and Drop to Upload Photo
                <Input 
                  type="file"  
                  disableUnderline
                  sx={{display: 'none'}}
                  onChange={(e) => handlePhotoUpload(e)}
                />
              </Box>            
            </label>
            { dragActive && 
            
              <Box 
                id="drag-file-element" 
                onDragEnter={handleDrag}
                onDragLeave={handleDrag} 
                onDragOver={handleDrag} 
                onDrop={handleDrop}>
              </Box> 
            }
        </form>
        
          {pin?.image &&
          <Box sx={{position: 'absolute', top: 100, right: 180}}>
            <img src={pin?.image} width={'350px'} border-radius={10}></img>
          </Box>
          }

        <Box>
        <form onSubmit={handleAddTag}>
          <Input                  
            onChange={(e:any) => setTag(e.target.value)}
            placeholder='Add some tags!'
            disableUnderline={true}
            sx={{border: 1, marginLeft: 1}}
            />
          <Button
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
          
        </form>
          
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