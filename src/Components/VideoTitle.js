import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div id="videoTitle">
         <h1>{title}</h1>
         <p>{overview}</p>
         <div id="Playbuttons">
            <button className="playBtn">Play</button>
            <button className="infoBtn">More Info</button>
         </div>

    </div>
  )
}

export default VideoTitle
