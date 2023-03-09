import React, { useState, useEffect } from "react";
import "../style/css/Header.css";
import Logo from "../images/logo.png";
import Search from "../images/search.png";
import Bell from "../images/bell.png";
import User from "../images/user.png";
import Vector from "../images/vector.png";
import { AiOutlineClose } from "react-icons/ai";
import { Outlet, Link } from "react-router-dom";

const Root = () => {
  const [scroll, setScroll] = useState(0);
  const [searchPressed, setSearchPressed] = useState(false);
  const input = document.querySelector(".search");
  useEffect(() => {
    const handleScroll = (event) => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openSearch = () => {
    input.classList.add("search--active");
    setSearchPressed(true);
  };

  const closeSearch = () => {
    input.classList.remove("search--active");
    setSearchPressed(false);
  };

  return (
    <>
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
          <Link className="logo-container" to="/">
            <img src={Logo} alt="Netflix logo" />
          </Link>
          {/* <img src={Logo} alt="Netflix logo" /> */}
          <ul>
            <li>
              <Link to="/">Home</Link>
              {/* <a href="">Home</a> */}
            </li>
            <li>
              <Link to="TVShows">TV Shows</Link>
              {/* <a href="">TV Shows</a> */}
            </li>
            <li>
              <Link to="Movies">Movies</Link>
              {/* <a href="">Movies</a> */}
            </li>
            <li>
              <Link to="NewAndPopular">New & Popular</Link>
              {/* <a href="">New & Popular</a> */}
            </li>
            <li>
              <Link to="MyList">My List</Link>
              {/* <a href="">My List</a> */}
            </li>
            <li>
              <Link to="#">Browse by Languages</Link>
              {/* <a href="">Browse by Languages</a> */}
            </li>
          </ul>
        </nav>
        <div className="secondary-navigation">
          {!searchPressed ? (
            <div className="search" onClick={openSearch}>
              <Link to="Search">
                <img src={Search} alt="Search image" />
              </Link>
            </div>
          ) : (
            <div className="search">
              <img src={Search} alt="Search image" />
              <div>
                <input type="text" placeholder="Titles" />
                <span onClick={closeSearch}>
                  <AiOutlineClose />
                </span>
              </div>
            </div>
          )}

          <Link to="#">Kids</Link>
          {/* <a href="">Kids</a> */}
          <img src={Bell} alt="Bell image" />
          <div className="user-container">
            <img src={User} alt="User's image" />
            <img src={Vector} alt="Vector" />
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
