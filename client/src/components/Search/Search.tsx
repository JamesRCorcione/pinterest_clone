import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { searchPins } from '../../features/pinsSlice'

import Spinner from '../Spinner/Spinner'
import Feed from '../Feed/Feed'


function useQuery() {
  return new URLSearchParams(useLocation().search)
}


const Search = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState<IPin[]>()
  const navigate = useNavigate()

  const query = useQuery()
  const searchQuery = query.get('query')  

  useEffect(() => {
    const getSearch = async () => {
      if (searchQuery !== '') {
        setLoading(true)
        const data = await dispatch(searchPins(searchQuery))
          setPins(data.payload)
          setLoading(false)      
          //navigate(`/search/search?query=${searchTerm || 'none'}`)  
      } 
    }
    getSearch()
  }, [searchQuery])


  return (
    <div>
      {loading && <Spinner message="Searching Pins" />}
      {pins?.length !== 0 && <Feed pins={pins} />}
      {pins?.length === 0 && searchQuery !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  )
}

export default Search