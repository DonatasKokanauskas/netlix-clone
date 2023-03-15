import { useEffect, useState } from "react";
import "./style/css/App.css";
import Root from "./pages/Root";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";
import NewAndPopular from "./pages/NewAndPopular";
import MyList from "./pages/MyList";
import Search from "./pages/Search";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { useMoviesData } from "./context/Context";

function App() {
  const { isLoading, setIsLoading, loadingScreen } = useMoviesData();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="TVShows" element={<TVShows />} />
        <Route path="Movies" element={<Movies />} />
        <Route path="NewAndPopular" element={<NewAndPopular />} />
        <Route path="MyList" element={<MyList />} />
        <Route path="Search" element={<Search />} />
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
      {isLoading && <LoadingScreen />}
      {loadingScreen && <LoadingScreen />}

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
