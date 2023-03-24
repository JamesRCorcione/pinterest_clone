import { makeStyles  } from '@material-ui/core'
import { grey } from '@mui/material/colors';

export default makeStyles((theme) => ({
  pin: {
    display: 'flex',    
    '&:hover': {
      transition: 1,
      left: 0
    }
  },
}))

