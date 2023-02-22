import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../style/css/moviesCards.css";

const MoviesCards = () => {
  const [trending, setTrending] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day?api_key=7c21ca4ec675f18602bfd1f831746fab"
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        setTrending(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(trending);
  return (
    <div className="movies">
      <h2>Trending Now</h2>
      <div className="movies__cards">
        {trending.map((movie) => {
          return (
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt="trending-movie"
            />
          );
        })}
      </div>
    </div>
  );
};

export default MoviesCards;

// api key: 7c21ca4ec675f18602bfd1f831746fab
// trending now https://api.themoviedb.org/3/trending/all/day?api_key=7c21ca4ec675f18602bfd1f831746fab
