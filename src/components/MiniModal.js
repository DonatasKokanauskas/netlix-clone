import ReactDom from "react-dom";
import "../style/css/MiniModal.css";
import { useMoviesData } from "../context/Context";
import { AiFillCaretRight } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { BsHandThumbsUp } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";

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
  // const [myList, setMyList] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("myList");
    if (data) {
      setMyList(JSON.parse(data));
    }
  }, []);

  const getIdAndType = () => {
    setMyList(() => {
      return [
        ...myList,
        {
          id: imgElement.getAttribute("value"),
          type: imgElement.getAttribute("type"),
        },
      ];
    });
  };

  useEffect(() => {
    if (myList.length > 0) {
      localStorage.setItem("myList", JSON.stringify(myList));
    }
  });
  // console.log(myList);
  //----------------
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
            <div className="add" onClick={getIdAndType}>
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

          <div className="mini-modal__part__second-div" onClick={handleClick}>
            <div className="arrow">
              <span>
                <FiChevronDown />
              </span>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("portal")
    );
  }
}
