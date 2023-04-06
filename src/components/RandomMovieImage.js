import "../style/css/RandomMovieImage.css";
import { useMoviesData } from "../context/Context";

const MainImage = () => {
  const { randomMovieImage } = useMoviesData();

  return (
    <div className="image-container">
      <img src={`https://image.tmdb.org/t/p/original/${randomMovieImage}`} />
    </div>
  );
};

export default MainImage;
