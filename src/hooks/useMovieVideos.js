import { useDispatch} from "react-redux";
import { options } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";


const useMovieVideos = (movieId) => {
    
    const dispatch=useDispatch();
    
    
    const getMovieVideos = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +movieId +"/videos?language=en-US",options
      );
      const json = await data.json();
     
      const filterTailers = json.results.filter(
        (data) => data.type === "Trailer"
      );
      const trailerVideo = filterTailers.length ? filterTailers[0]: json.results[0];
      console.log(trailerVideo);
      //storing trailerVideo inside redux store
      dispatch(addTrailerVideo(trailerVideo))
      
    };
    
    useEffect(() => {
      getMovieVideos();
    });

    
}

export default useMovieVideos
