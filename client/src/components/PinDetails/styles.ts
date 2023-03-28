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
  },
  comment: {
    borderRadius: 99,
    height: 50,
    width: '80%',
  },
  searchBar: {
    width: '90%',
    height: 50,
    marginTop: 5,
    borderRadius: 99, 
    border: '1px solid #D3D3D3', 
    backgroundColor: grey[100],
    "& fieldset": { borderRadius: 10 }
  },
}))
