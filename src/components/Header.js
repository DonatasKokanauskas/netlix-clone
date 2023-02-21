import React, { useState } from "react";
import "../style/css/header.css";
import Logo from "../images/logo.png";
import Search from "../images/search.png";
import Bell from "../images/bell.png";
import User from "../images/user.png";
import Vector from "../images/vector.png";

const Header = () => {
  return (
    <header>
      <nav>
        <img src={Logo} alt="Netflix logo" />
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">TV Shows</a>
          </li>
          <li>
            <a href="">Movies</a>
          </li>
          <li>
            <a href="">New & Popular</a>
          </li>
          <li>
            <a href="">My List</a>
          </li>
          <li>
            <a href="">Browse by Languages</a>
          </li>
        </ul>
      </nav>
      <div className="secondary-navigation">
        <img src={Search} alt="Search image" />
        <a href="">Kids</a>
        <img src={Bell} alt="Bell image" />
        <img src={User} alt="User's image" />
        <img src={Vector} alt="Vector" />
      </div>
    </header>
  );
};

export default Header;
