import React, { useEffect } from "react";
import { useState } from "react";
import "../style/css/TVShows.css";
import Cards from "../components/Cards";
import useTranslate from "../custom-hooks/useTranslate";
import { useMoviesData } from "../context/Context";
import MiniModal from "../components/MiniModal";
import Modal from "../components/Modal";

const TVShows = () => {
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [onTheAirShows, setOnTheAirShows] = useState([]);
  const { fetchData } = useMoviesData();

  useEffect(() => {
    fetchData(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US&page=1",
      setTopRatedShows
    );
    fetchData(
      "https://api.themoviedb.org/3/tv/on_the_air?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US&page=1",
      setOnTheAirShows
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

  return (
    <div className="tv-show-page">
      <MiniModal />
      <Modal />
      <div className="h1-select">
        <h1>TV Shows</h1>
        <select>
          <option disabled selected style={{ display: "none" }}>
            Genres
          </option>
          <option value="">Action</option>
          <option value="">Anime</option>
          <option value="">Comedies</option>
          <option value="">Horror</option>
          <option value="">Fantasy</option>
          <option value="">Romance</option>
          <option value="">Thriller</option>
        </select>
      </div>

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
    </div>
  );
};

export default TVShows;

// api key: 7c21ca4ec675f18602bfd1f831746fab
