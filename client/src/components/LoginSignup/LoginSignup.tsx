import { Box, Button, TextField, Typography, Link, Divider, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FacebookSignIn, FacebookSignUp, GoogleSignIn, GoogleSignUp, SignIn, SignUp } from '../../features/usersSlice'
import FacebookLogin from 'react-facebook-login';
import { grey, red } from '@mui/material/colors'

import useStyle from './styles'
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';




const LoginSignup = ({ isSignUp, setOpenLogin }:any) => {
    const classes = useStyle()
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const [form, setForm] = useState<IUser>({ userName: '', email: '', password: '', image: '', birthday: null, saves: [] })
    const [loading, setLoading] = useState(false)
    const [switchLogin, setSwitchLogin] = useState<boolean>(isSignUp)
    const [switchSignup, setSwitchSignup] = useState<boolean>(true)

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('start hi')

        try {
            await dispatch(SignUp(form)).unwrap()
            setForm({
              userName: '',
              email: '',
              password: '',
              image: '',
              birthday: null,
              saves: []
            })
            handleSuccessfulExit()              
        } catch (error:any) {
            alert(error.message)
            setForm({
                userName: '',
                email: '',
                password: '',
                image: '',
                birthday: null,
                saves: []
              })
            handleUnsuccessfulExit()
        }  
    }

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true)
        try {
            await dispatch(SignIn(form)).unwrap()
            setForm({
              userName: '',
              email: '',
              password: '',
              image: '',
              birthday: null,
              saves: []
            })
            handleSuccessfulExit()              
        } catch (error:any) {
            alert(error.message)
            setForm({
                userName: '',
                email: '',
                password: '',
                image: '',
                birthday: null,
                saves: []
              })
            handleUnsuccessfulExit()
        }  
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async response => {
          const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo' ,
          { headers: { Authorization: `Bearer ${response.access_token}` } }
          )

          const user = userInfo.data

          try {
            if (!switchLogin) {
                setLoading(true)
                try {
                    await dispatch(GoogleSignUp(user)).unwrap()
                    handleSuccessfulExit()
                } catch (error:any) {
                    alert(error.message)
                    handleUnsuccessfulExit()
                }
            } else {
                setLoading(true)
                try {
                    await dispatch(GoogleSignIn(user)).unwrap()
                    handleSuccessfulExit()
                } catch (error:any) {
                    alert(error.message)
                    handleUnsuccessfulExit()
                }
            }            
          } catch (error:any) {
            alert(error.message)
            console.log(error)
          }
        },
        onError: () => console.log("Login Failed")
    })

    const loginWithFacebook = async (response: any) => {
        setLoading(true)
        try {
            await dispatch(FacebookSignIn(response)).unwrap()
            handleSuccessfulExit() 
        } catch (error:any) {
            alert(error.message)
            handleUnsuccessfulExit()        
        }
    }

    const signupWithFacebook = async (response: any) => {
        setLoading(true)
        try {
            await dispatch(FacebookSignUp(response)).unwrap()
            handleSuccessfulExit()
        } catch (error:any) {
            alert(error.message)
            handleUnsuccessfulExit()
        }
    }

    const handleSuccessfulExit = async () => {
        setOpenLogin((openLogin:boolean) => !openLogin)        
        setLoading(false)
        navigate('/')  
    }

    const handleUnsuccessfulExit = async () => {
        setOpenLogin((openLogin:boolean) => !openLogin)        
        setLoading(false)
        navigate('/login')  
    }

    const handleLoginSwitch = () => {
        setSwitchLogin((switchLogin) => !switchLogin)
    }

    const handleSignupSwitch = () => {
        setSwitchSignup((switchSignup) => !switchSignup)
    }

    const handleClose = () => {
        setOpenLogin(false)
    }

    if (loading) return ( <Spinner message={'Siging in!'} />)

  return (
    <Dialog className={classes.dialog} onClose={handleClose} open={true} >     
        <Box className={classes.popup}>   
        <IconButton className={classes.exitButton} size='small' onClick={() => handleClose()} ><CloseIcon /></IconButton>
        {switchLogin 
        ?
        <>
            <Box className={classes.login}>
                <Typography className={classes.popupTitle} sx={{marginBottom: 0.5}}>Log In</Typography>
                <Typography className={classes.serviceAgreement}>By continuing, you are setting up a Pinterest Clone account and agree to our <Link>User Agreement</Link> and <Link>Privacy Policy</Link>.</Typography>
            </Box>
            <Box className={classes.externalLogin} sx={{marginTop: 23}}>
                <Button 
                    onClick={() => googleLogin()}
                    sx={{backgroundColor: "white", borderColor: 'grey', border: 1, borderRadius: 10, height: 42}}
                    className={classes.googleButton}
                >
                    <FcGoogle
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 20,
                      }}
                        size="20px"
                    /> 
                    <Typography sx={{color: '#3b5998', fontWeight: 'bold', fontSize: 14, }}>Log in with Google</Typography>
                </Button>                            
                <FacebookLogin
                    appId={'772299484215013'}
                    fields="name,email,picture"
                    callback={loginWithFacebook}
                    icon={<FaFacebook style={{position: 'relative', left: -22, top: 5 }} size="20px" />}
                    onFailure={(err) => {
                    console.log("FB LOGIN ERROR:", err);
                    }}
                    containerStyle={{
                    backgroundColor: "#3b5998",
                    borderColor: "#3b5998",
                    display: "flex",
                    color: "#fff",
                    cursor: "pointer",
                    marginBottom: 3,
                    borderRadius: 99,
                    marginTop: 10,
                    
                    }}
                    buttonStyle={{
                    position: 'relative',
                    bottom: 10,
                    textTransform: "none",
                    height: 42,
                    background: "none",
                    border: "none",
                    fontSize: 14,
                    marginLeft: 20
                    }}
                    textButton='LOG IN WITH FACEBOOK'
                />                          
            </Box>
            <Divider sx={{paddingTop: 1.7, margin: 'auto', width: '70%', color: 'grey'}}>
                <Typography sx={{fontStyle: 'sans', fontSize: '12px'}}>OR</Typography>
            </Divider>

            
            <Box className={classes.formContainer} sx={{marginTop: 3}}>
                <form autoComplete='off' noValidate >  
                    <TextField className={classes.inputTextLogin} name="username" variant="outlined" label="Username" fullWidth onChange={(e) => setForm({ ...form, userName: e.target.value })} />
                    <TextField className={classes.inputTextLogin} name="password" variant="outlined" type='password' label="Password" fullWidth onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    
                    
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


                    <Button onClick={handleSignIn} className={classes.buttonSubmit} sx={{borderRadius: 99, marginTop: 3, backgroundColor: red[700], '&:hover': { backgroundColor: red[900] }}} variant="contained" color="primary" size="large" type="submit" fullWidth>
                    <Typography sx={{fontStyle: 'sans', fontSize: '12px', textTransform: 'unset'}}>Log In</Typography>
                    </Button>                            
                </form>
            </Box>
            <Box sx={{display: 'flex', marginLeft: 8, marginTop: 0.5}}>
                <Typography sx={{fontStyle: 'sans', fontSize: '12px', marginTop: 1,}}>New to Pinterest Clone?</Typography>
                <Button onClick={handleLoginSwitch} sx={{position: 'absolute', left: 200, marginTop: 0.75, textTransform: 'unset', minWidth: 50, maxWidth: 50, background: 'none', border: 'none',  padding: 0, fontSize: '12px', fontFamily: 'sans-serif', color: '#069', textDecoration: 'underline', cursor: 'pointer'}}>
                    Sign Up
                </Button>
            </Box>        
        </>
        :
        <>
           {switchSignup ?
            <>
                <Box className={classes.signup}>
                    <Typography className={classes.popupTitle} sx={{marginBottom: 0.5}}>Sign Up</Typography>
                    <Typography className={classes.serviceAgreement}>By continuing, you are setting up a Pinterest Clone account and agree to our <Link>User Agreement</Link> and <Link>Privacy Policy</Link>.</Typography>
                </Box>
                <Box className={classes.externalLogin} sx={{marginTop: 28.5,}}>
                    <Button 
                        onClick={() => googleLogin()}
                        sx={{backgroundColor: "white", borderColor: 'grey', border: 1, borderRadius: 10, height: 42}}
                        className={classes.googleButton}
                    >
                        <FcGoogle
                        style={{
                            position: 'absolute',
                            top: 10,
                            left: 20,
                        }}
                            size="20px"
                        /> 
                        <Typography sx={{color: '#3b5998', fontWeight: 'bold', fontSize: 14, }}>Sign up with Google</Typography>
                    </Button>                            
                    <FacebookLogin
                        appId={'772299484215013'}
                        fields="name,email,picture"
                        callback={signupWithFacebook}
                        icon={<FaFacebook style={{position: 'relative', left: -22, top: 5 }} size="20px" />}
                        onFailure={(err) => {
                        console.log("FB LOGIN ERROR:", err);
                        }}
                        containerStyle={{
                        backgroundColor: "#3b5998",
                        borderColor: "#3b5998",
                        display: "flex",
                        color: "#fff",
                        cursor: "pointer",
                        marginBottom: 3,
                        borderRadius: 99,
                        marginTop: 10,
                        
                        }}
                        buttonStyle={{
                        position: 'relative',
                        bottom: 10,
                        textTransform: "none",
                        height: 42,
                        background: "none",
                        border: "none",
                        fontSize: 14,
                        marginLeft: 20
                        }}
                        textButton='SIGN UP WITH FACEBOOK'
                    /> 

                </Box>
                <Divider sx={{paddingTop: 2.5, margin: 'auto', width: '70%', color: 'grey'}}>
                    <Typography sx={{fontStyle: 'sans', fontSize: '12px'}}>OR</Typography>
                </Divider>
                <Box className={classes.formContainer} sx={{marginTop: 4}} >
                    <form autoComplete='off' >  
                        <TextField className={classes.inputTextSignup} name="email" variant="outlined" label="Email" fullWidth onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        <Button 
                            sx={{borderRadius: 99, width: '100%', backgroundColor: red[700], '&:hover': { backgroundColor: red[900]}}}
                            onClick={handleSignupSwitch} className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" 
                        >
                        <Typography sx={{fontStyle: 'sans', fontSize: '12px'}}>Continue</Typography>
                        </Button>                            
                    </form>
                </Box>
                <Box sx={{display: 'flex', marginLeft: 8}}>
                    <Typography sx={{fontStyle: 'sans', fontSize: '12px', marginTop: 1,}}>Already have an  Account?</Typography>
                    <Button onClick={handleLoginSwitch} sx={{position: 'absolute', left: 210, marginTop: 0.85, textTransform: 'unset', minWidth: 40, maxWidth: 40, background: 'none', border: 'none',  padding: 0, fontSize: '12px', fontFamily: 'sans-serif', color: '#069', textDecoration: 'underline', cursor: 'pointer'}}>
                        Log In
                    </Button>
                </Box>
            </>
            :
            <>
                <IconButton className={classes.backButton} size='small' onClick={handleSignupSwitch} ><ArrowBackIcon /></IconButton>
                <Box className={classes.login}>
                    <Typography className={classes.popupTitle} sx={{marginBottom: 0.5, marginTop: 11}}>Create your username and password</Typography>
                    <Typography className={classes.serviceAgreement}>Choose wisely—because once you get a username, you can’t change it.</Typography>
                </Box>
                
                <Box className={classes.formContainer} sx={{marginTop: 35}}>
                    <form autoComplete='off' noValidate onSubmit={handleSignUp} >  
                        <TextField className={classes.inputTextSignupFinal} name="username" variant="outlined" label="Username" fullWidth onChange={(e) => setForm({ ...form, userName: e.target.value })} />
                        <TextField className={classes.inputTextSignupFinal} name="password" variant="outlined" type='password' label="Password" fullWidth onChange={(e) => setForm({ ...form, password: e.target.value })} />

                        <Button  sx={{borderRadius: 10, height: 40, marginTop: 0, backgroundColor: red[700], '&:hover': { backgroundColor: red[900] }}} variant="contained" color="primary" size="large" type="submit" fullWidth>
                            <Typography sx={{fontStyle: 'sans', fontSize: '14px'}}>Sign Up</Typography>
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