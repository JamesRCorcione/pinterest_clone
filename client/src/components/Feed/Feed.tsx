import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import { deletePin, getPin, getPins, getPinsByTags } from '../../features/pinsSlice'

import MasonryLayout from '../MasonryLayout/MasonryLayout'
import Spinner from '../Spinner/Spinner'
import { fetchUser } from '../../utils/fetchUser'
import TopNavbar from '../TopNavbar/TopNavbar'
import { updateSaves } from '../../features/usersSlice'


const Feed = () => {
  let user = fetchUser()
  const [loading, setLoading] = useState(false)
  const pinsState = useSelector((state: RootState) => state.pinsState);
  const { pins } = pinsState
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
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
  }, [location, category])
  

  if (loading) return <Spinner message="We are adding new ideas to your feed!"/>
  if(!pins?.length) return <h2>No Pins Available</h2>

  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed
