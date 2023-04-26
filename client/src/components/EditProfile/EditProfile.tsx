import { Box, Typography } from '@mui/material'
import React from 'react'

const EditProfile = ({user}:any) => {
  return (
    <Box sx={{display: 'flex', flexDirection:'column', width: 200, backgroundColor: 'white', boxShadow: 2, borderRadius: 5}}>
        <Typography sx={{display: 'flex',  justifyContent: 'center', marginTop: 1}}>Share</Typography>
        <Box sx={{display: 'flex',  justifyContent: 'space-between', margin: 2}}>
        </Box>
    </Box>
  )
}

export default EditProfile