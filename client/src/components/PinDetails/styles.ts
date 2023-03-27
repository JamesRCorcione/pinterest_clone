import { makeStyles  } from '@material-ui/core'
import { grey } from '@mui/material/colors';

export default makeStyles((theme) => ({
  image: {
    width: '100%',
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    objectFit: 'cover',
    '&:hover': {
      backgroundColor: 'blue',
      opacity: 20,
    }
  }
}))
