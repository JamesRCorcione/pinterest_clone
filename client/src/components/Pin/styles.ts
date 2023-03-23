import { makeStyles  } from '@material-ui/core'
import { grey } from '@mui/material/colors';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    minWidth: '250px',
    maxWidth: '400px',
    padding:10,
    '&:hover': {
    }
  },
  image: {
    maxWidth: '250px',
    overflow: 'hidden',
    objectFit: 'cover'
  }
}))

