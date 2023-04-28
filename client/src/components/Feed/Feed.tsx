import { useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getPins, getPinsByTags } from '../../features/pinsSlice'

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
  const [totalPins, setTotalPins] = useState<number>(0)



  useEffect(() => {        
    loadPins()    
    //window.addEventListener('scroll', handleScroll, { passive: true })
    //return () => {
    //    window.removeEventListener('scroll', handleScroll)
    //}
  }, [])

  console.log(pins.length)

  async function loadPins() {
    //setLoading(true)
    await dispatch(getPins(20))
    //setLoading(false)
  }

  //const handleScroll = (e:any) => {
  //  window.addEventListener('scroll', 
  //    function() {
  //      if ((window.innerHeight + window.scrollY + 1) >= document.body.offsetHeight) {
  //       console.log("you're at the bottom of the page");
  //       // Show loading spinner and make fetch request to api         
  //       loadPins()
  //      }
  //    },
  //    { once: true }
  //  )
  //}


  
  if (loading) return <Spinner message="We are adding pins to your feed!"/>
  if (pins?.length === 0) return <Box sx={{position: 'absolute', top: 80, left: 50}}><h2>No Pins Available</h2></Box>

  return (
    <Box>
      <Masonry className={classes.pin} breakpointCols={breakpointObj}>
        {pins?.map((pin:IPin, i:number) => <Pin key={i} pin={pin} />)}        
      </Masonry>                       
    </Box>
  )
}

export default Feed
