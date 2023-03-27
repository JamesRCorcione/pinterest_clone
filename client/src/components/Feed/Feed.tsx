import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPins } from '../../features/pinsSlice'

import MasonryLayout from '../MasonryLayout/MasonryLayout'
import Spinner from '../Spinner/Spinner'



const Feed = () => {
  const [loading, setLoading] = useState(false)
  const pinsState = useSelector((state: RootState) => state.pinsState);
  const { pins } = pinsState
  const dispatch = useDispatch<AppDispatch>()
  const { categoryId } = useParams()

  useEffect(() => {
    dispatch(getPins(null))
  }, [])


  {/*
  useEffect(() => {
    setLoading(true)

    if(categoryId) {
      const query = searchQuery(categoryId)
      
      client.fetch(query).then((data) => {
        setPins(data)
        setLoading(false)
      })
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data)
        setLoading(false)
      })
    }
  }, [categoryId])
  */}


  if (loading) return <Spinner message="We are adding new ideas to your feed!"/>

  if(!pins?.length) return <h2>No Pins Available</h2>


  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed