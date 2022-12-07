import * as React from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'

export const ShowRating = ({ rating }) => {
  return <Box 
  sx={{'& > legend': { mt: 2 }}} 
  >
      <Rating 
       name="read-only" 
       value={rating} 
       max={10} 
       precision={0.1} 
       readOnly
       emptyIcon={<StarIcon style={{ stroke: 'white' }} fontSize="inherit" />} />
    </Box>
}
