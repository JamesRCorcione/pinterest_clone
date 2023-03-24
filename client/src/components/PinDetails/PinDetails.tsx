import Feed from '../Feed/Feed'
import { Box, Typography } from '@mui/material'
import React from 'react'

const PinDetails = () => {
  return (
    <Box>
      <Box sx={{height:500, paddingBottom: 5}}>
        <Box sx={{ height: '100%', width: '100%', backgroundColor: 'blue'}}>

        </Box>
      </Box>

      <Box sx={{position: 'absolute', left: '50%'}}>
        <Box sx={{position: 'relative', left: '-50%'}}>
          <Typography>More like this</Typography>
        </Box>
      </Box>


      <Box sx={{paddingTop: 5}}>
        <Feed />
      </Box>
    </Box>
  )
}

export default PinDetails