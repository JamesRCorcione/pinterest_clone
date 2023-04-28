import { makeStyles } from 'tss-react/mui'
import { grey, red } from '@mui/material/colors';

export default makeStyles()((theme) => {
  return {
    container: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: 'black',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 5,
      marginTop: 10,
      borderRadius: 10,
      height: '100px',
      width: '100px',
      cursor: "pointer",
      [theme.breakpoints.down(750)]: { 
        
      },
    },
    image: {
      overflow: 'hidden',
      objectFit: 'cover',
      backgroundColor: 'black',
      opacity: .6,
      height: '100px',
      width: '100px',
    },
    onHoverImageContainer: {
      position: 'absolute', 
      top:0, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      width: '100%', 
      height: '100%',
      [theme.breakpoints.down(750)]: { 
        display: 'none'
      }
    },
    saveButtonContainer: {
      display: 'flex', alignItems: 'center', justifyItems: 'justify-between'
    },
    savedButton: {
      position: 'absolute', 
      top: 10,
      right: 10,
      borderRadius: 99,
      minHeight: 40,
      maxHeight: 40,
      minWidth: 70,
      maxWidth: 70,
      backgroundColor: 'black',
    },
    saveButton: {
      position: 'absolute', 
      top: 10, 
      right: 10, 
      borderRadius: 99, 
      minHeight: 40, 
      maxHeight: 40, 
      minWidth: 70, 
      maxWidth: 70, 
      backgroundColor: red[600],
      '&:hover': {
        backgroundColor: red[800]
      }
    },
    htmlLinkButton: {
      '&:hover': { backgroundColor: grey[100], opacity: 1}, minHeight: 30, maxHeight: 30, minWidth: 90, maxWidth: 120, borderRadius: 99, position: 'absolute', bottom: 15, left: 10, backgroundColor: grey[200], opacity: 0.9
    },
    moreActionsButton: {
      '&:hover': { backgroundColor: grey[100], opacity: 1}, minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30, backgroundColor: grey[200], borderRadius: 99, position: 'absolute', bottom: 15, right: 60, opacity: 0.9 
    },
    imageOp: {
      overflow: 'hidden',
      objectFit: 'cover', 
      width: '100px',
      height: '100px'  
    },
    shareImageButton: {
      '&:hover': { 
        backgroundColor: grey[100], 
        opacity: 1
      }, 
      minHeight: 30, 
      maxHeight: 30, 
      minWidth: 30, 
      maxWidth: 30, 
      backgroundColor: grey[200], 
      borderRadius: 99, 
      position: 'absolute', 
      bottom: 15, 
      right: 15, 
      opacity: 0.9
    },
    mobileButtonContainer: {
      display: 'none',
      [theme.breakpoints.down(750)]: { 
        display: 'block',
        position: 'relative', 
        paddingTop: 2,
      },
    },   
    mobileActionMoreButton: {
      display: 'none',
      [theme.breakpoints.down(750)]: { 
        display: 'block',
        minHeight: 40, 
        maxHeight: 40, 
        minWidth: 40, 
        maxWidth: 40, 
        backgroundColor: grey[200], 
        borderRadius: 99, 
        position: 'absolute', 
        bottom: 15, 
        right: 15, 
        opacity: 0.9
      },
    },
    mobileActionMenu: {
      position: 'absolute', 
      bottom: 70,
      right: 15,
      width: 120, 
      borderRadius: 10, 
      boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)', 
      backgroundColor: 'white'
    },
  }
})

