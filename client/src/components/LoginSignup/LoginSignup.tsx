import { Box, Button, Card, Paper, styled, TextField, Typography, Link, Divider, IconButton, useEventCallback } from '@mui/material'
import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FacebookSignIn, FacebookSignUp, GoogleSignIn, GoogleSignUp, SignIn, SignUp } from '../../features/usersSlice'
import FacebookLogin from 'react-facebook-login';

import useStyle from './styles'
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../utils/fetchUser';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { BorderAll, Height } from '@mui/icons-material';



const LoginSignup = ({ isSignUp, setOpenLogin }:any) => {
    const classes = useStyle()
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const [form, setForm] = useState<IUser>({ userName: '', email: '', password: '', image: '', birthday: null, saves: [] })
    const [open, setOpen] = useState<boolean>(true)
    const [switchLogin, setSwitchLogin] = useState<boolean>(isSignUp)
    const [swithSignup, setSwithSignup] = useState<boolean>(true)

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        await dispatch(SignUp(form));   

        setForm({
          userName: '',
          email: '',
          password: '',
          image: '',
          birthday: null,
          saves: []
        });
        handleExit()
    };  


    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        await dispatch(SignIn(form));   

        setForm({
          userName: '',
          email: '',
          password: '',
          image: '',
          birthday: null,
          saves: []
        });
        handleExit()        
    };  

    const googleLogin = useGoogleLogin({
        onSuccess: async response => {
          const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo' ,
          { headers: { Authorization: `Bearer ${response.access_token}` } }
          )
          
          const user = userInfo.data
          //const token = response.access_token.split('.')[1]

    
          try {
            if (!switchLogin) {
              await dispatch(GoogleSignUp(user))
            } else {
              await dispatch(GoogleSignIn(user))
            }
            handleExit()
          } catch (error) {
            console.log(error)
          }
        },
        onError: () => console.log("Login Failed")
    })
    const loginWithFacebook = async (response: any) => {
        await dispatch(FacebookSignIn(response));
        handleExit() 
    };
    const signupWithFacebook = async (response: any) => {
        await dispatch(FacebookSignUp(response)); 
        handleExit()
    };

    const handleExit = async () => {
        setOpen((open) => !open)
        setOpenLogin((openLogin:boolean) => !openLogin)        
        navigate('/')  
        window.location.reload();     
    }

    const handleLoginSwitch = () => {
        setSwitchLogin((switchLogin) => !switchLogin)
    }

    const handleSignupSwitch = () => {
        setSwithSignup((swithSignup) => !swithSignup)
    }

  return (
    <Dialog className={classes.dialog} open={open} >     
        <Box className={classes.popup}>   
        <IconButton className={classes.exitButton} size='small' onClick={handleExit} ><CloseIcon /></IconButton>
        {switchLogin 
        ?
        <>
            <Box className={classes.login}>
                <Typography className={classes.popupTitle} sx={{marginBottom: 0.5}}>Log In</Typography>
                <Typography className={classes.serviceAgreement}>By continuing, you are setting up a Readit account and agree to our <Link>User Agreement</Link> and <Link>Privacy Policy</Link>.</Typography>
            </Box>
            <Box className={classes.externalLogin} sx={{marginTop: 23}}>
                <Button 
                    onClick={() => googleLogin()}
                    sx={{borderRadius: 99, height: 45}}
                    className={classes.buttonSubmit} variant="contained" size="large" type="submit" 
                >
                    Login with Google
                </Button>                            
                <FacebookLogin
                    appId={'772299484215013'}
                    fields="name,email,picture"
                    callback={loginWithFacebook}
                    icon="fa-facebook"
                    onFailure={(err) => {
                    console.log("FB LOGIN ERROR:", err);
                    }}
                    containerStyle={{
                    textAlign: "center",
                    backgroundColor: "#3b5998",
                    borderColor: "#3b5998",
                    flex: 1,
                    display: "flex",
                    color: "#fff",
                    cursor: "pointer",
                    marginBottom: 3,
                    borderRadius: 99,
                    marginTop: 10
                    }}
                    buttonStyle={{
                    flex: 1,
                    textTransform: "none",
                    padding: "12px",
                    background: "none",
                    border: "none",
                    }}
                />                          
            </Box>
            <Divider sx={{paddingTop: 1.7, margin: 'auto', width: '70%', color: 'grey'}}>
                <Typography sx={{fontStyle: 'sans', fontSize: '12px'}}>OR</Typography>
            </Divider>

            
            <Box className={classes.formContainer} sx={{marginTop: 3}}>
                <form autoComplete='off' noValidate >  
                    <TextField className={classes.inputTextLogin} name="username" variant="outlined" label="Username" fullWidth onChange={(e) => setForm({ ...form, userName: e.target.value })} />
                    <TextField className={classes.inputTextLogin} name="password" variant="outlined" label="Password" fullWidth onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    
                    
                    <Box sx={{display: 'flex', marginTop: 0.5}}>
                        <Typography sx={{fontStyle: 'sans', fontSize: '12px', marginTop: 1,}}>Forgot your</Typography>
                        <Button onClick={() => {}} sx={{position: 'absolute', left: 122, marginTop: 0.85, textTransform: 'unset', background: 'none', border: 'none',  padding: 0, fontSize: '12px', fontFamily: 'sans-serif', color: '#069', textDecoration: 'underline', cursor: 'pointer'}}>
                            username
                        </Button>
                        <Typography sx={{fontStyle: 'sans', fontSize: '12px', marginTop: 1, marginLeft: 8}}>or</Typography>
                        <Button onClick={() => {}} sx={{position: 'absolute', left: 200, marginTop: 0.85, textTransform: 'unset', background: 'none', border: 'none',  padding: 0, fontSize: '12px', fontFamily: 'sans-serif', color: '#069', textDecoration: 'underline', cursor: 'pointer'}}>
                            password
                        </Button>
                        <Typography sx={{fontStyle: 'sans', fontSize: '12px', marginTop: 1, marginLeft: 8}}>?</Typography>
                    </Box>


                    <Button onClick={handleSignIn} className={classes.buttonSubmit} sx={{borderRadius: 99, marginTop: 3}} variant="contained" color="primary" size="large" type="submit" fullWidth>
                    <Typography sx={{fontStyle: 'sans', fontSize: '12px', textTransform: 'unset'}}>Log In</Typography>
                    </Button>                            
                </form>
            </Box>
            <Box sx={{display: 'flex', marginLeft: 8, marginTop: 0.5}}>
                <Typography sx={{fontStyle: 'sans', fontSize: '12px', marginTop: 1,}}>New to Reddit?</Typography>
                <Button onClick={handleLoginSwitch} sx={{position: 'absolute', left: 140, marginTop: 0.85, textTransform: 'unset', background: 'none', border: 'none',  padding: 0, fontSize: '12px', fontFamily: 'sans-serif', color: '#069', textDecoration: 'underline', cursor: 'pointer'}}>
                    Sign Up
                </Button>
            </Box>        
        </>
        :
        <>
           {swithSignup ?
            <>
                <Box className={classes.signup}>
                    <Typography className={classes.popupTitle} sx={{marginBottom: 0.5}}>Sign Up</Typography>
                    <Typography className={classes.serviceAgreement}>By continuing, you are setting up a Readit account and agree to our <Link>User Agreement</Link> and <Link>Privacy Policy</Link>.</Typography>
                </Box>
                <Box className={classes.externalLogin} sx={{marginTop: 28.5,}}>
                    <Button 
                        onClick={() => googleLogin()}
                        sx={{borderRadius: 99, height: 45}}
                        className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" 
                    >
                        Google Sign up
                    </Button>                            
                    <FacebookLogin
                    appId={'772299484215013'}
                    fields="name,email,picture"
                    callback={signupWithFacebook}
                    icon="fa-facebook"
                    onFailure={(err) => {
                    console.log("FB LOGIN ERROR:", err);
                    }}
                    containerStyle={{
                    textAlign: "center",
                    backgroundColor: "#3b5998",
                    borderColor: "#3b5998",
                    flex: 1,
                    display: "flex",
                    color: "#fff",
                    cursor: "pointer",
                    marginBottom: "3px",
                    borderRadius: 99,
                    marginTop: 10
                    }}
                    buttonStyle={{
                    flex: 1,
                    textTransform: "none",
                    padding: "12px",
                    background: "none",
                    border: "none",
                    }}
                    textButton='Sign up with Facebook'
                />                           
                </Box>
                <Divider sx={{paddingTop: 2.5, margin: 'auto', width: '70%', color: 'grey'}}>
                    <Typography sx={{fontStyle: 'sans', fontSize: '12px'}}>OR</Typography>
                </Divider>
                <Box className={classes.formContainer} sx={{marginTop: 4}} >
                    <form autoComplete='off' >  
                        <TextField className={classes.inputTextSignup} name="email" variant="outlined" label="Email" fullWidth onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        <Button 
                            sx={{borderRadius: 99, width: '100%'}}
                            onClick={handleSignupSwitch} className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" 
                        >
                        <Typography sx={{fontStyle: 'sans', fontSize: '12px'}}>Continue</Typography>
                        </Button>                            
                    </form>
                </Box>
                <Box sx={{display: 'flex', marginLeft: 8}}>
                    <Typography sx={{fontStyle: 'sans', fontSize: '12px', marginTop: 1,}}>Already a readitor?</Typography>
                    <Button onClick={handleLoginSwitch} sx={{position: 'absolute', left: 158, marginTop: 0.85, textTransform: 'unset', background: 'none', border: 'none',  padding: 0, fontSize: '12px', fontFamily: 'sans-serif', color: '#069', textDecoration: 'underline', cursor: 'pointer'}}>
                        Log In
                    </Button>
                </Box>
            </>
            :
            <>
                <IconButton className={classes.backButton} size='small' onClick={handleLoginSwitch} ><ArrowBackIcon /></IconButton>
                <Box className={classes.login}>
                    <Typography className={classes.popupTitle} sx={{marginBottom: 0.5, marginTop: 11}}>Create your username and password</Typography>
                    <Typography className={classes.serviceAgreement}>Reddit is anonymous, so your username is what you’ll go by here. Choose wisely—because once you get a name, you can’t change it.</Typography>
                </Box>

                
                <Box className={classes.formContainer} sx={{marginTop: 40}}>
                    <form autoComplete='off' noValidate onSubmit={handleSignUp} >  
                        <TextField className={classes.inputTextSignupFinal} name="username" variant="outlined" label="Username" fullWidth onChange={(e) => setForm({ ...form, userName: e.target.value })} />
                        <TextField className={classes.inputTextSignupFinal} name="password" variant="outlined" label="Password" fullWidth onChange={(e) => setForm({ ...form, password: e.target.value })} />

                        <Button className={classes.buttonSubmit} sx={{marginTop: 0}} variant="contained" color="primary" size="large" type="submit" fullWidth>
                        </Button>                            
                    </form>
                </Box>      
            </>
            }
        </>
        }
        
        </Box>
            
    </Dialog>
    
  )
}

export default LoginSignup