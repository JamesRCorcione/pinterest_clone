import { makeStyles } from 'tss-react/mui'
import { grey } from '@mui/material/colors';

export default makeStyles()((theme) => {
  return {
    background: {
        display: 'flex', 
        position: 'relative',
        justifyContent: 'center', 
        alignItems: 'start', 
        overflowY: 'hidden',
        paddingTop: 80,
        height: '100vh',
        backgroundColor: grey[300]
    },
    createPinContainer: {
        marginTop: 5, 
        marginBottom: 10, 
        display: 'flex',         
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 25, 
        minHeight: 600, 
        height: 'auto',
        width: 800, 
        backgroundColor: 'white'
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
      width: '100%',
      marginTop: 100,
      marginLeft: 5,
      marginRight: 50,
    }
  }
})