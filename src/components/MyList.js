import React, { useState } from "react";
import { useEffect } from "react";
import "../style/css/MyList.css";
import axios from "axios";
import { useMoviesData } from "../context/Context";
import MiniModal from "./MiniModal";

const MyList = () => {
  const { myList, setMyList } = useMoviesData();
  const [fetchedElement, setFetchedElement] = useState();

  useEffect(() => {
    const data = localStorage.getItem("myList");
    if (data) {
      setMyList(JSON.parse(data));
    }
  }, []);

  // console.log(myList);

  const fetchData = async (id, mediaType) => {
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

      // setFetchedImg((prevValue) => {
      //   return [data.map((data) => data.poster_path)];
      // });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        setFetchedElement(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [myList]);

  console.log(fetchedElement);

  return (
    <div className="my-list-page">
      {/* {loadingScreen && <LoadingScreen />} */}
      {/* <MiniModal />
      <Modal /> */}
      <div className="my-list-page__container">
        <h1>My List</h1>
        <h3>You haven't added any titles to your list yet</h3>
        <div className="list__cards">
          {fetchedElement &&
            fetchedElement.map((movie) => {
              return (
                <img
                  // value={movie.id}
                  // type={movie.first_air_date ? "TV show" : "movie"}
                  // onMouseOver={position}
                  // onMouseLeave={hoverLeave}
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
