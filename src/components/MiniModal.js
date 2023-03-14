import ReactDom from "react-dom";
import "../style/css/MiniModal.css";
import { useMoviesData } from "../context/Context";
import { AiFillCaretRight } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { BsHandThumbsUp } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import { CgCheck } from "react-icons/cg";

export default function MiniModal() {
  const {
    leftPosition,
    topPosition,
    width,
    isHovered,
    setIsHovered,
    setIsOpen,
    setMovieId,
    setType,
    myList,
    setMyList,
  } = useMoviesData();

  const imgElement = document.querySelector(".hovered");
  const [mouseOverAdd, setMouseOverAdd] = useState(false);
  const [mouseOverThumb, setMouseOverThumb] = useState(false);
  const [mouseOverArrow, setMouseOverArrow] = useState(false);

  const position = () => {
    return {
      top: `${topPosition}px`,
      left: `${leftPosition}px`,
      width: `${width}px`,
    };
  };

  const hoverHandler = (e) => {
    imgElement.classList.add("hovered");
    setIsHovered(true);

    setMovieId(e.relatedTarget.getAttribute("value"));
    setType(e.relatedTarget.getAttribute("type"));
  };

  const hoverLeave = () => {
    setIsHovered(false);
    imgElement.classList.remove("hovered");
  };
  const handleClick = () => {
    setIsOpen(true);
  };
  //--------------

  useEffect(() => {
    const data = localStorage.getItem("myList");
    if (data) {
      setMyList(JSON.parse(data));
    }
  }, []);

  const getIdAndType = () => {
    setMouseOverAdd(false);
    if (
      myList.filter((obj) => obj.id === imgElement.getAttribute("value"))
        .length > 0
    ) {
      setMyList(
        myList.filter((obj) => obj.id !== imgElement.getAttribute("value"))
      );
      setIsHovered(false);
      imgElement.classList.remove("hovered");
    } else {
      setMyList(() => {
        return [
          ...myList,
          {
            id: imgElement.getAttribute("value"),
            type: imgElement.getAttribute("type"),
          },
        ];
      });
    }
  };

  useEffect(() => {
    if (myList.length > 0) {
      localStorage.setItem("myList", JSON.stringify(myList));
    } else {
      localStorage.setItem("myList", []);
    }
  }, [myList]);
  //----------------

  const handleMouseOver = (state) => {
    state(true);
  };
  const handleMouseLeave = (state) => {
    state(false);
  };
  if (isHovered) {
    return ReactDom.createPortal(
      <div
        onMouseOver={hoverHandler}
        onMouseLeave={hoverLeave}
        className="mini-modal"
        style={position()}
      >
        <div className="mini-modal__part">
          <div className="mini-modal__part__first-div">
            <div className="play" onClick={handleClick}>
              <span>
                <AiFillCaretRight />
              </span>
            </div>

            <div className="add-container">
              {mouseOverAdd &&
                myList.filter(
                  (obj) => obj.id === imgElement.getAttribute("value")
                ).length === 0 && <div className="bubble">Add to My List</div>}
              {mouseOverAdd &&
                myList.filter(
                  (obj) => obj.id === imgElement.getAttribute("value")
                ).length > 0 && (
                  <div className="bubble" style={{ width: "170px" }}>
                    Remove from My List
                  </div>
                )}
              <div
                className="add"
                onMouseOver={() => handleMouseOver(setMouseOverAdd)}
                onMouseLeave={() => handleMouseLeave(setMouseOverAdd)}
                onClick={getIdAndType}
              >
                {imgElement &&
                myList.filter(
                  (obj) => obj.id === imgElement.getAttribute("value")
                ).length > 0 ? (
                  <span>
                    <CgCheck />
                  </span>
                ) : (
                  <span>
                    <IoIosAdd />
                  </span>
                )}
              </div>
            </div>

            <div className="thumb-container">
              {mouseOverThumb && <div className="bubble">Like this</div>}
              <div
                className="thumb"
                onMouseOver={() => handleMouseOver(setMouseOverThumb)}
                onMouseLeave={() => handleMouseLeave(setMouseOverThumb)}
              >
                <span>
                  <BsHandThumbsUp />
                </span>
              </div>
            </div>
          </div>

          <div className="mini-modal__part__second-div" onClick={handleClick}>
            <div className="arrow-container">
              {mouseOverArrow && <div className="bubble">Info</div>}
              <div
                className="arrow"
                onMouseOver={() => handleMouseOver(setMouseOverArrow)}
                onMouseLeave={() => handleMouseLeave(setMouseOverArrow)}
              >
                <span>
                  <FiChevronDown />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("portal")
    );
  }
}
