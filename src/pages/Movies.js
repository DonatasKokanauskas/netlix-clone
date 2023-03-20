import React, { useEffect } from "react";
import { useState } from "react";
import "../style/css/Movies.css";
import Cards from "../components/Cards";
import useTranslate from "../custom-hooks/useTranslate";
import { useMoviesData } from "../context/Context";
import MiniModal from "../components/MiniModal";
import Modal from "../components/Modal";
import LoadingScreen from "../components/LoadingScreen";

const Movies = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const {
    fetchData,
    fetchGenres,
    position,
    hoverLeave,
    loadingScreen,
    setLoadingScreen,
  } = useMoviesData();

  const handleTVGenres = (e) => {
    setLoadingScreen(true);
    fetchData(
      `https://api.themoviedb.org/3/discover/movie?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US&sort_by=popularity.desc&with_genres=${e.target.value}`,
      setFilteredMovies
    );
  };

  useEffect(() => {
    fetchData(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US&page=1",
      setTopRatedMovies
    );
    fetchData(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US&page=1",
      setNowPlaying
    );

    fetchGenres(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US",
      setMoviesGenres
    );
  }, []);

  const [topRatedMoviesLength, setTopRatedMoviesLength] = useState();
  const [nowPlayingLength, setNowPlayingLength] = useState();

  useEffect(() => {
    setTopRatedMoviesLength(topRatedMovies.length);
  }, [topRatedMovies]);

  useEffect(() => {
    setNowPlayingLength(nowPlaying.length);
  }, [nowPlaying]);

  const [translateMovies, handleClickMovies] =
    useTranslate(topRatedMoviesLength);
  const [translateNowPlaying, handleClickNowPlaying] =
    useTranslate(nowPlayingLength);

  return (
    <div className="movies-page">
      {loadingScreen && <LoadingScreen />}
      <MiniModal />
      <Modal />
      <div className="h1-select">
        <h1>Movies</h1>
        <select defaultValue={"DEFAULT"} onChange={handleTVGenres}>
          <option value="DEFAULT" disabled style={{ display: "none" }}>
            Genres
          </option>
          {moviesGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {filteredMovies.length > 0 ? (
        <div className="movies-page__container">
          <div className="movies__cards">
            {filteredMovies.map((movie) => {
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
      ) : (
        <>
          <Cards
            title="Top Rated Movies"
            state={topRatedMovies}
            alt="top rated movies"
            handleClick={handleClickMovies}
            translate={translateMovies}
          />
          <Cards
            title="Now Playing"
            state={nowPlaying}
            alt="now playing"
            handleClick={handleClickNowPlaying}
            translate={translateNowPlaying}
          />
        </>
      )}
    </div>
  );
};

export default Movies;

// api key: 7c21ca4ec675f18602bfd1f831746fab
