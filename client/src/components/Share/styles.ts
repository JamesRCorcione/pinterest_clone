import { makeStyles } from 'tss-react/mui'
import { grey, red } from '@mui/material/colors';

export default makeStyles()((theme) => {
  return {
    copyLinkButton: {
        borderRadius: 99, 
        backgroundColor: grey[600], 
        marginTop: 2, 
        minHeight: 32, 
        maxHeight: 32, 
        minWidth: 32, 
        maxWidth: 32,
        '&:hover': {
          backgroundColor: grey[600], 
        }
      }
  }
})