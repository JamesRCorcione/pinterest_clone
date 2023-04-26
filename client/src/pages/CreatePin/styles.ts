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
        overflowY: 'hidden',
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 5, 
        height: 600, 
        width: 800, 
        backgroundColor: 'white'
    }
  }
})