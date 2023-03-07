import ReactDom from "react-dom";
import "../style/css/MiniModal.css";
import { useMoviesData } from "../context/Context";
import { AiFillCaretRight } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { BsHandThumbsUp } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";

export default function MiniModal() {
  const {
    leftPosition,
    topPosition,
    width,
    setHoverClass,
    isHovered,
    setIsHovered,
  } = useMoviesData();

  const imgElement = document.querySelector(".hovered");

  const position = () => {
    return {
      top: `${topPosition}px`,
      left: `${leftPosition}px`,
      width: `${width}px`,
    };
  };

  const hoverHandler = () => {
    setHoverClass(imgElement.classList.add("hovered"));
    setIsHovered(true);
  };

  const hoverLeave = () => {
    setIsHovered(false);
    setHoverClass(imgElement.classList.remove("hovered"));
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
            <div className="play">
              <span>
                <AiFillCaretRight />
              </span>
            </div>
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

          <div className="mini-modal__part__second-div">
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
