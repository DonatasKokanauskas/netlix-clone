import React from "react";
import "../style/css/Home.css";
import RandomMovieImage from "./RandomMovieImage";
import RandomMovieInfo from "./RandomMovieInfo";
import ContentCards from "./ContentCards";
import Modal from "./Modal";
import MiniModal from "./MiniModal";
import { useMoviesData } from "../context/Context";

const Home = () => {
  const { setIsLoading } = useMoviesData();
  return (
    <div className="home">
      <Modal />
      <RandomMovieImage />
      <RandomMovieInfo />
      <MiniModal />
      <ContentCards />
    </div>
  );
};

export default Home;
