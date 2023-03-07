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

  const [isOpen, setIsOpen] = useState(false);

  const [leftPosition, setLeftPosition] = useState();
  const [topPosition, setTopPosition] = useState();
  const [width, setWidth] = useState();

  const [isHovered, setIsHovered] = useState(false);
  const [hoverClass, setHoverClass] = useState();
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
        setLeftPosition,
        setTopPosition,
        leftPosition,
        topPosition,
        setWidth,
        width,
        isOpen,
        setIsOpen,
        hoverClass,
        setHoverClass,
        isHovered,
        setIsHovered,
      }}
    >
      {children}
    </MoviesDataContext.Provider>
  );
};
