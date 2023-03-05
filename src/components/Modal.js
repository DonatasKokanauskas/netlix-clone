import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import "../style/css/Modal.css";
import axios from "axios";
import { useMoviesData } from "../context/Context";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsChatRightText } from "react-icons/bs";
import YouTube from "react-youtube";

export default function Modal({ open, closeModal }) {
  const { trending, randomMovieImage, randomNumber, randomOverview } =
    useMoviesData();
  const [allGenres, setAllGenres] = useState([]);
  const [releaseDate, setReleaseDate] = useState([]);
  const [airDate, setAirDate] = useState([]);
  const [age, setAge] = useState([]);
  const [vote, setVote] = useState([]);
  const [mediaType, setMediaType] = useState([]);
  const [movieGenreId, setMovieGenreId] = useState([]);
  const [genresNames, setGenresNames] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [isTrailerAvailable, setIsTrailerAvailable] = useState();

  const renderTrailer = () => {
    if (isTrailerAvailable > 0) {
      const trailer = selectedMovie.videos.results.find((vid) =>
        vid.name.includes("Trailer")
      );

      const key = trailer ? trailer.key : selectedMovie.videos.results[0].key;

      return <YouTube videoId={key} className={"youtube"} />;
    } else {
      return (
        <img
          src={`https://image.tmdb.org/t/p/original/${randomMovieImage}`}
          alt=""
        />
      );
    }
  };

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVideo = async (id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=7c21ca4ec675f18602bfd1f831746fab&append_to_response=videos`
    );
    const data = await response.data;
    return data;
  };

  useEffect(() => {
    fetchData(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=7c21ca4ec675f18602bfd1f831746fab&language=en-US"
    )
      .then((data) => {
        setAllGenres(data.genres);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setReleaseDate(() => {
      const date = trending.map((movie) => {
        return movie.release_date;
      });
      return date[randomNumber];
    });

    setAirDate(() => {
      const date = trending.map((movie) => {
        return movie.first_air_date;
      });
      return date[randomNumber];
    });

    setAge(() => {
      const age = trending.map((movie) => {
        return movie.adult;
      });
      return age[randomNumber];
    });

    setVote(() => {
      const vote = trending.map((movie) => {
        return movie.vote_average.toString().slice(0, 3);
      });
      return vote[randomNumber];
    });

    setMediaType(() => {
      const type = trending.map((movie) => {
        return movie.media_type;
      });
      return type[randomNumber];
    });

    setMovieGenreId(() => {
      const genre = trending.map((movie) => {
        return movie.genre_ids;
      });
      return genre[randomNumber];
    });

    setMovieId(() => {
      const id = trending.map((movie) => {
        return movie.id.toString();
      });
      return id[randomNumber];
    });
  }, [trending]);

  useEffect(() => {
    fetchVideo(movieId).then((data) => {
      setSelectedMovie(data);
      setIsTrailerAvailable(data.videos.results.length);
    });
  }, [movieId]);

  useEffect(() => {
    setGenresNames(() => {
      const names = allGenres.filter((item) => {
        if (movieGenreId.includes(item.id)) {
          return item.name;
        }
      });
      return names.map((item) => item.name);
    });
  }, [movieGenreId]);

  if (open) {
    return ReactDom.createPortal(
      <div className="modal">
        <div className="modal__container">
          <div className="trailer">
            {/* {selectedMovie.videos ? renderTrailer() : null} */}
            {selectedMovie.videos ? renderTrailer() : null}
          </div>

          {/* <img
            src={`https://image.tmdb.org/t/p/original/${randomMovieImage}`}
            alt=""
          /> */}

          <div className="close">
            <span>
              <AiOutlineClose />
            </span>
          </div>
          <div className="modal-buttons">
            <button>
              <AiFillCaretRight />
              Play
            </button>
            <div className="add">
              <span>
                <IoIosAdd />
              </span>
            </div>
            <div className="thumb">
              <span>
                <BsHandThumbsUp />
              </span>
            </div>
          </div>
          <div className="modal__container__info">
            <div className="info">
              <div className="date">
                <p>{releaseDate ? "Release date" : "First air date"}</p>
                <p>{releaseDate ? releaseDate : airDate}</p>
              </div>

              <div className="age-check">
                <label>{age ? "18+" : "<18"}</label>
              </div>
              <div className="vote">
                <p>{vote}</p>
              </div>
              <div className="media-type">
                <label>{mediaType}</label>
              </div>

              <span>
                <BsChatRightText />
              </span>
            </div>

            <div className="genres">
              <label>Genres:</label>
              {genresNames.map((name, index) => (
                <label key={index}>{name}</label>
              ))}
            </div>
          </div>
          <div className="overview">
            <p>{randomOverview}</p>
          </div>
        </div>
      </div>,
      document.getElementById("root")
    );
  }
}
