import { makeStyles  } from '@material-ui/core'
import { grey } from '@mui/material/colors';

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
}))

