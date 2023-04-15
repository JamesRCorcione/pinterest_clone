import { Avatar, Box, Button, IconButton, Input, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import decode from 'jwt-decode'
import pinterestLogo from '../../media/pinterest-logo.png'
import useStyles from './styles'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Logout } from '../../features/usersSlice';
import { fetchUser } from '../../utils/fetchUser';

interface MyToken {
  name: string
  exp: number
}

const TopNavbar = () => {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const [user, setUser] = useState<any>(fetchUser())
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [openMenu, setOpenMenu] = useState<boolean>()


  useEffect(() => {
    const token = user?.token
      if(token) {
          const decodedToken = decode<MyToken>(token)  
          if(decodedToken.exp * 1000 < new Date().getTime()) {
            logoutUser()
          }
      }
    setUser(fetchUser())
  }, [location])

  const logoutUser = () => {
    dispatch(Logout())
    setUser(null)
    navigate('/login')    
  }

  const handleOpenMenu = () => {
    setOpenMenu((openMenu) => !openMenu)
  }

  const handleSearch = (e:any) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`)
  }


  return (
    <Box className={classes.navbar}>
      <Box className={classes.leftSideContainer}>
        <IconButton  className={classes.logoButton} onClick={() => navigate('/')}>
          <img src={pinterestLogo} alt='website icon' height='25px' />
        </IconButton>
        <Box className={classes.boxList}>
        <Button className={classes.homeButton} onClick={() => navigate('/')}>
          <Typography sx={{fontFamily: 'sans-serif'}} color='black'>
            Home
          </Typography>
        </Button>
        </Box>
        <Box onClick={() => navigate(`/today`)} className={classes.boxList}>
        </Box>
        <Box className={classes.boxList}>
        <Button className={classes.createButton} onClick={() => navigate('/createPin')}>
          <Typography sx={{fontFamily: 'sans-serif'}} color='black'>
            Create            
          </Typography>
        </Button>
        </Box>
      </Box>

      <Box className={classes.searchBar}>
        <form onSubmit={(e) => handleSearch(e)}>
          <SearchIcon sx={{paddingTop: 1.5, marginLeft: 2, color: grey[600]}} /> 
          <Input 
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search Pinterest' disableUnderline={true} sx={{position: 'abolute', bottom: 30, left: 40, typography: 'subtitle2', width: '100%', marginLeft: 1, color: grey[600]}} 
          />
        </form>
      </Box>

      <Box sx={{display:'flex', justifyContent:'end', height: '100%'}}>
        <Button onClick={() => navigate(`/user-profile/${user.result._id}`)} sx={{top: 12, borderRadius: 99, maxWidth: '50px', maxHeight: '50px', minWidth: '50px', minHeight: '50px'}}>
          <Avatar sx={{maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px'}} />
        </Button>

        <Button     
          sx={{top: 22, marginRight: 3, borderRadius: 99, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
          onClick={handleOpenMenu}
        >
          <KeyboardArrowDownIcon sx={{color: grey[500]}} />
        </Button>
        {openMenu && 
          <Box sx={{position: 'absolute', top: 55, right: 10}}>
            <Box id='menu' sx={{height: 250, width: 200, borderRadius: 3, backgroundColor: 'white', boxShadow: 5}}>
              <Button onClick={() => navigate(`/user-profile/${user.result._id}`)} sx={{paddingRight: 10, marginTop: 2, height: 50, width: '100%'}}>Profile</Button>
              <Button onClick={logoutUser} sx={{paddingRight: 10, height: 50, width: '100%'}}>Logout</Button>
            </Box>
          </Box>
        }
                
      </Box>

    </Box>
  )
}

export default TopNavbar