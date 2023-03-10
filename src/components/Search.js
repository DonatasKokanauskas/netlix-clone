import React, { useEffect, useState } from "react";
import "../style/css/Search.css";
import axios from "axios";

const Search = ({ searchKey }) => {
  const [searchMovies, setSearchMovies] = useState([]);

  const fetchMovies = async (key) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${key}&api_key=7c21ca4ec675f18602bfd1f831746fab`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies(searchKey)
      .then((data) => {
        setSearchMovies(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchKey]);

  return (
    <div className="search-page">
      <div className="search-page__container">
        <h2>Titles related to: {searchKey}</h2>
        <div className="searched__cards">
          {searchMovies.map((movie) => {
            return (
              <img
                value={movie.id}
                type={movie.first_air_date ? "TV show" : "movie"}
                // style={hoverClass}
                // onMouseOver={position}
                // onMouseLeave={hoverLeave}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                // alt={alt}
                key={movie.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
