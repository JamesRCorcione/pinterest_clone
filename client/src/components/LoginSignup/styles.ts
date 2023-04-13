import { makeStyles } from '@material-ui/core'
import { red } from '@mui/material/colors'

export default makeStyles((theme) => ({
  // Defines the popup box and exit button; It doesn't change between menues
      dialog: {
        position: 'absolute',
        '& .MuiDialog-paper': {
          borderRadius: 12
        }              
      },   
      popup: {
        width: 400,
        height: 640,        
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
      
}))