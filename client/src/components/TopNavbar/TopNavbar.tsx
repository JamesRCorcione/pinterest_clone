import { Avatar, Box, Button, IconButton, Input, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';

import decode from 'jwt-decode'
import pinterestLogo from '../../media/pinterest-logo.png'
import useStyles from './styles'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Logout } from '../../features/usersSlice';
import { fetchUser } from '../../utils/fetchUser';
import { searchPins } from '../../features/pinsSlice';

interface MyToken {
  name: string
  exp: number
}

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const TopNavbar = () => {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const [user, setUser] = useState<any>(fetchUser())
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [openMenu, setOpenMenu] = useState<boolean>()

  const [pins, setPins] = useState<IPin[]>()
  const query = useQuery()
  const searchQuery = query.get('query')  

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

  async function search() {
    const data = await dispatch(searchPins(searchTerm))
    navigate(`/search?query=${searchTerm || 'none'}`)        
  }

  const handleSearch = (e:any) => {
    e.preventDefault();    
    if (searchTerm === '') {
      navigate(`/`)
    } else {      
      search()
    }
  }

  const logoutUser = () => {
    dispatch(Logout())
    setUser(null)
    navigate('/login')    
  }

  const handleOpenMenu = () => {
    setOpenMenu((openMenu) => !openMenu)
  }

  const openSearch = () => {
    return (
      <Box sx={{zIndex: 3000, position: 'absolute', top: 0}}>
        <h1>Hi</h1>  
      </Box>
    )
  }

  return (
      <Box className={classes.navbar}>
        <Button className={classes.mobileHomeButton} onClick={() => navigate('/')}>
          <HomeIcon className={classes.mobileIconSize}/>
          <Typography className={classes.mobileButtonText}>Home</Typography>
        </Button>
        <Button className={classes.mobileHomeButton} onClick={openSearch}>
          <SearchIcon className={classes.mobileIconSize}/>
          <Typography className={classes.mobileButtonText}>Search</Typography>
        </Button>
        <Button className={classes.mobileHomeButton} onClick={() => navigate('/createPin')}>
          <AddCircleIcon className={classes.mobileIconSize}/>
          <Typography className={classes.mobileButtonText}>Create</Typography>
        </Button>
        <Button className={classes.mobileHomeButton} onClick={() => navigate(`/user-profile/${user.result._id}`)}>
          <PersonIcon className={classes.mobileIconSize}/>
          <Typography className={classes.mobileButtonText}>Profile</Typography>
        </Button>

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
              className={classes.searchInput}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search Pinterest' 
              disableUnderline={true} 
            />
          </form>
        </Box>
        <Box sx={{display:'flex', justifyContent:'end', height: '100%'}}>
          <Button 
            className={classes.profileButton} 
            onClick={() => navigate(`/user-profile/${user.result._id}`)}
          >
            <Avatar sx={{maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px'}} />
          </Button>
          <Button     
            className={classes.dropDownButton}
            onClick={handleOpenMenu}
          >
            <KeyboardArrowDownIcon sx={{color: grey[500]}} />
          </Button>
          
          {openMenu && 
            <Box sx={{position: 'absolute', top: 55, right: 10}}>
              <Box className={classes.dropDownMenu}>
                <Button 
                  sx={{paddingRight: 10, marginTop: 2, height: 50, width: '100%'}}
                  onClick={() => navigate(`/user-profile/${user.result._id}`)} 
                >
                  Profile
                </Button>
                <Button 
                  sx={{paddingRight: 10, height: 50, width: '100%'}}
                  onClick={logoutUser}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          }                
        </Box>
      </Box>
  )
}

export default TopNavbar