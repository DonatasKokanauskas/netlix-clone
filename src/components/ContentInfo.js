import React, { useEffect, useState } from "react";
import "../style/css/ContentInfo.css";
import { AiFillCaretRight } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";

const MovieInfo = ({ trending, randomNumber }) => {
  const [randomTitle, setRandomTitle] = useState([]);
  const [randomName, setRandomName] = useState([]);
  const [randomOverview, setRandomOverview] = useState([]);

  useEffect(() => {
    setRandomTitle(
      trending.map((movie) => {
        return movie.title;
      })
    );
    setRandomName(
      trending.map((movie) => {
        return movie.original_name;
      })
    );
    setRandomOverview(
      trending.map((movie) => {
        return movie.overview;
      })
    );
  }, [trending]);

  return (
    <div className="movie-info">
      {randomTitle[randomNumber] ? (
        <h1>{randomTitle[randomNumber]}</h1>
      ) : (
        <h1>{randomName[randomNumber]}</h1>
      )}
      <p>{randomOverview[randomNumber]}</p>
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

export default MovieInfo;
