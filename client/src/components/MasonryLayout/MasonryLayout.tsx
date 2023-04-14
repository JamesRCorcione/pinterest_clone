import { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import Pin from '../Pin/Pin'

import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPins, getPinsByTags } from '../../features/pinsSlice'
import Spinner from '../Spinner/Spinner'

const breakpointObj = {
  default: 3,
  3000: 6,
  2000: 5,
  1200: 4,
  1000: 2,
  500: 1,
}

const MasonryLayout = ({ pins }:any) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { category } = useParams()


  useEffect(() => {
    async function loadPins() {
      setLoading(true)

      if(category) {
        await dispatch(getPinsByTags(category))
      } else {
        await dispatch(getPins(null))
      }
      setLoading(false)
    }
    loadPins()
  }, [])
  

  if (loading) return <Spinner message="We are adding new ideas to your feed!"/>
  if(!pins?.length) return <h2>No Pins Available</h2>

  return (
    <div>
      <Masonry className={classes.pin} breakpointCols={breakpointObj}>
        {pins?.map((pin:IPin, i:number) => <Pin key={i} pin={pin} />)}
      </Masonry>
    </div>
  )
}

export default MasonryLayout