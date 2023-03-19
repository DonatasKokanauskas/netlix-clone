import React, { useEffect } from "react";
import { useState } from "react";
import "../style/css/NewAndPopular.css";
import Cards from "../components/Cards";
import useTranslate from "../custom-hooks/useTranslate";
import { useMoviesData } from "../context/Context";
import MiniModal from "../components/MiniModal";
import Modal from "../components/Modal";

const NewAndPopular = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);

  const { fetchData } = useMoviesData();

  useEffect(() => {
    fetchData(
      "https://api.themoviedb.org/3/movie/popular?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US&page=1",
      setPopularMovies
    );
    fetchData(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US&page=1",
      setUpcomingMovies
    );
    fetchData(
      "https://api.themoviedb.org/3/tv/popular?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US&page=1",
      setPopularTVShows
    );
  }, []);

  const [popularMoviesLength, setPopularMoviesLength] = useState();
  const [upcomingMoviesLength, setUpcomingMoviesLength] = useState();
  const [popularTVShowsLength, setPopularTVShowsLength] = useState();

  useEffect(() => {
    setPopularMoviesLength(popularMovies.length);
  }, [popularMovies]);

  useEffect(() => {
    setUpcomingMoviesLength(upcomingMovies.length);
  }, [upcomingMovies]);

  useEffect(() => {
    setPopularTVShowsLength(popularTVShows.length);
  }, [popularTVShows]);

  const [translatePopularMovies, handleClickPopularMovies] =
    useTranslate(popularMoviesLength);

  const [translateUpcomingMovies, handleClickUpcomingMovies] =
    useTranslate(upcomingMoviesLength);

  const [translatePopularTVShows, handleClickPopularTVShows] =
    useTranslate(popularTVShowsLength);

  return (
    <div className="new-and-popular-page">
      <MiniModal />
      <Modal />
      <h1>New And Popular</h1>
      <Cards
        title="Popular Movies"
        state={popularMovies}
        alt="popular movies"
        handleClick={handleClickPopularMovies}
        translate={translatePopularMovies}
      />
      <Cards
        title="Upcoming Movies"
        state={upcomingMovies}
        alt="upcoming movies"
        handleClick={handleClickUpcomingMovies}
        translate={translateUpcomingMovies}
      />
      <Cards
        title="Popular TV Shows"
        state={popularTVShows}
        alt="popular TV Shows"
        handleClick={handleClickPopularTVShows}
        translate={translatePopularTVShows}
      />
    </div>
  );
};

export default NewAndPopular;

// api key: 7c21ca4ec675f18602bfd1f831746fab
