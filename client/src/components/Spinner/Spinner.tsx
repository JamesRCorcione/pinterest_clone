import { Box, Typography } from '@mui/material'
import React from 'react'
import { Circles } from 'react-loader-spinner'

interface MessageProps {
  message: string
}

const Spinner = ({ message }:MessageProps) => {
  return (
    <Box sx={{position: 'absolute', left:'50%', top: '50%'}}>
      <Box sx={{position: 'relative', left:'-50%', top: '-50%'}}>
          <Circles 
              color="#00BFFF"
              height={50}
              width={200}
          />
          <Box>
          <Typography sx={{position: 'relative', right:'15%', top: 5}}>{message}</Typography>
          </Box>
        </Box>
    </Box>
  )
}

export default Spinner