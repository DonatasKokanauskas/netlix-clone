import React, { useEffect } from "react";
import { useState } from "react";
import "../style/css/TVShows.css";
import Cards from "../components/Cards";
import useTranslate from "../custom-hooks/useTranslate";
import { useMoviesData } from "../context/Context";
import MiniModal from "../components/MiniModal";
import Modal from "../components/Modal";
import LoadingScreen from "../components/LoadingScreen";

const TVShows = () => {
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [onTheAirShows, setOnTheAirShows] = useState([]);
  const [TVGenres, setTVGenres] = useState([]);
  const [filteredTVShows, setFilteredTVShows] = useState([]);
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
      `https://api.themoviedb.org/3/discover/tv?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US&sort_by=popularity.desc&with_genres=${e.target.value}`,
      setFilteredTVShows
    );
  };

  useEffect(() => {
    fetchData(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US&page=1",
      setTopRatedShows
    );
    fetchData(
      "https://api.themoviedb.org/3/tv/on_the_air?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US&page=1",
      setOnTheAirShows
    );

    fetchGenres(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US",
      setTVGenres
    );
  }, []);

  const [topRatedShowsLength, setTopRatedShowsLength] = useState();
  const [onTheAirLength, setOnTheAirLength] = useState();

  useEffect(() => {
    setTopRatedShowsLength(topRatedShows.length);
  }, [topRatedShows]);

  useEffect(() => {
    setOnTheAirLength(onTheAirShows.length);
  }, [onTheAirShows]);

  const [translateTVShows, handleClickTVShows] =
    useTranslate(topRatedShowsLength);
  const [translateOnTheAir, handleClickOnTheAir] = useTranslate(onTheAirLength);
  console.log(filteredTVShows);
  return (
    <div className="tv-show-page">
      {loadingScreen && <LoadingScreen />}
      <MiniModal />
      <Modal />
      <div className="h1-select">
        <h1>TV Shows</h1>
        <select defaultValue={"DEFAULT"} onChange={handleTVGenres}>
          <option value="DEFAULT" disabled style={{ display: "none" }}>
            Genres
          </option>
          {TVGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {filteredTVShows.length > 0 ? (
        <div className="tv-show-page__container">
          <div className="tv__cards">
            {filteredTVShows.map((tv) => {
              if (tv.poster_path && tv.backdrop_path != null) {
                return (
                  <img
                    value={tv.id}
                    type={tv.first_air_date ? "TV show" : "movie"}
                    onMouseOver={position}
                    onMouseLeave={hoverLeave}
                    src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}
                    key={tv.id}
                  />
                );
              }
            })}
          </div>
        </div>
      ) : (
        <>
          <Cards
            title="Top Rated TV Shows"
            state={topRatedShows}
            alt="top rated TV shows"
            handleClick={handleClickTVShows}
            translate={translateTVShows}
          />
          <Cards
            title="Currently On The Air"
            state={onTheAirShows}
            alt="currently on the air"
            handleClick={handleClickOnTheAir}
            translate={translateOnTheAir}
          />
        </>
      )}
    </div>
  );
};

export default TVShows;

// api key: 7c21ca4ec675f18602bfd1f831746fab
