import React from "react";
import { useEffect } from "react";
import { useMoviesData } from "../context/Context";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Cards = ({ title, state, alt, handleClick, translate }) => {
  const { position, hoverLeave, updatePosition } = useMoviesData();

  useEffect(() => {
    window.onresize = updatePosition;
  });

  return (
    <div className="movies-container">
      <h2>{title}</h2>
      <div className="movies">
        <button className="handle left-handle" onClick={handleClick}>
          <span>
            <IoIosArrowBack />
          </span>
        </button>
        <div className="movies__cards" style={translate}>
          {state.map((movie) => {
            return (
              <img
                value={movie.id}
                type={movie.first_air_date ? "TV show" : "movie"}
                onMouseOver={position}
                onMouseLeave={hoverLeave}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={alt}
                key={movie.id}
              />
            );
          })}
        </div>
        <button className="handle right-handle" onClick={handleClick}>
          <span>
            <IoIosArrowForward />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Cards;
