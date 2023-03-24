import { Feed } from '@mui/icons-material'
import { Box } from '@mui/material'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PinDetails from '../../components/PinDetails/PinDetails'
import CreatePin from '../CreatePin/CreatePin'
import Profile from '../Profile/Profile'
import SuggestedFeeds from '../SuggestedFeeds/SuggestedFeeds'

const Home = () => {
  const user = (JSON.parse(localStorage.getItem('profile') || "false"))

  return (
    <Box>
      <Routes>
        <Route path='/*' index element={<Feed />} />
        <Route path='/today' index element={<SuggestedFeeds />} />
        <Route path='/createPin' index element={<CreatePin user={user} />} />
        <Route path="/pin-detail/:pinId" element={<PinDetails />} />
        <Route path='/user-profile/:userId' index element={<Profile  />} />
      </Routes>  
    </Box>
  )
}

export default Home