import React from "react";
import "../style/css/Home.css";
import RandomMovieImage from "../components/RandomMovieImage";
import RandomMovieInfo from "../components/RandomMovieInfo";
import MainContent from "../components/MainContent";
import Modal from "../components/Modal";
import MiniModal from "../components/MiniModal";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <div className="home">
      <Modal />
      <RandomMovieImage />
      <RandomMovieInfo />
      <MiniModal />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Home;
