import "../style/css/MainImage.css";
import { useMoviesData } from "../context/Context";

const MainImage = () => {
  const { randomMovie, randomNumber } = useMoviesData();
  // const randomMovie = trending.map((movie) => {
  //   return movie.backdrop_path;
  // });
  return (
    <div
      className="image-container"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${randomMovie[randomNumber]})`,
      }}
    ></div>
  );
};

export default MainImage;

// backdrop_path
