import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { searchPins } from '../../features/pinsSlice'

import MasonryLayout from '../MasonryLayout/MasonryLayout'
import Spinner from '../Spinner/Spinner'


const Search = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [pins, setPins] = useState<IPin[]>()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState<string>('') 


  return (
    <div>
      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  )
}

export default Search