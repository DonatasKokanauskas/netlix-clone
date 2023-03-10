import React, { useEffect, useState } from "react";
import "../style/css/Search.css";
import axios from "axios";
import { useMoviesData } from "../context/Context";
import MiniModal from "./MiniModal";
import Modal from "./Modal";
import LoadingScreen from "./LoadingScreen";

const Search = ({ isLoading, setIsLoading }) => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const { searchKey } = useMoviesData();
  const {
    position,
    hoverLeave,
    setIsHovered,
    loadingScreen,
    setLoadingScreen,
  } = useMoviesData();

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
        setSearchedMovies(data.results);
        setTimeout(() => {
          setLoadingScreen(false);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchKey]);

  useEffect(() => {
    if (searchedMovies.length === 0) {
      setIsHovered(false);
    }
  }, [searchedMovies]);

  // useEffect(() => {
  //   setIsLoading(false);
  // }, [isLoading]);
  setIsLoading(false);

  return (
    <div className="search-page">
      {loadingScreen && <LoadingScreen />}
      <MiniModal />
      <Modal />
      <div className="search-page__container">
        <h2>Movies related to: {searchKey}</h2>
        <div className="searched__cards">
          {searchedMovies.map((movie) => {
            if (movie.poster_path && movie.backdrop_path != null) {
              return (
                <img
                  value={movie.id}
                  type={movie.first_air_date ? "TV show" : "movie"}
                  onMouseOver={position}
                  onMouseLeave={hoverLeave}
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  key={movie.id}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
