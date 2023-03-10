import { useEffect, useState } from "react";
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
import { MoviesDataProvider } from "./context/Context";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root setIsLoading={setIsLoading} />}>
        <Route index element={<Home setIsLoading={setIsLoading} />} />
        <Route path="TVShows" element={<TVShows />} />
        <Route path="Movies" element={<Movies />} />
        <Route path="NewAndPopular" element={<NewAndPopular />} />
        <Route path="MyList" element={<MyList />} />
        <Route
          path="Search"
          element={<Search isLoading={isLoading} setIsLoading={setIsLoading} />}
        />
      </Route>
    )
  );

  useEffect(() => {
    setTimeout(() => {
      return setIsLoading(false);
    }, 200);
  }, [isLoading]);

  return (
    <div className="app">
      <MoviesDataProvider>
        {isLoading && <LoadingScreen />}

        <RouterProvider router={router} />
      </MoviesDataProvider>
    </div>
  );
}

export default App;
