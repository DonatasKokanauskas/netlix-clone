import React, { useContext, useState, createContext } from "react";

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
  const [movieId, setMovieId] = useState("");
  const [type, setType] = useState("");

  const [leftPosition, setLeftPosition] = useState();
  const [topPosition, setTopPosition] = useState();
  const [width, setWidth] = useState();

  const [isHovered, setIsHovered] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [myList, setMyList] = useState([]);

  const position = (e) => {
    e.target.classList.add("hovered");

    setIsHovered(true);
    setLeftPosition(e.target.getBoundingClientRect().left + window.scrollX);
    setTopPosition(
      e.target.getBoundingClientRect().top +
        window.scrollY +
        (e.target.getBoundingClientRect().height - 70)
    );
    setWidth(e.target.getBoundingClientRect().width);

    setMovieId(e.target.getAttribute("value"));
    setType(e.target.getAttribute("type"));
  };

  const hoverLeave = (e) => {
    setIsHovered(false);
    e.target.classList.remove("hovered");
  };

  const updatePosition = () => {
    const imgElement = document.querySelector(".hovered");

    if (imgElement) {
      setLeftPosition(imgElement.getBoundingClientRect().left + window.scrollX);
      setTopPosition(
        imgElement.getBoundingClientRect().top +
          window.scrollY +
          (imgElement.getBoundingClientRect().height - 70)
      );
      setWidth(imgElement.getBoundingClientRect().width);
    }
  };

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
        isHovered,
        setIsHovered,
        movieId,
        setMovieId,
        type,
        setType,
        searchKey,
        setSearchKey,
        position,
        hoverLeave,
        loadingScreen,
        setLoadingScreen,
        isLoading,
        setIsLoading,
        updatePosition,
        myList,
        setMyList,
      }}
    >
      {children}
    </MoviesDataContext.Provider>
  );
};
