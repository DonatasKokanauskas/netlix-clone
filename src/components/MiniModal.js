import ReactDom from "react-dom";
import "../style/css/MiniModal.css";
import { useMoviesData } from "../context/Context";

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
        <div className="part"></div>
      </div>,
      document.getElementById("portal")
    );
  }
}
