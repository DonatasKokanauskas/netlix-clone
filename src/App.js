import { useState } from "react";
import "./style/css/App.css";
import Header from "./components/Header";
import MainImage from "./components/MainImage";
import ContentInfo from "./components/ContentInfo";
import ContentCards from "./components/ContentCards";
import LoadingScreen from "./components/LoadingScreen";
import Modal from "./components/Modal";
import { MoviesDataProvider } from "./context/Context";

function App() {
  // const [trending, setTrending] = useState([]);
  // const randomNumber = Math.floor(Math.random() * trending.length);

  const [isLoaded, setIsLoaded] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="app">
      <Header />
      {isLoaded && <LoadingScreen />}
      <MoviesDataProvider>
        <Modal open={isOpen} CloseModal={() => setIsOpen(false)} />
        <MainImage />
        <ContentInfo />
        <ContentCards setIsLoaded={setIsLoaded} />
      </MoviesDataProvider>
    </div>
  );
}

export default App;
