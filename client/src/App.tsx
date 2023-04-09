import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Box, createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import LandingPage from './pages/LandingPage/LandingPage';
import TopNavbar from './components/TopNavbar/TopNavbar';
import CreatePin from './pages/CreatePin/CreatePin';
import Feed from './components/Feed/Feed';
import Profile from './pages/Profile/Profile';
import SuggestedFeeds from './pages/SuggestedFeeds/SuggestedFeeds';
import PinDetails from './components/PinDetails/PinDetails';
import Search from './components/Search/Search';
import { fetchUser } from './utils/fetchUser';

function App() {
  const user = fetchUser()
  console.log(user)

  return (    
    <>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN!}>
      <BrowserRouter>
      {!user
      ? 
      <LandingPage />
      :      
        <Box sx={{width:'100%'}}>
          <TopNavbar />
          <Routes>
            <Route path='/landingPage' index element={<LandingPage />} />
            <Route path='/' index element={<Feed />} />
            <Route path='/today' index element={<SuggestedFeeds />} />
            <Route path='/createPin' index element={<CreatePin user={user} />} />
            <Route path='/pin-detail/:pinId' element={<PinDetails />} />
            <Route path='/user-profile/:userId' index element={<Profile  />} />    

            <Route path='/category/:category' element={<Feed />} />
            <Route path='/search/:searchTerm' element={<Search />} />
          </Routes>    
        </Box>
      
      }
      </BrowserRouter>
    </GoogleOAuthProvider>
    </>
  );
}

export default App;
