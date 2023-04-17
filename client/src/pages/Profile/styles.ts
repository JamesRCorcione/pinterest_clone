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
      alignItems: 'center',
      backgroundColor: 'white', 
      [theme.breakpoints.down(750)]: { 
        position: 'sticky',
        bottom: 0,
        height: 70,
        width: '100%',
        zIndex: 2000,
        backgroundColor: 'pink',
        boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
      }, 
    },

    profileImage: {
        top: 20, minHeight: 120, maxHeight: 120, minWidth: 120, maxWidth: 120
    },
    userNameInitial: {
        fontSize: 48, textTransform: 'capitalize', color: 'black'
    },
    userName: {
        position: 'relative', top: 40, fontSize: 12, fontWeight: 10
    },
    buttonContainer: {
        display: 'flex', justifyContent: 'center', marginTop: 2
    },
    shareButton: {
        position: 'relative', top: 200, height: 40, borderRadius: 20, backgroundColor: grey[300]
    },
    editProfileButton: {
        position: 'relative', top: 200,height: 40,borderRadius: 20, backgroundColor: grey[300]
    }
}
})