import { makeStyles  } from '@material-ui/core'
import { grey } from '@mui/material/colors';

export default makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    //minWidth: '250px',
    //maxWidth: '250px',
    margin:10,
    borderRadius: 10,
    height: 'auto',
    width: 'auto',
    '&:hover': {
      backgroundColor: 'blue',
      opacity: 20
    }
  },
  image: {
    height: 'auto',
    overflow: 'hidden',
    objectFit: 'cover',
    '&:hover': {
      backgroundColor: 'blue',
      opacity: 20,
    }
  }
}))

