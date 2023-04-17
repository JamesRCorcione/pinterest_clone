import { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getPins, getPinsByTags } from '../../features/pinsSlice'

import MasonryLayout from '../MasonryLayout/MasonryLayout'
import Spinner from '../Spinner/Spinner'


const Feed = () => {
  const [loading, setLoading] = useState(false)
  const pinsState = useSelector((state: RootState) => state.pinsState);
  const { pins } = pinsState
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const { category } = useParams()


  useEffect(() => {
    async function loadPins() {      
      await dispatch(getPins(null))  
    }
    setLoading(true)
    loadPins()
    setLoading(false)
  }, [])
  

  if (loading) return <Spinner message="We are adding new ideas to your feed!"/>

  return (
    <div>     
      {!pins?.length 
      ?
        <h2>No Pins Available</h2>
      : 
        <>
          {pins && <MasonryLayout pins={pins} />}
        </>
      }
    </div>
  )
}

export default Feed
