import Feed from '../Feed/Feed'
import { Box, Button, Typography, Link, TextField, Input, Avatar } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { deletePin, getPin } from '../../features/pinsSlice'
import { useDispatch, useSelector } from 'react-redux'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UploadIcon from '@mui/icons-material/Upload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';
import { Divider } from '@mui/material';
import { grey, blue } from '@mui/material/colors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LinkIcon from '@mui/icons-material/Link';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import FileSaver from 'file-saver'

import {
  EmailShareButton,
  EmailIcon,  
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";


import Comment from '../Comment/Comment'
import useStyle from './styles'
import { SavePin } from '../../features/usersSlice'
import { fetchUser } from '../../utils/fetchUser'
import { createComment, getComments } from '../../features/commentsSlice'
import { Circles } from 'react-loader-spinner'


const Share = ({image}:any) => {
    const { classes } = useStyle()
    const [copyLinkText, setCopyLinkText] = useState<string>('Copy Link!')

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopyLinkText('Link Copied!')
    }


  return (
    <Box sx={{display: 'flex', flexDirection:'column', width: 200, backgroundColor: 'white', boxShadow: 2, borderRadius: 5}}>
            <Typography sx={{display: 'flex',  justifyContent: 'center', marginTop: 1}}>Share</Typography>
            <Box sx={{display: 'flex',  justifyContent: 'space-between', margin: 2}}>
              <Box>
                <FacebookShareButton
                  url={window.location.href}
                  quote={'Dummy text!'}
                  hashtag="#muo"
                >
                  <FacebookIcon size={32} round />
                  <Typography sx={{fontSize:10}}>Facebook</Typography>
                </FacebookShareButton>
                
              </Box>
              <Box>
                <TwitterShareButton
                  url={window.location.href}
                >
                  <TwitterIcon size={32} round />
                  <Typography sx={{fontSize:10}}>Twitter</Typography>
                </TwitterShareButton>
                
              </Box>
              <Box>
                <LinkedinShareButton 
                  url={window.location.href}
                >
                  <LinkedinIcon size={32} round />
                  <Typography sx={{fontSize:10}}>Linkedin</Typography>
                </LinkedinShareButton>
                
              </Box>
            </Box>
            <Box  sx={{display: 'flex',  justifyContent: 'space-between', margin: 2}}>
              <Box>
                <PinterestShareButton
                  url={window.location.href}  
                  media={image!}    
                  description={'Share to Pinterest'}        
                >
                  <PinterestIcon size={32} round />
                  <Typography sx={{fontSize:10}}>Pinterest</Typography>
                </PinterestShareButton>
                
              </Box>
              <Box>
                <RedditShareButton
                  url={window.location.href}  
                >
                  <RedditIcon size={32} round />
                  <Typography sx={{fontSize:10}}>Reddit</Typography>
                </RedditShareButton>
                
              </Box>
              <Box>
                <Button className={classes.copyLinkButton} onClick={() => handleCopyLink()} disableRipple>
                  <LinkIcon sx={{color: 'white'}} />
                </Button>
                <Typography sx={{fontSize:10, marginTop: 0.1}}>{copyLinkText}</Typography>
              </Box>
            </Box>
          </Box>
  )
}

export default Share