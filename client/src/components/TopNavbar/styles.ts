import { makeStyles  } from '@material-ui/core'
import { grey } from '@mui/material/colors';

export default makeStyles((theme) => ({
  navbar: {
    [theme.breakpoints.up(0)]: {    
      position: 'sticky',
      top: 0,
      height: 70,
      zIndex: 2000,
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'start', 
      backgroundColor: 'white', 
    },      
  },
  searchBar: {
    display: 'flex',
    width: '100%',
    height: '65%',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10, 
    borderRadius: 100, 
    border: '1px solid #D3D3D3', 
    backgroundColor: grey[100],

  },
  buttonTypography: {
    variant: 'h6'
  },
  buttonList: {
    color: 'black',
    height: '100%',
    borderRadius: 100,
    
  },
  boxList: {
    paddingLeft: 5,
    radius: 100,
    height: '100%',
  }
}))