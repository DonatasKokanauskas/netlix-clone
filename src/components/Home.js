import React from "react";
import "../style/css/Home.css";
import RandomMovieImage from "./RandomMovieImage";
import RandomMovieInfo from "./RandomMovieInfo";
import ContentCards from "./ContentCards";
import Modal from "./Modal";
import MiniModal from "./MiniModal";

const Home = ({ setIsLoading }) => {
  return (
    <div className="home">
      <Modal />
      <RandomMovieImage />
      <RandomMovieInfo />
      <MiniModal />
      <ContentCards setIsLoading={setIsLoading} />
    </div>
  );
};

export default Home;
