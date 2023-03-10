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
  const [isLoading, setIsLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root setSearchKey={setSearchKey} />}>
        <Route index element={<Home setIsLoading={setIsLoading} />} />
        <Route
          path="TVShows"
          element={<TVShows setIsLoading={setIsLoading} />}
        />
        <Route path="Movies" element={<Movies />} />
        <Route path="NewAndPopular" element={<NewAndPopular />} />
        <Route path="MyList" element={<MyList />} />
        <Route path="Search" element={<Search searchKey={searchKey} />} />
      </Route>
    )
  );

  return (
    <div className="app">
      {/* <Header /> */}
      {isLoading && <LoadingScreen />}

      <RouterProvider router={router} />

      {/* <Home setIsLoaded={setIsLoaded} /> */}
    </div>
  );
}

export default App;
