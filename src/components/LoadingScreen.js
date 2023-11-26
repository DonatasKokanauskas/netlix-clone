import React from "react";
import "../style/css/LoadingScreen.css";
import Spinner from "../images/spinner.png";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <img src={Spinner} alt="loading" />
    </div>
  );
}
