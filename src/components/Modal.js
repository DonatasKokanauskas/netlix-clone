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

export default function Modal() {
  const { isOpen, setIsOpen, movieId, type } = useMoviesData();

  const [vote, setVote] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [isTrailerAvailable, setIsTrailerAvailable] = useState();
  const [date, setDate] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [age, setAge] = useState("");

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
          src={`https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`}
          alt=""
        />
      );
    }
  };

  const fetchVideo = async (id, mediaType) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${
        mediaType === "TV show" ? "tv" : "movie"
      }/${id}?api_key=7c21ca4ec675f18602bfd1f831746fab&append_to_response=videos`
    );
    const data = await response.data;
    return data;
  };

  useEffect(() => {
    // čia stebiu if'a, del movieId ir type reikalingumo ife.
    if ((movieId, type)) {
      fetchVideo(movieId, type).then((data) => {
        setSelectedMovie(data);

        setIsTrailerAvailable(data.videos.results.length);
      });
    }
  }, [movieId, type]);

  useEffect(() => {
    setVote(() => {
      if (selectedMovie.vote_average) {
        return selectedMovie.vote_average.toString().slice(0, 3);
      }
    });

    setGenres(() => {
      if (selectedMovie.genres) {
        const genres = selectedMovie.genres.map((genre) => {
          return genre.name;
        });
        return genres;
      }
    });

    setDate(() => {
      if (type === "movie") {
        return `Release date: ${selectedMovie.release_date}`;
      } else if (type === "TV show") {
        return `First air date: ${selectedMovie.first_air_date}`;
      }
    });

    setMediaType(() => {
      return type;
    });

    setAge(() => {
      if (selectedMovie.adult === true) {
        return "18+";
      } else if (selectedMovie.adult === false) {
        return "<18";
      } else {
        return "";
      }
    });
  }, [selectedMovie]);

  const body = document.querySelector("body");

  if (isOpen) {
    body.classList.add("no-scroll");
  } else {
    body.classList.remove("no-scroll");
  }

  if (isOpen) {
    return ReactDom.createPortal(
      <div className="modal">
        <div className="modal__container">
          <div className="trailer">
            {selectedMovie.videos ? renderTrailer() : null}
          </div>

          <div className="close" onClick={() => setIsOpen(false)}>
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
              {date && (
                <div className="date">
                  <p>{date}</p>
                </div>
              )}

              <div className="age-check">
                <label>{age}</label>
              </div>
              <div className="vote">
                <p>{vote}</p>
              </div>

              {mediaType && (
                <div className="media-type">
                  <label>{mediaType}</label>
                </div>
              )}

              <span>
                <BsChatRightText />
              </span>
            </div>

            <div className="genres">
              <label>Genres:</label>
              {genres ? (
                genres.map((name, index) => <label key={index}>{name}</label>)
              ) : (
                <label>not found</label>
              )}
            </div>
          </div>
          <div className="overview">
            <p>{selectedMovie.overview}</p>
          </div>
        </div>
      </div>,
      document.getElementById("portal")
    );
  }
}
