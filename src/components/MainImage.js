import React from "react";
import "../style/css/mainImage.css";
import TestImg from "../images/testImage.webp";

const MainImage = () => {
  return (
    <div
      className="image-container"
      style={{
        backgroundImage: `url(${TestImg})`,
      }}
    ></div>
  );
};

export default MainImage;
