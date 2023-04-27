import { Box, Button, Input, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UpdateUser } from '../../features/usersSlice';

const EditProfile = ({profileUser}:any) => {
  const [user, setUser] = useState<any>({userName: profileUser.result.userName, image: profileUser.result.image, password: profileUser.result.password})
  const [dragActive, setDragActive] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>()   
  const navigate = useNavigate()


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
          setUser({ ...user, image: fileInfo.base64.toString() })
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
            setUser({ ...user, image: fileInfo.base64.toString() })
          return fileInfo
        }
      }    
    }
  }

  const handleUpdateUser = async (e:React.FormEvent) => {
    e.preventDefault()
      try{
        console.log(user)
        await dispatch(UpdateUser({_id: profileUser.result._id, userName: user.userName, password: user.password, image: user.image})).unwrap()
        navigate('/')
      } catch (error:any) {
        alert(error.message)
      }
  }

  return (
    <Box sx={{display: 'flex', flexDirection:'column', width: 200, backgroundColor: 'white', boxShadow: 2, borderRadius: 5}}>
        <Typography sx={{display: 'flex',  justifyContent: 'center', marginTop: 1}}>Edit Profile</Typography>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: 2}}>
        <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <label title='Photo Upload'>
              New Profile Image
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
                    width: '7.5vw',
                    padding: 5,
                    marginBottom: 1,
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
        <form onSubmit={handleUpdateUser}>
          <label>New User Name</label>
          <TextField
            type="text"
            placeholder="new user name"
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          <br />
          <br />
          <label>New Password</label>
          <TextField
            sx={{backgroundColor: 'white'}}
            type="text"
            placeholder="new password"
            fullWidth
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
        </Box>
    </Box>
  )
}

export default EditProfile