import { makeStyles } from 'tss-react/mui'
import { grey } from '@mui/material/colors';

export default makeStyles()((theme) => {
  return {
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
  leftSideContainer: {
    display: 'flex', flexDirection: 'row', height: '100%'
  },
  logoButton: {
    position: 'relative', top: 14, left: 10, borderRadius: 99, maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'
  },
  homeButton: {
    position: 'relative', 
    top: 10, 
    left: 10, 
    borderRadius: 99, 
    maxWidth: '70px', 
    maxHeight: '50px', 
    minWidth: '70px', 
    minHeight: '50px'
  },
  createButton: {
    top: 10, marginRight: 2, borderRadius: 99, maxWidth: '500px', maxHeight: '50px', minWidth: '100px', minHeight: '50px'
  },
  searchBar: {
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
}
})