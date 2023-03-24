import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { fetchUser } from '../../utils/fetchUser'
import { Box, Button } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UploadIcon from '@mui/icons-material/Upload';

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

  //const imageHeight = getImageDimensions(image).then(jData => console.log(jData))
  //console.log('image',imageHeight)

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
            sx={{position: 'absolute', top:0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}
            >
            <Box sx={{display: 'flex', alignItems: 'center', justifyItems: 'justify-between'}}>
              
              {(true) ? (
                <Button sx={{position: 'absolute', top: 10, right: 10, borderRadius: 99, minHeight: 40, maxHeight: 40, minWidth: 70, maxWidth: 70, backgroundColor: 'red'}}
                  variant="contained" 
                  onClick={(e) => {
                    e.stopPropagation()
                    //savePin(_id)
                  }}
                  >
                    Saved
                </Button>
              ) : (
                <Button sx={{position: 'absolute', top: 10, right: 10, borderRadius: 99, minHeight: 40, maxHeight: 40, minWidth: 70, maxWidth: 70, backgroundColor: 'red'}}
                  variant="contained" 
                  onClick={(e) => {
                    e.stopPropagation()
                    //savePin(_id)
                  }}
                  type="button" 
                  >
                    {savingPost ? 'Saving...' : 'Save'}
                </Button>
                
              )}
            </Box>


            <Box>
                <Button sx={{minHeight: 30, maxHeight: 30, minWidth: 120, maxWidth: 120, borderRadius: 99, position: 'absolute', bottom: 15, left: 10, backgroundColor: 'grey'}}
                  href={`${destination}`}
                  variant='contained'
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  {destination}
                </Button>
              </Box>

              <Box>
                <Button sx={{minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30, backgroundColor: 'grey', borderRadius: 99, position: 'absolute', bottom: 15, right: 60, }}
                  href={`${image}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <UploadIcon />
                </Button>
            </Box>

            <Box>
                <Button sx={{minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30, backgroundColor: 'grey', borderRadius: 99, position: 'absolute', bottom: 15, right: 15}}
                  href={`${image}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <MoreHorizIcon />
                </Button>
            </Box>

            <Box>
                 
                  {(false) && (                    
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
