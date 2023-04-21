import { makeStyles } from 'tss-react/mui'
import { grey } from '@mui/material/colors';

export default makeStyles()((theme) => {
  return {
    topContainer: {
        display: 'flex', 
        paddingTop: 80,
        [theme.breakpoints.down(750)]: { 
            paddingTop: 0,
        }
    },
    mobileLogout: {
        position: 'absolute',
        top: 5,
        right: 5
    },
    mobileLogoutButton: {
        backgroundColor: grey[300],
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