import { makeStyles  } from '@material-ui/core'
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';

export default makeStyles((theme) => ({
  container: {
    backgroundColor: grey[100],
    overflowX: 'hidden',
  },
  video: {
    backgroundColor: 'black',
    background: 'black',
    position: 'absolute',
    overflowX: 'hidden',
    bottom: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
}))