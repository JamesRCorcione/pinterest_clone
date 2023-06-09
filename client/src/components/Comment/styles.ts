import { makeStyles } from 'tss-react/mui'
import { grey, red } from '@mui/material/colors';

export default makeStyles()((theme) => {
  return {
    pinContainer: {
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginY: 2, 
      width: '100%',
      height: 'auto',
      paddingTop: 80,
      [theme.breakpoints.down(750)]: { 
        width: '100%',
        paddingTop: 10,
      }
    },
    imageContainer: {
      display: 'flex', 
      borderRadius: 40, 
      boxShadow: '4px 4px 4px 3px rgba(0, 0, 0, 0.2)', 
      width: 800, 
      height: 'auto',
      [theme.breakpoints.down(750)]: { 
        display: 'flex', 
        flexDirection: 'column',
        width: '90%',
        height: 'auto',
      }
    },
    image: {
      width: 400,
      height: '100%',
      borderTopLeftRadius: 40,
      borderBottomLeftRadius: 40,
      objectFit: 'cover',
      [theme.breakpoints.down(750)]: { 
        display: 'none',
      }
    },
    mobileImage: {
      display: 'none',
      [theme.breakpoints.down(750)]: { 
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        width: '100%',
        height: 'auto',
        borderRadius: 40,
      }
    },    
    topButtonsContainer: {
      display: 'flex', width: '100%',// paddingBottom: 50,
      [theme.breakpoints.down(750)]: { 
        display: 'none'
        
      }
    },
    topButtonsMobileContainer: {
      display: 'none',
      [theme.breakpoints.down(750)]: { 
        display: 'block',
        position: 'relative', 
        width: '100%',
        paddingBottom: 40     
      }
    },
    saveButtonContainer: {
      position: 'relative', top: 20, left: 215,
      [theme.breakpoints.down(750)]: { 
        position: 'absolute', right: 0, top: 15
      }
    },
    savedButton: {
      borderRadius: 99, 
      minHeight: 40, 
      maxHeight: 40, 
      minWidth: 70, 
      maxWidth: 70,
      backgroundColor: 'black',
    },
    saveButton: {
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
    commentSectionContainer: {
      display: 'flex',
      flexDirection: 'column', 
      position: 'relative',
      flex: 'wrap', 
      maxHeight: '92vh',    
      width: 400,
      [theme.breakpoints.down(750)]: { 
        width: '100%',
        //paddingBottom: 80
      }
    },
    openCommentsContainer: {
      [theme.breakpoints.up(750)]: { 
        flex: 'wrap', 
        overflowY: 'auto', 
        overflowX: 'hidden', 
        height: '100%',
        marginTop: 5,  
        marginLeft: 2,
        //marginBottom: 65,
      },
      [theme.breakpoints.down(750)]: { 
        flex: 'wrap', 
        overflowY: 'auto', 
        overflowX: 'hidden', 
        height: '100%',
        width: '100%',        
      }
    },
    commentSection: {
      display: 'flex', 
      flexDirection: 'column',  
      overflowY: 'auto',  
      height: 'auto', 
      width: 400,
      
      [theme.breakpoints.down(750)]: { 
        width: '100%',
        
      }
    },
    commentInputContainer: {
      position: 'relative',
      bottom: 0,
      borderRadius: 99,
      width: '100%',
    },
    profileImage: {
      paddingBottom: 5, 
      display: 'flex', 
      justifyContent: 'end', 
      alignItems: 'end'
    },
    input: {
      typography: 'subtitle2',
      width: '100%', 
      borderRadius: 10,
      backgroundColor: grey[100],
      "& fieldset": { borderRadius: 10 }
    },
    comment: {
      borderRadius: 99,
      height: 50,
      width: '80%',
    },
    inputBar: {
      width: '100%',
      //height: 'auto',
      //borderRadius: 99, 
      //border: '1px solid #D3D3D3', 
      //backgroundColor: grey[100],
      //"& fieldset": { borderRadius: 10 }
    },
    actionButton: {
      position: 'relative', left: 70, top: 25, color: grey[900], minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30
    },
    downloadButton: {
      position: 'relative', left: 50, top: 25, color: grey[900], minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30
    },
    shareButton: {
      position: 'relative', left: 30, top: 25, color: grey[900], minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30
    },    
  }
})