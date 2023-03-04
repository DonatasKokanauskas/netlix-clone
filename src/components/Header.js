import React, { useState, useEffect } from "react";
import "../style/css/Header.css";
import Logo from "../images/logo.png";
import Search from "../images/search.png";
import Bell from "../images/bell.png";
import User from "../images/user.png";
import Vector from "../images/vector.png";

const Header = () => {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const handleScroll = (event) => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      style={
        scroll > 0
          ? {
              background:
                "linear-gradient(180deg, rgba(6,6,6,1) 0%, rgba(20,20,20,1) 100%)",
            }
          : {
              background:
                "linear-gradient(180deg,rgba(0,0,0,0.7) 0%,rgba(20, 20, 20, 0) 100%)",
            }
      }
    >
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
        <div className="user-container">
          <img src={User} alt="User's image" />
          <img src={Vector} alt="Vector" />
        </div>
      </div>
    </header>
  );
};

export default Header;
