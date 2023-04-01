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
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 10,
    height: 'auto',
    width: 'auto',
    cursor: "pointer",
  },
  image: {
    overflow: 'hidden',
    objectFit: 'cover',
    backgroundColor: 'black',
    opacity: .6
  },
  imageOp: {
    overflow: 'hidden',
    objectFit: 'cover',   
  },
  bottomButtons: {
    backgoundColor: 'pink',
    '&:hover': {
      backgroundColor: grey[100]
    }
  }
}))

