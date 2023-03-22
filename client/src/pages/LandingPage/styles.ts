import { makeStyles  } from '@material-ui/core'
import { grey } from '@mui/material/colors';

export default makeStyles((theme) => ({
  container: {
    scrollSnapType: 'y mandatory',
    scrollSnapStop: 'always',
    overflowY: 'scroll',
    height: '100vh'
  },
  one: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    scrollSnapAlign: 'start'
  },
  two: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    scrollSnapAlign: 'start'
  },
  three: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    scrollSnapAlign: 'start'
  },
  four: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    scrollSnapAlign: 'start'
  },
  five: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    scrollSnapAlign: 'start'
  },

}))