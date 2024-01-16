import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { options } from "../utils/constants";

const useNowPlayingMovies=()=>{
    const dispatch=useDispatch();

  //Make API call
  const getNowPlayingMovies=async()=>{
     const data=await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1",options)
     const json=await data.json();
     console.log(json);
     dispatch(addNowPlayingMovies(json.results))
  }

  useEffect(()=>{
      getNowPlayingMovies();
  },[])

}
export default useNowPlayingMovies