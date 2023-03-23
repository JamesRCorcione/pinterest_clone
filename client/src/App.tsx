import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Box, createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home'
import TopNavbar from './components/TopNavbar/TopNavbar';
import CreatePin from './components/CreatePin/CreatePin';
import Feed from './components/Feed/Feed';



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
        <Route path='/' index element={<Feed />} />
        <Route path='/createPin' index element={<CreatePin user={user} />} />
      </Routes>    
      </Box>
    
    }
    </BrowserRouter>
    </>
  );
}

export default App;
