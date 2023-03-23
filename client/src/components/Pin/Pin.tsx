import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { fetchUser } from '../../utils/fetchUser'
import { Box } from '@mui/material'

import useStyles from './styles'

import { getImageDimensions } from '../../utils/getImageHeight'


interface PinProps {
    pin: IPin
}

const Pin = ({ pin }:PinProps) => {
  const [postHovered, setPostHovered] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  const navigate = useNavigate();
  const user =  fetchUser()
  const classes = useStyles()
  const { postedBy, image, _id, destination } = pin

  const imageHeight = getImageDimensions(image)
  console.log('image',image)

  return (
    

    <Box>
      <Box
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className={classes.container}        
        >
        <img className={classes.image} alt="user-post" src={image} />
        {postHovered && (
          <Box 
            style={{ height: '100%'}}
            >
            <Box>
              <Box>
                <a
                  href={`${image}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <MdDownloadForOffline />
                </a>
              </Box>
              {(true) ? (
                <button
                  type="button" 
                  onClick={(e) => {
                    e.stopPropagation()
                    //savePin(_id)
                  }}
                  >
                    Saved
                </button>
              ) : (
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    //savePin(_id)
                  }}
                  type="button" 
                  >
                    {savingPost ? 'Saving...' : 'Save'}
                </button>
                
              )}
            </Box>
            <Box>
                 
                  {postedBy?._id === user?.sub && (                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        //deletePin(_id)
                      }}
                    >

                    <AiTwotoneDelete />
                    </button>
                  )}
            </Box>
          </Box>
        )}
        </Box>
        <Link
          to={`user-profile/${postedBy?._id}`}
        >
          <img  
            src={postedBy?.image}
            alt="user-profile"
          />
          <p>{postedBy?.userName}</p>
        </Link>
    </Box>
  )
}

export default Pin
