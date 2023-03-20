import React, { useContext, useState, createContext } from "react";
import axios from "axios";

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
  const [mouseOverAdd, setMouseOverAdd] = useState(false);
  const imgElement = document.querySelector(".hovered");
  const [mouseOverThumb, setMouseOverThumb] = useState(false);
  const [likes, setLikes] = useState([]);

  const fetchData = async (url, state) => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      if (response.status === 200) {
        state(
          data.results.filter(
            (obj) => obj.poster_path && obj.backdrop_path != null
          )
        );
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        setTimeout(() => {
          setLoadingScreen(false);
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleMouseOver = (state) => {
    state(true);
  };
  const handleMouseLeave = (state) => {
    state(false);
  };

  const getIdAndType = (state, setState, id, type) => {
    setMouseOverAdd(false);
    setMouseOverThumb(false);
    if (state.filter((obj) => obj.id === id).length > 0) {
      setState(state.filter((obj) => obj.id !== id));
      setIsHovered(false);
      if (imgElement) {
        imgElement.classList.remove("hovered");
      }
    } else {
      setState(() => {
        return [
          ...state,
          {
            id: id,
            type: type,
          },
        ];
      });
    }
  };

  const fetchGenres = async (url, state) => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      if (response.status === 200) {
        state(data.genres);
      }
    } catch (error) {
      console.error(error);
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
        mouseOverAdd,
        setMouseOverAdd,
        handleMouseOver,
        handleMouseLeave,
        imgElement,
        getIdAndType,
        mouseOverThumb,
        setMouseOverThumb,
        likes,
        setLikes,
        fetchData,
        fetchGenres,
      }}
    >
      {children}
    </MoviesDataContext.Provider>
  );
};
