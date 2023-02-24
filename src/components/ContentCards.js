import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../style/css/ContentCards.css";

const Movies = ({ title, state, alt }) => {
  return (
    <div className="movies">
      <h2>{title}</h2>
      <div className="movies__cards">
        {state.map((movie) => {
          return (
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={alt}
            />
          );
        })}
      </div>
    </div>
  );
};

const MoviesCards = () => {
  const [trending, setTrending] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);

  const fetchData = async (url, state) => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      state(data.results);
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
  return (
    <>
      <Movies title="Trending Now" state={trending} alt="trending" />
      <Movies title="Top Rated Movies" state={topRatedMovies} alt="top rated" />
      <Movies title="New Movies" state={newMovies} alt="new rmovies" />
      <Movies
        title="Top Rated TV Shows"
        state={topRatedShows}
        alt="top rated TV shows"
      />
    </>
  );
};

export default MoviesCards;

// api key: 7c21ca4ec675f18602bfd1f831746fab
// trending now https://api.themoviedb.org/3/trending/all/day?api_key=7c21ca4ec675f18602bfd1f831746fab
