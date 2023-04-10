import React, { createContext, useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Box, createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import Login from './pages/Login/Login';
import TopNavbar from './components/TopNavbar/TopNavbar';
import CreatePin from './pages/CreatePin/CreatePin';
import Feed from './components/Feed/Feed';
import Profile from './pages/Profile/Profile';
import SuggestedFeeds from './pages/SuggestedFeeds/SuggestedFeeds';
import PinDetails from './components/PinDetails/PinDetails';
import Search from './components/Search/Search';
import { fetchUser } from './utils/fetchUser';
import { GetUserById } from './features/usersSlice';
import { useSelector } from 'react-redux';

function App() {
  const navigate = useNavigate()
  //const user = JSON.parse(localStorage.getItem('profile') || 'false')
  let user = fetchUser()


  useEffect(() => {
    if(!user) navigate('/login') 
  }, [])

  console.log('user', user)


  return (     
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN!}>
      {user &&
        <TopNavbar />
      }
      <Routes>     
      <Route path='/' index element={<Feed /> } />               
        <Route path='/login' index element={<Login />} />          
        <Route path='/createPin' index element={<CreatePin user={user} /> } />
        <Route path='/category/:category' element={<Feed />} />
        <Route path='/pin-detail/:pinId' element={<PinDetails />} />
        <Route path='/user-profile/:userId' index element={<Profile  />} />    
        <Route path='/search/:searchTerm' element={<Search />} />  
      </Routes>        
    </GoogleOAuthProvider>
    
  );
}

export default App;
