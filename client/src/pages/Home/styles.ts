import { makeStyles  } from '@material-ui/core'
import { grey } from '@mui/material/colors';

export default makeStyles((theme) => ({
  navbar: {
    [theme.breakpoints.up(0)]: {    
      position: 'sticky',
      top: 0,
      zIndex: 2000,
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'start', 
      backgroundColor: 'white', 
      height: 50, 
    },      
  },
}))

