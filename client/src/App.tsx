import React, { createContext, useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Box, createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import decode from 'jwt-decode'

import Login from './pages/Login/Login';
import TopNavbar from './components/TopNavbar/TopNavbar';
import CreatePin from './pages/CreatePin/CreatePin';
import Feed from './components/Feed/Feed';
import Profile from './pages/Profile/Profile';
import PinDetails from './components/PinDetails/PinDetails';
import Search from './components/Search/Search';
import { fetchUser } from './utils/fetchUser';
import { useDispatch, useSelector } from 'react-redux';
import { deletePin, getPins } from './features/pinsSlice';
import NotFound from './pages/NotFound';
import { getUsers, Logout } from './features/usersSlice';
import { getComments } from './features/commentsSlice';
import AgreementAndPolicy from './pages/AgreementAndPolicy';

interface MyToken {
  name: string
  exp: number
}

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  let user = fetchUser()
  const pinsState = useSelector((state: RootState) => state.pinsState);
  const { pins } = pinsState
  const usersState = useSelector((state: RootState) => state.usersState);
  const { users } = usersState
  const commentsState = useSelector((state: RootState) => state.commentsState);
  let { comments } = commentsState

  useEffect(() => {
   getAllUsers()
  }, [])

  const getAllUsers = async () => {
    await dispatch(getUsers(null))
  }

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
      {!user ?
        <Routes>
          <Route path='*' index element={<Login />} />    
        </Routes>
      :
      <>
      <TopNavbar />
      <Routes>     
        <Route path='*' element={<NotFound />} />
        <Route path='/*' element={<Feed /> } />
        <Route path='/' index element={<Feed pins={pins} /> } />             
        <Route path='/createPin' index element={<CreatePin user={user} /> } />
        <Route path='/category/:category' element={<Feed />} />
        <Route path='/pin-detail/:pinId' element={<PinDetails />} />
        <Route path='/user-profile/:userId' index element={<Profile  />} />    
        <Route path='/search/*' element={<Search />} />
        <Route path='/agreementAndPolicy' element={<AgreementAndPolicy />} />
      </Routes>   
      </>
      }
    </GoogleOAuthProvider>
    
  );
}

export default App;
