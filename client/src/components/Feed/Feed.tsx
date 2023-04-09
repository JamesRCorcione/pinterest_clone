import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPin, getPins, getPinsByCategory } from '../../features/pinsSlice'

import MasonryLayout from '../MasonryLayout/MasonryLayout'
import Spinner from '../Spinner/Spinner'



const Feed = () => {
  const [loading, setLoading] = useState(false)
  const pinsState = useSelector((state: RootState) => state.pinsState);
  const { pins } = pinsState
  const dispatch = useDispatch<AppDispatch>()
  const { category } = useParams()
  
  useEffect(() => {
    async function loadPins() {
    setLoading(true)

    if(category) {
      await dispatch(getPinsByCategory(category))
    } else {
      await dispatch(getPins(null))
    }


    setLoading(false)
  }

  loadPins()
  }, [category])
  

  console.log(pins[0])

  if (loading) return <Spinner message="We are adding new ideas to your feed!"/>

  if(!pins[0]?.length) return <h2>No Pins Available</h2>


  return (
    <div>
      {pins[0] && <MasonryLayout pins={pins[0]} />}
    </div>
  )
}

export default Feed
