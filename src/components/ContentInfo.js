import React from "react";
import "../style/css/ContentInfo.css";
import TitleLogo from "../images/titleLogo.webp";
import { AiFillCaretRight } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";

const MovieInfo = () => {
  return (
    <div className="movie-info">
      <img src={TitleLogo} alt="title logo" />
      <p>
        Feeling spurned after being cut from the national team, newly single
        softball player Lisa finds herself in a heated love triangle.
      </p>
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
