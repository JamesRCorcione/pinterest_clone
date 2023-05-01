import { Box } from '@mui/material'
import React from 'react'

const AgreementAndPolicy = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{paddingTop: 3, paddingBottom: 3}}>User Agreement And Private Policy Place Holder</Box>
      <Box sx={{paddingBottom: 3}}>Only User's Name, User's Image, Email, Encrypted Password, and Saved Pins are stored on a DataBase</Box>
      <Box sx={{paddingBottom: 3}}>None of this information is sold as this is only a showcase project</Box>
    </Box>
  )
}

export default AgreementAndPolicy