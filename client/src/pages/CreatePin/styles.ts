import { makeStyles } from 'tss-react/mui'
import { grey } from '@mui/material/colors';

export default makeStyles()((theme) => {
  return {
    background: {
      [theme.breakpoints.up(750)]: {
        display: 'flex', 
        position: 'relative',
        justifyContent: 'center', 
        alignItems: 'start', 
        overflowY: 'hidden',
        paddingTop: 80,
        height: '100vh',
        backgroundColor: grey[300]
      },
      [theme.breakpoints.down(750)]: {
        display: 'flex', 
        position: 'relative',
        justifyContent: 'center', 
        alignItems: 'start', 
        overflowY: 'hidden',
        paddingTop: 10,
        height: '100%',
        backgroundColor: grey[300]
      }
    },
    createPinContainer: {
      [theme.breakpoints.up(750)]: {
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
      [theme.breakpoints.down(750)]: {
        paddingBottom: 100, 
        display: 'flex',         
        flexDirection: 'column',         
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 25, 
        minHeight: 700, 
        width: 800, 
        backgroundColor: 'white'
      }
    },
    imageSection: {
      [theme.breakpoints.up(750)]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        marginLeft: 5,
        marginRight: 5,
      },
      [theme.breakpoints.down(750)]: {
        paddingTop: 10
      }
    },
    detailSection: {
      [theme.breakpoints.up(750)]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        height: '80%',
        width: '100%',
        marginLeft: 5,
        marginRight: 50,
      },
      [theme.breakpoints.down(750)]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        height: '80%',
        width: '80%',

      }
    }
  }
})