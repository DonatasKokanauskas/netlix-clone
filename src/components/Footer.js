import React from "react";
import "../style/css/Footer.css";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <a href="">
          <GrFacebookOption />
        </a>
        <a href="">
          <AiOutlineInstagram />
        </a>
        <a href="">
          <AiFillYoutube />
        </a>
      </div>

      <p>{new Date().getFullYear()} CLONE</p>
    </div>
  );
};

export default Footer;
