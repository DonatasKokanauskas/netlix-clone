import { useState } from "react";
import "./style/css/App.css";
import Root from "./components/Root";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./components/Home";
import TVShows from "./components/TVShows";
import Movies from "./components/Movies";
import NewAndPopular from "./components/NewAndPopular";
import MyList from "./components/MyList";
import Search from "./components/Search";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

function App() {
  const [isLoaded, setIsLoaded] = useState(true);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home setIsLoaded={setIsLoaded} />} />
        <Route path="TVShows" element={<TVShows />} />
        <Route path="Movies" element={<Movies />} />
        <Route path="NewAndPopular" element={<NewAndPopular />} />
        <Route path="MyList" element={<MyList />} />
        <Route path="Search" element={<Search />} />
      </Route>
    )
  );

  return (
    <div className="app">
      {/* <Header /> */}
      {isLoaded && <LoadingScreen />}

      <RouterProvider router={router} />

      {/* <Home setIsLoaded={setIsLoaded} /> */}
    </div>
  );
}

export default App;
