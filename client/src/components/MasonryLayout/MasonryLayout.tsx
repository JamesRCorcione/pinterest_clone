import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from '../Pin/Pin'

import useStyles from './styles'

const breakpointObj = {
  default: 3,
  3000: 5,
  2000: 4,
  1200: 3,
  1000: 2,
  500: 1,
}

const MasonryLayout = ({ pins }:any) => {
  const classes = useStyles()
  return (
    <div>
      <Masonry className={classes.pin} breakpointCols={breakpointObj}>
        {pins?.map((pin:IPin) => <Pin key={pin._id} pin={pin} />)}
      </Masonry>
    </div>
  )
}

export default MasonryLayout