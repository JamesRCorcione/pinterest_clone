import React, { useEffect, useState } from 'react'

import MasonryLayout from '../MasonryLayout/MasonryLayout'
import { feedQuery, searchQuery } from '../../utils/data'
import Spinner from '../Spinner/Spinner'

const Search = ({ searchTerm }:any) => {
  const [pins, setPins] = useState<IPin[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true)
      const query = searchQuery(searchTerm.toLowerCase())      
    } else {      
    }
  }, [searchTerm])

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