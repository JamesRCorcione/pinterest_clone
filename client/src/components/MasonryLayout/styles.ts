import { makeStyles  } from '@material-ui/core'
import { grey } from '@mui/material/colors';

export default makeStyles((theme) => ({
  pin: {
    display: 'flex',  
    //marginTop: 80, 
    marginX: 'auto', 
    '&:hover': {
      transition: 1,
      left: 0
    },
  },
}))

