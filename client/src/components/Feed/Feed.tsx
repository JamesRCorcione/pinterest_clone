import { useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getPins, getPinsByTags } from '../../features/pinsSlice'
import { Circles } from 'react-loader-spinner'


import useStyles from './styles'
import Spinner from '../Spinner/Spinner'
import { Box } from '@mui/material'
import Masonry from 'react-masonry-css'
import Pin from '../Pin/Pin'
import { fetchUser } from '../../utils/fetchUser'

const breakpointObj = {
  default: 3,
  3000: 6,
  2000: 5,
  1200: 5,
  1000: 3,
  500: 1,
}

const Feed = ({pins}:any) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const classes = useStyles()
  const [totalPins, setTotalPins] = useState<number>(20)
  const [atBottom, setAtBottom] = useState<boolean>(false)
  const usersState = useSelector((state: RootState) => state.usersState);
  const { users } = usersState



  useEffect(() => {        
    loadPins()    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
        window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    loadPins()
    setAtBottom(false) 
  }, [atBottom])


  async function loadPins() {
    setLoading(true)
    await dispatch(getPins(pins.length + 20))
    setLoading(false)
  }

  const handleScroll = (e:any) => {
    window.addEventListener('scroll', 
      async function() {
        if ((window.innerHeight + window.scrollY + 1) >= document.body.offsetHeight && !atBottom) {
         //console.log("you're at the bottom of the page");
         // Show loading spinner and make fetch request to api
         setAtBottom(true)        
        // setTotalPins((totalPins) => totalPins + 20)
        }
      },
      { once: true }
    )
  }


  //if (loading) return <Box sx={{position: 'relative', top: 0}}><Circles color="#00BFFF" height={50} width={200}/></Box>
  if (pins?.length === 0 && !loading) return <Box sx={{position: 'relative', width: '90%', top: 80, left: 50}}><h2>No Pins Available</h2></Box>

  return (
    <>
    {loading &&
      <Box sx={{position: 'relative'}}>
        <Box sx={{position: 'absolute', top: 250, right: '50%', zIndex: 2}}>
          <Box sx={{position: 'relative', }}>
              <Circles color="#00BFFF" height={50} width={50}/>
          </Box>
        </Box>
      </Box>
    }
      <Box>
        <Masonry className={classes.pin} breakpointCols={breakpointObj}>
          {pins?.map((pin:IPin, i:number) => <Pin key={i} pin={pin} />)}        
        </Masonry>                       
      </Box>
    </>
  )
}

export default Feed
