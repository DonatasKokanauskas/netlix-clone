import React, { useState, useEffect } from "react";
import "../style/css/Header.css";
import Logo from "../images/logo.png";
import Search from "../images/search.png";
import Bell from "../images/bell.png";
import User from "../images/user.png";
import Vector from "../images/vector.png";
import { AiOutlineClose } from "react-icons/ai";
import { Outlet, Link } from "react-router-dom";

const Root = ({ setSearchKey }) => {
  const [scroll, setScroll] = useState(0);
  const [searchPressed, setSearchPressed] = useState(false);
  const input = document.querySelector(".search");

  useEffect(() => {
    const handleScroll = () => {
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
    setSearchKey([]);
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
          <Link className="logo-container" to="/" onClick={closeSearch}>
            <img src={Logo} alt="Netflix logo" />
          </Link>

          <ul>
            <li>
              <Link to="/" onClick={closeSearch}>
                Home
              </Link>
            </li>
            <li>
              <Link to="TVShows" onClick={closeSearch}>
                TV Shows
              </Link>
            </li>
            <li>
              <Link to="Movies" onClick={closeSearch}>
                Movies
              </Link>
            </li>
            <li>
              <Link to="NewAndPopular" onClick={closeSearch}>
                New & Popular
              </Link>
            </li>
            <li>
              <Link to="MyList" onClick={closeSearch}>
                My List
              </Link>
            </li>
            <li>
              <Link to="#">Browse by Languages</Link>
            </li>
          </ul>
        </nav>
        <div className="secondary-navigation">
          {!searchPressed ? (
            <div className="search" onClick={openSearch}>
              <Link to="Search">
                <img src={Search} alt="Search" />
              </Link>
            </div>
          ) : (
            <div className="search">
              <img src={Search} alt="Search" />
              <div>
                <input
                  type="text"
                  placeholder="Titles"
                  onChange={(e) => setSearchKey(e.target.value)}
                />
                <span onClick={closeSearch}>
                  <AiOutlineClose />
                </span>
              </div>
            </div>
          )}

          <Link to="#">Kids</Link>
          <img src={Bell} alt="Bell" />
          <div className="user-container">
            <img src={User} alt="User" />
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
