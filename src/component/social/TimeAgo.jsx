import {parseISO,formatDistanceToNow} from 'date-fns'

import React from 'react'

const TimeAgo = ({timeStamps}) => {
    let timeAgo=''
    if(timeStamps){
        const date = parseISO(timeStamps)
        const timePeriod = formatDistanceToNow(date)
        timeAgo =`${timePeriod} ago`
    }
  return (
    <small title={timeStamps}>
        &nbsp; <i>{timeAgo}</i>
      
    </small>
  )
}

export default TimeAgo
