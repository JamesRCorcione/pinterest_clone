import { makeStyles  } from '@material-ui/core'
import { grey, red } from '@mui/material/colors';

export default makeStyles((theme) => ({
  pin: {
    display: 'flex',  
    //marginTop: 80, 
    width: '100%',
    paddingTop: 80,
    paddingBottom: 70,
    '&:hover': {
      //transition: 1,
      //left: 0
    },
    [theme.breakpoints.down(750)]: { 
      paddingTop: 5,
  }
  },
  loading: {
    [theme.breakpoints.up(750)]: {
      position: 'fixed', top: 66, width: '100%', color: red[800], zIndex: 3000,
    },
    [theme.breakpoints.down(750)]: {
      position: 'fixed',
      bottom: 66,
      width: '100%',
      color: red[800],
      zIndex: 3000,
      
    }
  }
}))

