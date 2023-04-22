import React from "react";
import "../style/css/Footer.css";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <a href="https://www.facebook.com/netflix/">
          <GrFacebookOption />
        </a>
        <a href="https://www.instagram.com/Netflix/">
          <AiOutlineInstagram />
        </a>
        <a href="https://www.youtube.com/@Netflix">
          <AiFillYoutube />
        </a>
      </div>

      <p>{new Date().getFullYear()} Netflix clone</p>
    </div>
  );
};

export default Footer;
