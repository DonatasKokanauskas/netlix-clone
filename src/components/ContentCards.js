import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../style/css/ContentCards.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import useTranslate from "../custom-hooks/useTranslate";

const Movies = ({ title, state, alt, handleClick, translate }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

const MoviesCards = ({ trending, setTrending, setIsLoaded }) => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);

  const fetchData = async (url, state) => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      if (response.status === 200) {
        state(data.results);
        setTimeout(() => {
          setIsLoaded(false);
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

  const [translateTrending, handleClickTrending] = useTranslate();
  const [translateTopRated, handleClickTopRated] = useTranslate();
  const [translateNewMovies, handleClickNewMovies] = useTranslate();
  const [translateTVShows, handleClickTVShows] = useTranslate();

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

export default MoviesCards;

// api key: 7c21ca4ec675f18602bfd1f831746fab
// trending now https://api.themoviedb.org/3/trending/all/day?api_key=7c21ca4ec675f18602bfd1f831746fab
