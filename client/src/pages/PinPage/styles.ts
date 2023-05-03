import { makeStyles } from 'tss-react/mui'
import { grey, red } from '@mui/material/colors';

export default makeStyles()((theme) => {
  return {
    loading: {
      [theme.breakpoints.up(750)]: {
        position: 'fixed', top: 66, width: '100%', color: red[800], zIndex: 3000,
      },
      [theme.breakpoints.down(750)]: {
        position: 'fixed',
        bottom: 66,
        width: '100%',
        color: red[800],
        zIndex: 3000,      
      }
    }
  }
})

