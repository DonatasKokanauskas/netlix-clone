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
  const { fetchData } = useMoviesData();

  useEffect(() => {
    fetchData(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US&page=1",
      setTopRatedShows
    );
  }, []);

  const [topRatedShowsLength, setTopRatedShowsLength] = useState();

  useEffect(() => {
    setTopRatedShowsLength(topRatedShows.length);
  }, [topRatedShows]);

  const [translateTVShows, handleClickTVShows] =
    useTranslate(topRatedShowsLength);

  return (
    <div className="tv-show-page">
      <MiniModal />
      <Modal />
      <h1>TV Shows</h1>
      <Cards
        title="Top Rated TV Shows"
        state={topRatedShows}
        alt="top rated TV shows"
        handleClick={handleClickTVShows}
        translate={translateTVShows}
      />
    </div>
  );
};

export default TVShows;

// api key: 7c21ca4ec675f18602bfd1f831746fab
