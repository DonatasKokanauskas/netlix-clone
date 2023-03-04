import React, { useContext, useState } from "react";
import { createContext } from "react";

const MoviesDataContext = createContext();

export const useMoviesData = () => {
  return useContext(MoviesDataContext);
};

export const MoviesDataProvider = ({ children }) => {
  const [trending, setTrending] = useState([]);
  const randomNumber = Math.floor(Math.random() * trending.length);

  const [randomTitle, setRandomTitle] = useState([]);
  const [randomName, setRandomName] = useState([]);
  const [randomOverview, setRandomOverview] = useState([]);
  const [randomMovieImage, setRandomMovieImage] = useState([]);

  return (
    <MoviesDataContext.Provider
      value={{
        trending,
        setTrending,
        randomNumber,
        randomTitle,
        setRandomTitle,
        randomName,
        setRandomName,
        randomOverview,
        setRandomOverview,
        setRandomMovieImage,
        randomMovieImage,
      }}
    >
      {children}
    </MoviesDataContext.Provider>
  );
};
