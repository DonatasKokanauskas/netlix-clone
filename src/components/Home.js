import React from "react";
import "../style/css/Home.css";
import RandomMovieImage from "./RandomMovieImage";
import RandomMovieInfo from "./RandomMovieInfo";
import ContentCards from "./ContentCards";
import Modal from "./Modal";
import { MoviesDataProvider } from "../context/Context";
import MiniModal from "./MiniModal";

const Home = ({ setIsLoading }) => {
  return (
    <div className="home">
      <MoviesDataProvider>
        <Modal />
        <RandomMovieImage />
        <RandomMovieInfo />
        <MiniModal />
        <ContentCards setIsLoading={setIsLoading} />
      </MoviesDataProvider>
    </div>
  );
};

export default Home;
