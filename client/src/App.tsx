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
import PinDetails from './components/PinDetails/PinDetails';
import Search from './components/Search/Search';
import { fetchUser } from './utils/fetchUser';
import { useDispatch, useSelector } from 'react-redux';
import { deletePin } from './features/pinsSlice';
import NotFound from './pages/NotFound';

function App() {
  const navigate = useNavigate()
  let user = fetchUser()


  useEffect(() => {
    if(!user) {
     navigate('/login') 
    }
  }, [user])
 
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (     
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN!}>
      <TopNavbar />
      
      <Routes>     
        <Route path='*' element={<NotFound />} />
        <Route path='/*' element={<Feed /> } />
        <Route path='/' index element={<Feed /> } />               
        <Route path='/login' index element={!user && <Login />} />          
        <Route path='/createPin' index element={<CreatePin user={user} /> } />
        <Route path='/category/:category' element={<Feed />} />
        <Route path='/pin-detail/:pinId' element={<PinDetails />} />
        <Route path='/user-profile/:userId' index element={<Profile  />} />    
        <Route path='/search' element={<Feed />} />
      </Routes>   

    </GoogleOAuthProvider>
    
  );
}

export default App;
