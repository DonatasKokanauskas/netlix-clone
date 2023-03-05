import React, { useEffect, useState } from "react";
import "../style/css/RandomMovieInfo.css";
import { AiFillCaretRight } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useMoviesData } from "../context/Context";

const ContentInfo = () => {
  const {
    trending,
    randomNumber,
    randomTitle,
    setRandomTitle,
    randomName,
    setRandomName,
    setRandomOverview,
    setRandomMovieImage,
  } = useMoviesData();

  const [shorterOverview, setShorterOverview] = useState([]);

  useEffect(() => {
    setRandomTitle(() => {
      const title = trending.map((movie) => {
        return movie.title;
      });
      return title[randomNumber];
    });
    setRandomName(() => {
      const name = trending.map((movie) => {
        return movie.original_name;
      });
      return name[randomNumber];
    });
    setRandomOverview(() => {
      const overview = trending.map((movie) => {
        return movie.overview;
      });
      return overview[randomNumber];
    });

    setShorterOverview(() => {
      const shorterOverview = trending.map((movie) => {
        if (movie.overview.length < 200) {
          return movie.overview;
        } else {
          return movie.overview.slice(0, 200) + "...";
        }
      });
      return shorterOverview[randomNumber];
    });

    setRandomMovieImage(() => {
      const image = trending.map((movie) => {
        return movie.backdrop_path;
      });
      return image[randomNumber];
    });
  }, [trending]);

  return (
    <div className="movie-info">
      {randomTitle ? <h1>{randomTitle}</h1> : <h1>{randomName}</h1>}
      <p>{shorterOverview}</p>
      <div>
        <button>
          <AiFillCaretRight />
          Play
        </button>
        <button>
          <AiOutlineInfoCircle />
          More info
        </button>
      </div>
    </div>
  );
};

export default ContentInfo;
