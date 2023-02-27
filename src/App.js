import { useState } from "react";
import "./style/css/App.css";
import Header from "./components/Header";
import MainImage from "./components/MainImage";
import ContentInfo from "./components/ContentInfo";
import ContentCards from "./components/ContentCards";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [trending, setTrending] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const randomNumber = Math.floor(Math.random() * trending.length);
  return (
    <div className="app">
      <Header />
      {isLoaded && <LoadingScreen />}
      <MainImage trending={trending} randomNumber={randomNumber} />
      <ContentInfo trending={trending} randomNumber={randomNumber} />
      <ContentCards
        trending={trending}
        setTrending={setTrending}
        setIsLoaded={setIsLoaded}
      />
    </div>
  );
}

export default App;
