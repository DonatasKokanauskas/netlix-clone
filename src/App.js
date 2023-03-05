import { useState } from "react";
import "./style/css/App.css";
import Header from "./components/Header";
import RandomMovieImage from "./components/RandomMovieImage";
import RandomMovieInfo from "./components/RandomMovieInfo";
import ContentCards from "./components/ContentCards";
import LoadingScreen from "./components/LoadingScreen";
import Modal from "./components/Modal";
import { MoviesDataProvider } from "./context/Context";

function App() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="app">
      <Header />
      {isLoaded && <LoadingScreen />}
      <MoviesDataProvider>
        <Modal open={isOpen} CloseModal={() => setIsOpen(false)} />
        <RandomMovieImage />
        <RandomMovieInfo />
        <ContentCards setIsLoaded={setIsLoaded} />
      </MoviesDataProvider>
    </div>
  );
}

export default App;
