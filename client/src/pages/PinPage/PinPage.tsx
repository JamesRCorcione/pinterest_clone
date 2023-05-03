import React, { useEffect, useState } from 'react'
import PinDetails from '../../components/PinDetails/PinDetails'
import { useDispatch, useSelector } from 'react-redux';
import Feed from '../../components/Feed/Feed';
import { getPin } from '../../features/pinsSlice';
import { getImageDimensions } from '../../utils/getImageHeight';
import { getCommentsByPin } from '../../features/commentsSlice';
import { getUsers } from '../../features/usersSlice';
import { useParams } from 'react-router-dom';
import { Box, LinearProgress, Typography } from '@mui/material';

import useStyle from './styles'

const PinPage = () => {
    const pinsState = useSelector((state: RootState) => state.pinsState);
    let { pins } = pinsState
    const usersState = useSelector((state: RootState) => state.usersState);
    let { users } = usersState
    const { pinId } = useParams()
    const { classes } = useStyle()
    const dispatch = useDispatch<AppDispatch>()
    const [loading, setLoading] = useState(false)
    const [creatorUserName, setCreatorUserName] = useState()
    const [creatorUserImage, setCreatorUserImage] = useState()
    const [imageDimensions, setImageDimensions] = useState<any>()
    const [pin, setPin] = useState<any>(null)
    const creatorId = pin?.creatorId    

    useEffect(() => {        
        setLoading(true)
        getPinDetails()
        
      }, [])
    
      useEffect(() => {  
        setCreatorUser()        
      }, [users])
    
    
      const getPinDetails = async () => {
        const data = await dispatch(getPin(pinId))
        setPin(data.payload)    
        const imageDimensions =  getImageDimensions(pin?.image)
        setImageDimensions(imageDimensions) 
        await dispatch(getCommentsByPin(pinId))
        await dispatch(getUsers(null))    
      }
    
      const setCreatorUser = async () => {
        if (users && ! creatorUserName) {
          const creatorUser = await users.find((user:any) => user._id === creatorId)
          setCreatorUserName(creatorUser?.userName)
          setCreatorUserImage(creatorUser?.image)
          setLoading(false)
        }
      }    

    if (loading) return (
        <Box className={classes.loading} >
            <LinearProgress color='inherit' />
        </Box>
    )
    
  return (
    <>
    {imageDimensions &&
    <>
    <PinDetails pinId={pinId} pin={pin} imageDimensions={imageDimensions} creatorUserName={creatorUserName} creatorUserImage={creatorUserImage} />
    {/* Text and Spacing rendered below */}
    <Box sx={{display: 'flex', justifyContent: 'center', width: '100%', paddingTop: 10}}>
        <Typography sx={{fontSize: 22}}>More like this</Typography>
      </Box>
    {!loading &&
        <Feed pins={pins} />        
    }
    </>
    }
    </>
  )
}

export default PinPage