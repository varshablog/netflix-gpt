import React from "react";
import useMovieVideos from "../hooks/useMovieVideos";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
  
  //fetching that movie videos that we used as a mainContainer background movie and filter out trailer video and store that trailer video inside redux store
  
  useMovieVideos(movieId);
  const videoTrailerKey=useSelector(store=>store?.movies?.trailerVideo);
  
  return (
    <div>
      <iframe
       
        src={"https://www.youtube.com/embed/" + videoTrailerKey?.key +"?si=wyvCq5TNpWfjJM2U"}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       
      ></iframe>
    </div>
  );
};

export default VideoBackground;
