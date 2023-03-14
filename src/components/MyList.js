import React, { useState } from "react";
import { useEffect } from "react";
import "../style/css/MyList.css";
import axios from "axios";
import { useMoviesData } from "../context/Context";
import MiniModal from "./MiniModal";
import Modal from "./Modal";
import LoadingScreen from "./LoadingScreen";

const MyList = () => {
  const { myList, setMyList, position, hoverLeave, isLoading, setIsLoading } =
    useMoviesData();
  const [fetchedElement, setFetchedElement] = useState();

  useEffect(() => {
    setIsLoading(true);
    const data = localStorage.getItem("myList");
    if (data) {
      setMyList(JSON.parse(data));
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await Promise.all(
        myList.map((element) => {
          return axios.get(
            `https://api.themoviedb.org/3/${
              element.type === "TV show" ? "tv" : "movie"
            }/${
              element.id
            }?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US`
          );
        })
      );

      const data = response.map((response) => {
        return response.data;
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        const removeDuiplicates = [
          ...data
            .reduce((acc, obj) => acc.set(obj.id, obj), new Map())
            .values(),
        ];
        setFetchedElement(removeDuiplicates);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [myList]);

  return (
    <div className="my-list-page">
      {isLoading && <LoadingScreen />}
      <MiniModal />
      <Modal />
      <div className="my-list-page__container">
        <h1>My List</h1>

        {fetchedElement !== undefined && fetchedElement.length === 0 && (
          <h3>You haven't added any titles to your list yet</h3>
        )}
        <div className="my-list__cards">
          {fetchedElement &&
            fetchedElement.map((movie) => {
              return (
                <img
                  value={movie.id}
                  type={movie.first_air_date ? "TV show" : "movie"}
                  onMouseOver={position}
                  onMouseLeave={hoverLeave}
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  key={movie.id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MyList;
