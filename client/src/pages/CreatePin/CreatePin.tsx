import { Box, Button, Chip, Input, LinearProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { createPin } from '../../features/pinsSlice'
import FileBase from 'react-file-base64'
import { FileUploader } from "react-drag-drop-files"
import { grey, red } from '@mui/material/colors'
import useStyles from './styles'
import { Typography } from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete';

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
    const [loading, setLoading] = useState<boolean>(false)
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

    const handleCreatePin = async (e:React.FormEvent) => {
      e.preventDefault()
      pin.tags = chips
      try{
        setLoading(true)
        await dispatch(createPin(pin)).unwrap()
        setLoading(false)
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
    }


    const handleTitleLimit = (e:any) => {
      if (pin.title.length < 100) {
        setPin({ ...pin, title: e.target.value })
      } 
    }

    const handleTextLimit = (e:any) => {
      if (pin.text.length < 500)
        setPin({ ...pin, text: e.target.value })
    }

    const handleTitleDeletePressAtLimit = (e:any) => {
      console.log(e.target.selectionStart)
      let title_front = pin.title.substring(0, e.target.selectionStart)
      let title_back = pin.title.substring(e.target.selectionStart + 1, pin.title.length)
      setPin({ ...pin, title: title_front + title_back })
    }

    const handleTextDeletePressAtLimit = (e:any) => {
      let text = pin.text.slice(e.target.selectionStart, e.target.selectionStart + 1)
      setPin({ ...pin, text})
    }

    if (loading) return (
      <Box sx={{position: 'absolute', top: 70, width: '100%', color: red[400]}}>
        <LinearProgress color='inherit' />
      </Box>
    )


  return (
    <Box className={classes.background}>
      <Box className={classes.createPinContainer}>
        <Box className={classes.imageSection}>
          {/* Image upload */}
            {!pin?.image ?
              <Box sx={{height: '100%', position: 'relative', top: 0}}>
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
                        height: '30vw',
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
              </Box>
            :        
              <Box>
                <DeleteIcon sx={{cursor: 'pointer', color: red[600]}} onClick={() => setPin({ ...pin, image: '' })} />
                <Box sx={{borderRadius: 9, overflow: 'hidden'}}>
                  <img src={pin?.image} width={'350px'} height={'auto'} border-radius={10}></img>
                </Box>          
              </Box>          
            }
        </Box>

        <Box className={classes.detailSection}>
          {/* Pin Details */}
            <Input
              type="text"
              multiline
              placeholder="Add you title"
              sx={{fontSize: 24, fontWeight: 'bold', paddingTop: 1}}
              value={pin.title}
              onChange={(e) => handleTitleLimit(e)}  
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && pin.title.length === 100) {
                  setPin({ ...pin, title: pin.title.slice(0, -1)})
                } else if (e.key === 'Delete' && pin.title.length === 100) {
                  console.log('delete press')
                  handleTitleDeletePressAtLimit(e)
                }
              }}        
            />

            <Input
              sx={{backgroundColor: 'white', marginTop: 10}}
              type="text"
              placeholder="Enter Pin Text"
              fullWidth
              multiline
              value={pin.text}
              onChange={(e) => handleTextLimit(e)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && pin.text.length === 500) {
                  let text = pin.text.slice(0, -1)
                  setPin({ ...pin, text})
                } else if (e.key === 'Delete' && pin.text.length === 500) {
                  handleTextDeletePressAtLimit(e)                  
                }
              }}
            />

          {/* Tags */}
          <Box>
            <Box>
              <form onSubmit={handleAddTag}>
                <Input                  
                  onChange={(e:any) => setTag(e.target.value)}
                  placeholder='Add some tags!'
                  sx={{marginLeft: 1, marginTop: 10}}
                  />
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{
                    marginLeft: 2,
                    fontFamily: "'Abel', 'sansSerif'",
                  }}
                >
                    Add Tag       
                </Button>              
              </form>              
            </Box>
            <Box sx={{marginTop: 1}}>
              {chips &&
                chips?.map((chip:any, i:number) => (
                  <Chip key={i} label={chip} onDelete={() => handleDeleteTag(chip)} />
                ))
              }
            </Box>
          </Box>

          

          <Input 
            sx={{backgroundColor: 'white', marginTop: 10}}
            name="tags" 
            placeholder="Add destination link" 
            fullWidth 
            value={pin.destination} 
            onChange={(e:any) => setPin({ ...pin, destination: e.target.value })}
          />

          <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{
                margin: "0.9rem 0rem",
                fontFamily: "'Abel', 'sansSerif'",
              }}
              onClick={handleCreatePin}
            >
                Add Post         
          </Button>
        </Box> 
      </Box>    
    </Box>
  )
}

export default CreatePin