import { Box, Button, TextField, Typography, Link, Divider, IconButton, InputAdornment, FilledInput } from '@mui/material'
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

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';




const LoginSignup = ({ isSignUp, setOpenLogin }:any) => {
    const { classes } = useStyle()
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const [form, setForm] = useState<IUser>({ userName: '', email: '', password: '', image: '', birthday: null, saves: [] })
    const [loading, setLoading] = useState<boolean>(false)
    const [switchLogin, setSwitchLogin] = useState<boolean>(isSignUp)
    const [switchSignup, setSwitchSignup] = useState<boolean>(true)

    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => setShowPassword(!showPassword)

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

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
          setLoading(true)
          try {
            if (!switchLogin) {                
                try {
                    await dispatch(GoogleSignUp(user)).unwrap()
                    handleSuccessfulExit()
                } catch (error:any) {
                    alert(error.message)
                    handleUnsuccessfulExit()
                }
            } else {
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
          }
        },
        onError: () => alert('Login Failed')
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

    const renderFacebookButton = ({message, iconOffset, textOffset, textSize}:any) => (
        <FacebookLogin
            appId={'772299484215013'}
            fields="name,email,picture"
            callback={loginWithFacebook}
            icon={<FaFacebook style={{position: 'relative', left: iconOffset, top: 5 }} size="20px" />}
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
            fontSize: textSize,
            marginLeft: textOffset
            }}
            textButton={message}
        /> 
    )

  return (
    <>
    {loading ?
    
    <Dialog open={true}>
        <Circles color="#00BFFF" height={100} width={100}></Circles>
    </Dialog>     
    :
    <Dialog className={classes.dialog} onClose={handleClose} open={true} >     
        <Box className={classes.popup}>   
        <IconButton className={classes.exitButton} size='small' onClick={() => handleClose()} ><CloseIcon /></IconButton>
        {switchLogin 
        ?
        <>
            <Box className={classes.login}>
                <Typography className={classes.popupTitle} sx={{marginBottom: 0.5}}>Log In</Typography>
                <Typography className={classes.serviceAgreement}>By continuing, you are setting up a Pinterest Clone account and agree to our <Link href={'#/agreementAndPolicy'}>User Agreement</Link> and <Link href={'/#/agreementAndPolicy'}>Privacy Policy</Link>.</Typography>
            </Box>
            <Box className={classes.externalLogin} sx={{marginTop: 23}}>
                <Button 
                    onClick={() => googleLogin()}
                    sx={{backgroundColor: "white", borderColor: 'grey', border: 1, borderRadius: 10, height: 42}}
                    className={classes.googleButton}
                >
                    <FcGoogle
                        className={classes.googleLoginIcon}
                        size="20px"
                    /> 
                    <Typography className={classes.googleLoginText}>Log in with Google</Typography>
                </Button>

                {/* Not Ideal, but it works. A mobile and desktop view below for Facebook Login Button */}
                {window.innerWidth <= 750 ?     
                    renderFacebookButton({message:'LOG IN WITH FACEBOOK', iconOffset: -5, textOffset: 4, textSize: 12})  
                :
                    renderFacebookButton({message:'LOG IN WITH FACEBOOK', iconOffset: -12, textOffset: 20, textSize: 14})                      
                }

            </Box>
            <Divider sx={{paddingTop: 1.7, margin: 'auto', width: '70%', color: 'grey'}}>
                <Typography sx={{fontStyle: 'sans', fontSize: '12px'}}>OR</Typography>
            </Divider>

            
            <Box className={classes.formContainer} sx={{marginTop: 3}}>
                <form autoComplete='off' noValidate >  
                    <TextField className={classes.inputTextLogin} name="username" variant="outlined" label="Username" fullWidth onChange={(e) => setForm({ ...form, userName: e.target.value })} />
                    <FilledInput 
                        className={classes.inputTextLogin} 
                        name="password" 
                        fullWidth 
                        disableUnderline
                        type={showPassword ? 'text' : 'password'} 
                        endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleShowPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                        }
                        onChange={(e:any) => setForm({ ...form, password: e.target.value })} 
                    />
                    

                    {/* Password and Username recovery. Will implement correctly at a later date */}
                    {false &&
                    <Box sx={{display: 'flex', marginTop: 0.5}}>
                        <Typography sx={{fontStyle: 'sans', fontSize: '12px', marginTop: 1,}}>Forgot your</Typography>
                        <Button onClick={() => {}} className={classes.userNameLink}>
                            username
                        </Button>
                        <Typography sx={{fontStyle: 'sans', fontSize: '12px', marginTop: 1, marginLeft: 7.75}}>or</Typography>
                        <Button onClick={() => {}} className={classes.passwordLink}>
                            password
                        </Button>
                        <Typography sx={{fontStyle: 'sans', fontSize: '12px', marginTop: 1, marginLeft: 7.75}}>?</Typography>
                    </Box>
                    }


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
                    <Typography className={classes.serviceAgreement}>By continuing, you are setting up a Pinterest Clone account and agree to our <Link href={'/#/agreementAndPolicy'}>User Agreement</Link> and <Link href={'/#/agreementAndPolicy'}>Privacy Policy</Link>.</Typography>
                </Box>
                <Box className={classes.externalLogin} sx={{marginTop: 28.5,}}>
                    <Button 
                        onClick={() => googleLogin()}
                        sx={{backgroundColor: "white", borderColor: 'grey', border: 1, borderRadius: 10, height: 42}}
                        className={classes.googleButton}
                    >
                        <FcGoogle
                        className={classes.googleLoginIcon}
                            size="20px"
                        /> 
                        <Typography className={classes.googleLoginText}>Sign up with Google</Typography>
                    </Button>                            
                    {window.innerWidth <= 750 ?     
                        renderFacebookButton({message:'SIGN UP WITH FACEBOOK', iconOffset: -2, textOffset: -4, textSize: 12})  
                    :
                        renderFacebookButton({message:'SIGN UP WITH FACEBOOK', iconOffset: -12, textOffset: 20, textSize: 14})                      
                    } 
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
                    <Typography className={classes.popupTitle}>Create your username and password</Typography>
                    <Typography className={classes.serviceAgreement}>Choose wisely—because once you get a username, you can’t change it.</Typography>
                </Box>
                
                <Box className={classes.formContainer} sx={{marginTop: 35}}>
                    <form autoComplete='off' noValidate onSubmit={handleSignUp}>  
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
    }
    </>
  )
}

export default LoginSignup