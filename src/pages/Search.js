import React, { useEffect, useState } from "react";
import "../style/css/Search.css";
import axios from "axios";
import { useMoviesData } from "../context/Context";
import MiniModal from "../components/MiniModal";
import Modal from "../components/Modal";
import LoadingScreen from "../components/LoadingScreen";

const Search = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const {
    position,
    hoverLeave,
    setIsHovered,
    loadingScreen,
    setLoadingScreen,
    searchKey,
  } = useMoviesData();

  const fetchMovies = async (key) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${key}&api_key=7c21ca4ec675f18602bfd1f831746fab`
      );
      const response2 = await axios.get(
        `https://api.themoviedb.org/3/search/tv?query=${key}&api_key=7c21ca4ec675f18602bfd1f831746fab`
      );
      const data = await response.data;
      const data2 = await response2.data;
      return [...data.results, ...data2.results];
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies(searchKey)
      .then((data) => {
        setSearchedMovies(data);
        setTimeout(() => {
          setLoadingScreen(false);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchKey]);

  useEffect(() => {
    setIsHovered(false);
    if (document.querySelector(".hovered")) {
      document.querySelector(".hovered").classList.remove("hovered");
    }
  }, [searchedMovies]);

  // setIsLoading(false);

  return (
    <div className="search-page">
      {loadingScreen && <LoadingScreen />}
      <MiniModal />
      <Modal />
      <div className="search-page__container">
        <h2>Movies & TV shows related to: {searchKey}</h2>
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
