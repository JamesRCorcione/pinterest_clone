import { makeStyles } from 'tss-react/mui'
import { red, grey } from '@mui/material/colors';

export default makeStyles()((theme) => {
  return {
  // Defines the popup box and exit button; It doesn't change between menues
      dialog: {
        position: 'absolute',
        '& .MuiDialog-paper': {
          borderRadius: 12
        },
      },   
      popup: {
        width: 400,
        height: 640,        
        [theme.breakpoints.down(800)]: { 
          width: 300,
          height: 640,     
        },
      }, 
      exitButton: {
        position: 'absolute',
        top: 15,
        left: 15,
        borderRadius: 0,
        '&:hover': {
          backgroundColor: 'grey'
        }
      },
      backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        borderRadius: 0,
        '&:hover': {
          backgroundColor: 'grey'
        }
      },

  //These are Text and Button styles that wont change between the menus
      popupTitle: {        
        fontSize: 20,     
        marginBottom: 0.5, 
        marginTop: 11,
        [theme.breakpoints.down(800)]: {
          marginBottom: 0.5, 
          marginTop: 5,
        }  
      },
      serviceAgreement : {
        fontSize: 12,        
        fontStyle: 'sans'
      },
      externalLogin: {
        display: 'grid',
        marginLeft: '15%',
        marginRight: '15%',
      },
      formContainer: {
        display: 'grid',
        marginLeft: '15%',
        marginRight: '15%',        
      }, 
      inputTextLogin: {
        borderRadius: '30px',
        marginBottom: 3,          
        height: 50,
        backgroundColor: 'white',
        border: 1,
        borderColor: grey[300],
        '&:hover': {
          backgroundColor: 'white',
        },
        '& label': {
          fontStyle: 'sans', fontSize: '13px', fontWeight: 'bold'
        },
        '& input': {
          marginBottom: 3,          
        },
        '& fieldset': {
          borderRadius: '30px',
          marginBottom: 3,          
          height: 50
        },
      }, 
      inputTextSignup: {
        '& label': {
          fontStyle: 'sans', fontSize: '13px', fontWeight: 'bold'
        },
        '& input': {
          marginBottom: 15,          
        },
        '& fieldset': {
          borderRadius: '30px',
          marginBottom: 15,          
          height: 50
        },
      }, 
      inputTextSignupFinal: {
        '& label': {
          fontStyle: 'sans', fontSize: '13px', fontWeight: 'bold'
        },
        '& input': {
          marginBottom: 3,          
        },
        '& fieldset': {
          borderRadius: '30px',
          marginBottom: 3,          
          height: 50
        },
      }, 

  // These styles are only used for the Sign Up menu  
      fileInput: {
        width: '97%',
        margin: '10px 0',        
      },
      buttonSubmit: {
        backgroundColor: red[700],
        marginBottom: 10,
        borderRadius: 99,
        height: 40,
        
      },
      googleButton: {
        marginBottom: 10,        
      },      
      
      signup: {
        color: 'black',
        position: 'absolute',
        top: 115,
        paddingLeft: 60,
        paddingRight: 70,
      },
      login: {
        color: 'black',
        position: 'absolute',
        justifyContent: 'stretch',
        top: 70,
        paddingLeft: 60,
        paddingRight: 64,
      },


  //Mobile fixes
  googleLoginText: {
    color: '#3b5998', fontWeight: 'bold', fontSize: 14,
    [theme.breakpoints.down(800)]: { 
      color: '#3b5998', fontWeight: 'bold', fontSize: 12, marginLeft: 0
    }
  },
  googleLoginIcon: {
    position: 'relative',
    left: -22,
    [theme.breakpoints.down(800)]: { 
      position: 'relative',
      left: -10,
    }
  },
  userNameLink: {
    position: 'absolute', 
    left: 122, 
    marginTop: 6.5, 
    textTransform: 'unset', 
    background: 'none', 
    border: 'none',  
    padding: 0, 
    fontSize: '12px', 
    fontFamily: 'sans-serif',
    color: '#069', 
    textDecoration: 'underline', 
    cursor: 'pointer',
    [theme.breakpoints.down(800)]: { 
      position: 'absolute', 
      left: 106, 
      marginTop: 6.75, 
      textTransform: 'unset', 
      background: 'none', 
      border: 'none',  
      padding: 0, 
      fontSize: '12px', 
      fontFamily: 'sans-serif',
      color: '#069', 
      textDecoration: 'underline', 
      cursor: 'pointer',
    }
  },
  passwordLink: {
    position: 'absolute', 
    left: 195, 
    marginTop: 6.5, 
    textTransform: 'unset', 
    background: 'none', 
    border: 'none',  
    padding: 0, 
    fontSize: '12px', 
    fontFamily: 'sans-serif', 
    color: '#069', 
    textDecoration: 'underline', 
    cursor: 'pointer',
    [theme.breakpoints.down(800)]: { 
      position: 'absolute', 
      left: 180,
      marginTop: 6.5, 
      textTransform: 'unset', 
      background: 'none', 
      border: 'none',  
      padding: 0, 
      fontSize: '12px', 
      fontFamily: 'sans-serif', 
      color: '#069', 
      textDecoration: 'underline', 
      cursor: 'pointer',
    }
  },


}})