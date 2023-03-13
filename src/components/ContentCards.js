import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../style/css/ContentCards.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import useTranslate from "../custom-hooks/useTranslate";
import { useMoviesData } from "../context/Context";

const Movies = ({ title, state, alt, handleClick, translate }) => {
  const { position, hoverLeave, updatePosition } = useMoviesData();

  useEffect(() => {
    window.onresize = updatePosition;
  }, []);

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
            if (movie.poster_path && movie.backdrop_path != null) {
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
            }
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

const ContentCards = () => {
  const { trending, setTrending } = useMoviesData();
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const { setIsLoading } = useMoviesData();

  const fetchData = async (url, state) => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      if (response.status === 200) {
        state(data.results);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData(
      "https://api.themoviedb.org/3/trending/all/day?api_key=7c21ca4ec675f18602bfd1f831746fab",
      setTrending
    );
    fetchData(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US",
      setTopRatedMovies
    );
    fetchData(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US&page=1",
      setNewMovies
    );
    fetchData(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US&page=1",
      setTopRatedShows
    );
  }, []);

  const [initialValue, setInitialValue] = useState();

  useEffect(() => {
    setInitialValue(trending.length);
  }, [trending]);

  const [translateTrending, handleClickTrending] = useTranslate(initialValue);
  const [translateTopRated, handleClickTopRated] = useTranslate(initialValue);
  const [translateNewMovies, handleClickNewMovies] = useTranslate(initialValue);
  const [translateTVShows, handleClickTVShows] = useTranslate(initialValue);

  return (
    <>
      <Movies
        title="Trending Now"
        state={trending}
        alt="trending"
        handleClick={handleClickTrending}
        translate={translateTrending}
      />
      <Movies
        title="Top Rated Movies"
        state={topRatedMovies}
        alt="top rated"
        handleClick={handleClickTopRated}
        translate={translateTopRated}
      />
      <Movies
        title="New Movies"
        state={newMovies}
        alt="new rmovies"
        handleClick={handleClickNewMovies}
        translate={translateNewMovies}
      />
      <Movies
        title="Top Rated TV Shows"
        state={topRatedShows}
        alt="top rated TV shows"
        handleClick={handleClickTVShows}
        translate={translateTVShows}
      />
    </>
  );
};

export default ContentCards;

// api key: 7c21ca4ec675f18602bfd1f831746fab
