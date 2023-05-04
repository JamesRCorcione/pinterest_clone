import { makeStyles } from 'tss-react/mui'
import { grey } from '@mui/material/colors';

export default makeStyles()((theme) => {
  return {
    editProfileContainer: {
        marginTop: 0, 
        marginBottom: 0, 
        display: 'flex',   
        flexDirection: 'column',      
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 25, 
        minHeight: 600, 
        height: 'auto',
        width: 300, 
        backgroundColor: 'white',
        boxShadow: '4px 4px 4px 3px rgba(0, 0, 0, 0.2)', 
    },
    imageSection: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      marginLeft: 5,
      marginRight: 5,
    },
    detailSection: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'space-between',
      height: '80%',
      width: '80%',
    },
    usernameInput: {
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
    inputPassword: {
      borderRadius: '30px',
      marginBottom: 3,          
      height: 50,
      width: '100%',
      backgroundColor: 'white',
      border: `1px solid ${grey[400]}`, 
      borderColor: grey[300],
      '& .MuiFilledInput-input': {
        fontStyle: 'sans', fontSize: '13px', fontWeight: 'bold', color: 'black', marginBottom: 8
      },
      '&:hover': {
        backgroundColor: 'white',
      },
    },
    imageDropBox: {
      [theme.breakpoints.up(750)]: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '175px',
        height: '175px',
        padding: 5,
        marginBottom: 1,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 99,
        color: 'grey',
      },
      [theme.breakpoints.down(750)]: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '175px',
        height: '175px',
        padding: 5,
        marginBottom: 1,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 99,
        color: 'grey',
      },
    }
  }
})