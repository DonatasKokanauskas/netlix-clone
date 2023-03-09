import React from "react";
import RandomMovieImage from "./RandomMovieImage";
import RandomMovieInfo from "./RandomMovieInfo";
import ContentCards from "./ContentCards";
import Modal from "./Modal";
import { MoviesDataProvider } from "../context/Context";
import MiniModal from "./MiniModal";

const Home = ({ setIsLoaded }) => {
  return (
    <MoviesDataProvider>
      <Modal />
      <RandomMovieImage />
      <RandomMovieInfo />
      <MiniModal />
      <ContentCards setIsLoaded={setIsLoaded} />
    </MoviesDataProvider>
  );
};

export default Home;
