import React, { useEffect, useState } from "react";
import "../style/css/ContentInfo.css";
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
    randomOverview,
    setRandomOverview,
  } = useMoviesData();

  // const [randomTitle, setRandomTitle] = useState([]);
  // const [randomName, setRandomName] = useState([]);
  // const [randomOverview, setRandomOverview] = useState([]);

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
        if (movie.overview.length < 350) {
          return movie.overview;
        } else {
          return movie.overview.slice(0, 350) + "...";
        }
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

export default ContentInfo;
