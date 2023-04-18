import { makeStyles } from 'tss-react/mui'
import { grey } from '@mui/material/colors';

export default makeStyles()((theme) => {
  return {
    navbar: {
      position: 'sticky',
      top: 0,
      height: 70,
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'start',
      backgroundColor: 'white', 
      [theme.breakpoints.down(750)]: { 
        position: 'sticky',
        bottom: -2,
        left: 0,
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0px -3px 20px rgba(0, 0, 0, 0.1)',
      }, 
    },
    leftSideContainer: {
      display: 'flex', 
      flexDirection: 'row', 
      height: '100%',
      [theme.breakpoints.down(750)]: { 
        display: 'flex', 
        flexDirection: 'row', 
        height: '100%',
      }, 
    },
    logoButton: {
      position: 'relative', 
      top: 14, 
      left: 10, 
      borderRadius: 99, 
      maxWidth: '40px', 
      maxHeight: '40px',
      minWidth: '40px', 
      minHeight: '40px',
      [theme.breakpoints.down(750)]: { 
        display: 'none'
      }, 
    },
    homeButton: {
      position: 'relative',
      top: 10,
      left: 10,
      borderRadius: 99,
      maxWidth: '70px',
      maxHeight: '50px',
      minWidth: '70px',
      minHeight: '50px',
      [theme.breakpoints.down(750)]: { 
        display: 'none'
      }, 
    },
    createButton: {
      top: 10, 
      marginRight: 2, 
      borderRadius: 99, 
      maxWidth: '500px', 
      maxHeight: '50px', 
      minWidth: '100px', 
      minHeight: '50px',
      [theme.breakpoints.down(750)]: { 
        display: 'none'
      }, 
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
      [theme.breakpoints.down(750)]: { 
        display: 'none'
      }, 
    },
    searchInput: {
      position: 'relative', 
      bottom: 30, 
      left: 40, 
      typography: 'subtitle2', 
      width: '100%', 
      marginLeft: 1, 
      color: grey[600],
      [theme.breakpoints.down(750)]: { 
        position: 'relative', 
        bottom: 30, 
        left: 40, 
        typography: 'subtitle2', 
        width: '100%', 
        marginLeft: 1, 
        color: grey[600],
      }, 
    },
    buttonTypography: {
      variant: 'h6',
      [theme.breakpoints.down(750)]: { 
        variant: 'h6',
      }, 
    },
    buttonList: {
      color: 'black',
      height: '100%',
      borderRadius: 100,
      [theme.breakpoints.down(750)]: { 
        color: 'black',
        height: '100%',
        borderRadius: 100,
      },     
    },
    boxList: {
      paddingLeft: 5,
      radius: 100,
      height: '100%',
      [theme.breakpoints.down(750)]: { 
        paddingLeft: 5,
        radius: 100,
        height: '100%',
      }, 
    },
    profileButton: {
      position: 'relative',
      top: 12, 
      borderRadius: 99, 
      maxWidth: '50px', 
      maxHeight: '50px',
      minWidth: '50px',
      minHeight: '50px',
      [theme.breakpoints.down(750)]: { 
        display: 'none' 
      }, 
    },
    dropDownButton: {
      position: 'relative',
      top: 22, 
      marginRight: 20, 
      borderRadius: 99, 
      maxWidth: '30px', 
      maxHeight: '30px', 
      minWidth: '30px', 
      minHeight: '30px',
      [theme.breakpoints.down(750)]: { 
        display: 'none'
      }, 
    }, 
    dropDownMenu: {
      position: 'relative',
      height: 250, 
      width: 200, 
      borderRadius: 10, 
      backgroundColor: 'white', 
      boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',
      [theme.breakpoints.down(750)]: { 
        position: 'relative',
        height: 250, 
        width: 200, 
        borderRadius: 10, 
        backgroundColor: 'white', 
        boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',
      }, 
    },
    mobileHomeButton: {
      display: 'none',
      [theme.breakpoints.down(750)]: { 
        display: 'block',
        color: grey[600],
        flex: 1,
        
      }, 
    },
    mobileButtonText: {
      fontSize: 12,
      color: grey[600],
      fontFamily: 'sans-serif'
    },
    mobileIconSize: {
      maxWidth: '35px', 
      maxHeight: '35px', 
      minWidth: '35px', 
      minHeight: '35px',
    }
  }
})