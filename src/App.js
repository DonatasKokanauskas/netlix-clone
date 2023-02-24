import "./style/css/App.css";
import Header from "./components/Header";
import MainImage from "./components/MainImage";
import ContentInfo from "./components/ContentInfo";
import ContentCards from "./components/ContentCards";

function App() {
  return (
    <div className="app">
      <Header />
      <MainImage />
      <ContentInfo />
      <ContentCards />
    </div>
  );
}

export default App;
