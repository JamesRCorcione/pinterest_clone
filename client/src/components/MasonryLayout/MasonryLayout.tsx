import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from '../Pin/Pin'

import useStyles from './styles'

const breakpointObj = {
  default: 3,
  3000: 6,
  2000: 5,
  1200: 4,
  1000: 2,
  500: 1,
}

const MasonryLayout = ({ pins }:any) => {
  const classes = useStyles()


  return (
    <div>
      <Masonry className={classes.pin} breakpointCols={breakpointObj}>
        {pins?.map((pin:IPin, i:number) => <Pin key={i} pin={pin} />)}
      </Masonry>
    </div>
  )
}

export default MasonryLayout