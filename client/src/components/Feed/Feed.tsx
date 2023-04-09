import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPin, getPins, getPinsByCategory } from '../../features/pinsSlice'

import MasonryLayout from '../MasonryLayout/MasonryLayout'
import Spinner from '../Spinner/Spinner'



const Feed = () => {
  const [loading, setLoading] = useState(false)
  const pinsState = useSelector((state: RootState) => state.pinsState);
  //const { pins } = pinsState
  const dispatch = useDispatch<AppDispatch>()
  const { category } = useParams()
  let pins: IPin[] = []
  
  useEffect(() => {
    async function loadPins() {
    setLoading(true)

    if(category) {
      await dispatch(getPinsByCategory(category))
    } else {
      pins = await dispatch(getPins(null))
    }


    setLoading(false)
  }

  console.log(pins)

  loadPins()
  }, [category])
  


  if (loading) return <Spinner message="We are adding new ideas to your feed!"/>

  if(!pins?.length) return <h2>No Pins Available</h2>


  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed
