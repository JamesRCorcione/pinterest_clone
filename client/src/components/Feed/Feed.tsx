import { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getPins, getPinsByTags } from '../../features/pinsSlice'

import useStyles from './styles'
import Spinner from '../Spinner/Spinner'
import { Box } from '@mui/material'
import Masonry from 'react-masonry-css'
import Pin from '../Pin/Pin'

const breakpointObj = {
  default: 3,
  3000: 6,
  2000: 5,
  1200: 4,
  1000: 2,
  500: 1,
}

const Feed = ({pins}:any) => {
  const [loading, setLoading] = useState(false)
  
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()
  const { category } = useParams()
  const classes = useStyles()


  useEffect(() => {
    async function loadPins() {
      setLoading(true)
      await dispatch(getPins(null))      
      setLoading(false)
    }
    loadPins()
  }, [])
  

  if (loading) return <Spinner message="We are adding new ideas to your feed!"/>

  return (
    <Box>     
      {!pins?.length 
      ?
        <h2>No Pins Available</h2>
      : 
        <>
          <Box>
              {!pins?.length 
              ?
                <Box >
                  <Box sx={{marginLeft: 3}}>
                    <h2>No Saved Pins!</h2>
                    <h5>Save a pin to see more!</h5>
                  </Box>
                  <Box sx={{position: 'absolute', width: '100%', bottom: 0}}>
                  
                  </Box>
                </Box>
              :
              <Masonry className={classes.pin} breakpointCols={breakpointObj}>
                {pins?.map((pin:IPin, i:number) => <Pin key={i} pin={pin} />)}        
              </Masonry>               
            }     
            </Box>          
        </>
      }
    </Box>
  )
}

export default Feed
