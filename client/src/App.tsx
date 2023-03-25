import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Box, createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home'
import TopNavbar from './components/TopNavbar/TopNavbar';
import CreatePin from './pages/CreatePin/CreatePin';
import Feed from './components/Feed/Feed';
import Profile from './pages/Profile/Profile';
import SuggestedFeeds from './pages/SuggestedFeeds/SuggestedFeeds';
import PinDetails from './components/PinDetails/PinDetails';



function App() {
  const user = (JSON.parse(localStorage.getItem('profile') || "false"))


  return (    
    <>
    <BrowserRouter>
    {!user
    ? 
    <LandingPage />
    :
    
      <Box sx={{width:'100%'}}>
        <TopNavbar />      
      <Routes>
        <Route path='/landingPage' index element={<LandingPage />} />
        <Route path='/*' index element={<Feed />} />
        <Route path='/today' index element={<SuggestedFeeds />} />
        <Route path='/createPin' index element={<CreatePin user={user} />} />
        <Route path="/pin-detail/:pinId" element={<PinDetails />} />
        <Route path='/user-profile/:userId' index element={<Profile  />} />    
      </Routes>    
      </Box>
    
    }
    </BrowserRouter>
    </>
  );
}

export default App;
