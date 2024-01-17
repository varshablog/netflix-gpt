import React from 'react'
import Header from './Header'
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';


const Browse = () => {

  //get movies data using nowPlayingMovies API and store that data inside redux store
 useNowPlayingMovies();
  return (
    <div>
        <Header/> 
        <MainContainer/>
        <SecondaryContainer/>

    </div> 
  )
}

export default Browse
