import { Box, Button, FilledInput, IconButton, Input, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteUser, Logout, UpdateUser } from '../../features/usersSlice';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';

import useStyles from './styles'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { classnames } from 'tss-react/tools/classnames';

const EditProfile = ({profileUser}:any) => {
  const [user, setUser] = useState<any>({userName: profileUser?.userName, image: null, password: null})
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [confirmDeleteButton, setConfirmDeleteButton] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>()   
  const navigate = useNavigate()
  const { classes } = useStyles()

  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)

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
    console.log('pro', profileUser._id)
      try{
        await dispatch(UpdateUser({_id: profileUser._id, userName: user.userName, password: user.password, image: user.image})).unwrap()
        navigate('/')
      } catch (error:any) {
        alert(error.message)
      }
  }

  const handleDeleteProfile = async () => {
    try{
      
      await dispatch(DeleteUser({userId: profileUser._id})).unwrap()
      await dispatch(Logout())
      navigate('/login')
    } catch (error:any) {
      alert(error.message)
    }
  }

  return (
    <Box className={classes.editProfileContainer}>
        <Typography sx={{marginTop: 0}}>Edit Profile</Typography>

        
        <Box className={classes.imageSection}>
          {!user.image ?
          <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
              <label title='Photo Upload'>
                <Typography sx={{marginLeft: 2}}>New Profile Image</Typography>
                <Box 
                    className={classes.imageDropBox}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag} 
                    onDragOver={handleDrag} 
                    onDrop={handleDrop}
                    draggable
                  >
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
          :        
          <Box>
            <Typography sx={{marginLeft: 2}}>New Profile Image</Typography>
            <Box>
              <DeleteIcon sx={{cursor: 'pointer', color: red[600]}} onClick={() => setUser({ ...user, image: null })} />
            <Box 
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 99, 
                width: '175px', 
                height: '175px',
                overflow: 'hidden',           
                marginBottom: 1,
              }}
            >

              <img src={user?.image} width={'100%'} height={'100%'} border-radius={10}></img>
            </Box>          
          </Box>          
          </Box>
        }
        </Box>

        <Box className={classes.detailSection}>
          <form onSubmit={handleUpdateUser}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <label>New User Name</label>
              <TextField
                className={classes.usernameInput}
                type="text"
                placeholder="new user name"
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
                
              />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <label>New Password</label>
              <FilledInput 
                className={classes.inputPassword} 
                name="password" 
                placeholder={'Password'}
                fullWidth 
                disableUnderline
                type={showPassword ? 'text' : 'password'} 
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                    </InputAdornment>
                }
                onChange={(e:any) => setUser({ ...user, password: e.target.value })} 
              />
            </Box>
          </form> 
           
        </Box>
        
        <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'space-evenly', width: '100%'}}>
          <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: "0.9rem 0rem",
                fontFamily: "'Abel', 'sansSerif'",
              }}
              onClick={handleUpdateUser}
            >
                Update Profile         
          </Button>     

          {confirmDeleteButton ?
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: red[400],
                margin: "0.9rem 0rem",
                fontFamily: "'Abel', 'sansSerif'",
              }}
              onClick={handleDeleteProfile}
            >
                Confirm Delete ?         
            </Button>  
          :
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: red[400],
                margin: "0.9rem 0rem",
                fontFamily: "'Abel', 'sansSerif'",
              }}
              onClick={() => setConfirmDeleteButton(true)}
            >
              Delete Profile         
            </Button>    
          }
        </Box>

    </Box>
  )
}

export default EditProfile