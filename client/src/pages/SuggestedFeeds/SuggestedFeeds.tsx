  import { Box, Button, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const suggestedFeedIdeas = ['nature', 'space', 'Keep it simple', 'Organization', 'Travel', 'Cuisine', 'Spring']

const SuggestedFeeds = () => {  
  const date = new Date()
  const navigate = useNavigate()
  const today = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`



  return (
      <Box>
          <Typography sx={{textAlign: 'center', fontSize: 19, fontWeight: 400, paddingTop: 3}}>{today}</Typography>
          <Typography sx={{textAlign: 'center', fontSize: 36, fontWeight: 600}}>Stay Inspired</Typography>

          
          <Box sx={{display: 'flex', backgroundColor: 'pink', marginX:25, marginTop: 5}}>
            <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'start', alignItems: 'start', marginLeft: 1.6}} >
            {suggestedFeedIdeas.map((feedIdea, i) => (
              <Box key={i} sx={{position: 'relative', borderRadius: 10, backgroundColor: 'blue', margin: 1, maxHeight: '300px', minHeight: '300px', maxWidth: '400px', minWidth: '400px'}}>
                <Button onClick={() => navigate(`/category/${feedIdea}`)} sx={{maxHeight: '300px', minHeight: '300px', maxWidth: '400px', minWidth: '400px'}}>
                  <Typography sx={{position: 'absolute', top: 20, left: 20, textDecoration: 'capitalize'}}>{feedIdea}</Typography>
                </Button>
              </Box>
            ))}
            </Box>
          </Box>

        <Box sx={{paddingBottom: 5, paddingTop: 5}}>
          <Box sx={{position: 'absolute', left: '50%'}}>
            <Box sx={{position: 'relative', left: '-50%'}}>
            <CheckCircleIcon sx={{minHeight: 30, maxHeight: 30, minWidth: 30, maxWidth: 30}} />
          </Box>
          </Box>
          <Typography sx={{textAlign: 'center', paddingTop: 6, paddingBottom: 1}}>
            That's all for today! 
          </Typography>
          <Typography sx={{textAlign: 'center', fontSize: 20, fontWeight: 600}}>
            Come back tomorrow for more inspiration
          </Typography>
          </Box>
          

          <Box sx={{position: 'absolute', left: '50%', paddingBottom: 10}}>
            <Box sx={{position: 'relative', left: '-50%'}}>
            <Button sx={{borderRadius: 99, backgroundColor: 'grey'}} variant='contained'>
              Go to home feed
            </Button>
          </Box>
          </Box>
      </Box>
  )
}

export default SuggestedFeeds