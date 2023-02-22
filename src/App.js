import "./style/css/app.css";
import Header from "./components/Header";
import MainImage from "./components/MainImage";
import MovieInfo from "./components/MovieInfo";
import MoviesCards from "./components/MoviesCards";

function App() {
  return (
    <div className="app-container">
      <Header />
      <MainImage />
      <MovieInfo />
      <MoviesCards />
    </div>
  );
}

export default App;
