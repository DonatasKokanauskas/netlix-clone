import { useState } from "react";
import "./style/css/App.css";
import Header from "./components/Header";
import RandomMovieImage from "./components/RandomMovieImage";
import RandomMovieInfo from "./components/RandomMovieInfo";
import ContentCards from "./components/ContentCards";
import LoadingScreen from "./components/LoadingScreen";
import Modal from "./components/Modal";
import { MoviesDataProvider } from "./context/Context";
import MiniModal from "./components/MiniModal";

function App() {
  const [isLoaded, setIsLoaded] = useState(true);
  // const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="app">
      <Header />
      {isLoaded && <LoadingScreen />}
      <MoviesDataProvider>
        <Modal />
        <RandomMovieImage />
        <RandomMovieInfo />
        <MiniModal />
        <ContentCards setIsLoaded={setIsLoaded} />
      </MoviesDataProvider>
    </div>
  );
}

export default App;
