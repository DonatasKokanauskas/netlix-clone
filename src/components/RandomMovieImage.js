import "../style/css/RandomMovieImage.css";
import { useMoviesData } from "../context/Context";

const MainImage = () => {
  const { randomMovieImage } = useMoviesData();

  return (
    <div
      className="image-container"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${randomMovieImage})`,
      }}
    ></div>
  );
};

export default MainImage;

// backdrop_path
