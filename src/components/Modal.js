import React from "react";
import ReactDom from "react-dom";
import "../style/css/Modal.css";
import { useMoviesData } from "../context/Context";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";

export default function Modal({ open, closeModal }) {
  const { randomMovie, randomNumber } = useMoviesData();
  if (open) {
    return ReactDom.createPortal(
      <div className="modal">
        <div className="modal__movie-info">
          <img
            src={`https://image.tmdb.org/t/p/original/${randomMovie[randomNumber]}`}
            alt=""
          />
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
          </div>
        </div>
      </div>,
      document.getElementById("root")
    );
  }
}
