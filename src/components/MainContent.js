import React, { useEffect } from "react";
import { useState } from "react";
import "../style/css/ContentCards.css";
import Cards from "./Cards";
import useTranslate from "../custom-hooks/useTranslate";
import { useMoviesData } from "../context/Context";

const MainContent = () => {
  const { trending, setTrending } = useMoviesData();
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const { fetchData } = useMoviesData();

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

  const [trendingLength, setTrendingLength] = useState();
  const [topRatedMoviesLength, setTopRatedMoviesLength] = useState();
  const [newMoviesLength, setNewMoviesLength] = useState();
  const [topRatedShowsLength, setTopRatedShowsLength] = useState();

  useEffect(() => {
    setTrendingLength(trending.length);
  }, [trending]);

  useEffect(() => {
    setTopRatedMoviesLength(topRatedMovies.length);
  }, [topRatedMovies]);

  useEffect(() => {
    setNewMoviesLength(newMovies.length);
  }, [newMovies]);

  useEffect(() => {
    setTopRatedShowsLength(topRatedShows.length);
  }, [topRatedShows]);

  const [translateTrending, handleClickTrending] = useTranslate(trendingLength);
  const [translateTopRated, handleClickTopRated] =
    useTranslate(topRatedMoviesLength);
  const [translateNewMovies, handleClickNewMovies] =
    useTranslate(newMoviesLength);
  const [translateTVShows, handleClickTVShows] =
    useTranslate(topRatedShowsLength);

  return (
    <>
      <Cards
        title="Trending Now"
        state={trending}
        alt="trending"
        handleClick={handleClickTrending}
        translate={translateTrending}
      />
      <Cards
        title="Top Rated Movies"
        state={topRatedMovies}
        alt="top rated"
        handleClick={handleClickTopRated}
        translate={translateTopRated}
      />
      <Cards
        title="New Movies"
        state={newMovies}
        alt="new movies"
        handleClick={handleClickNewMovies}
        translate={translateNewMovies}
      />
      <Cards
        title="Top Rated TV Shows"
        state={topRatedShows}
        alt="top rated TV shows"
        handleClick={handleClickTVShows}
        translate={translateTVShows}
      />
    </>
  );
};

export default MainContent;

// api key: 7c21ca4ec675f18602bfd1f831746fab
