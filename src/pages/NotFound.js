import React from "react";
import "../style/css/NotFound.css";
import { Link } from "react-router-dom";
import { useMoviesData } from "../context/Context";

const NotFound = () => {
  const { setLoadingScreen } = useMoviesData();
  return (
    <div className="not-found-page">
      <h1>Lost your way?</h1>
      <p>
        Sorry, we can't find that page. You'll find lots to explore on the home
        page.
      </p>
      <Link to="/" onClick={() => setLoadingScreen(true)}>
        <button>CLONE Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
