import React, { useState, useEffect } from "react";
import "../style/css/Header.css";
import Logo from "../images/logo.png";
import Search from "../images/search.png";
import Bell from "../images/bell.png";
import User from "../images/user.png";
import Vector from "../images/vector.png";
import { AiOutlineClose } from "react-icons/ai";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useMoviesData } from "../context/Context";
import ProfileMenu from "../components/ProfileMenu";

const Root = () => {
  const [scroll, setScroll] = useState(0);
  const [searchPressed, setSearchPressed] = useState(false);
  const input = document.querySelector(".search");
  const {
    setSearchKey,
    setLoadingScreen,
    searchKey,
    setIsHovered,
    setProfileIsHovered,
    handleMouseOver,
    handleMouseLeave,
  } = useMoviesData();
  const location = useLocation();
  const navigate = useNavigate();
  const userImage = document.querySelector("#user");
  const [leftPosition, setLeftPosition] = useState();

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
    setIsHovered(false);
    document.querySelector(".hovered").classList.remove("hovered");
  };

  useEffect(() => {
    if (searchKey.length > 0) {
      navigate("/Search");
    }

    if (location.pathname === "/Search" && searchKey.length === 0) {
      navigate("/");
      setLoadingScreen(true);
      setIsHovered(false);
      document.querySelector(".hovered").classList.remove("hovered");
    }
  }, [searchKey]);

  const boldNav = (page) => {
    return location.pathname === page
      ? { fontWeight: "bold" }
      : { fontWeight: "normal" };
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
              <Link to="/" onClick={closeSearch} style={boldNav("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="TVShows"
                onClick={closeSearch}
                style={boldNav("/TVShows")}
              >
                TV Shows
              </Link>
            </li>
            <li>
              <Link
                to="Movies"
                onClick={closeSearch}
                style={boldNav("/Movies")}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="NewAndPopular"
                onClick={closeSearch}
                style={boldNav("/NewAndPopular")}
              >
                New & Popular
              </Link>
            </li>
            <li>
              <Link
                to="MyList"
                onClick={closeSearch}
                style={boldNav("/MyList")}
              >
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
              <img src={Search} alt="Search" />
            </div>
          ) : (
            <div className="search">
              <img src={Search} alt="Search" />
              <div>
                <input
                  type="text"
                  placeholder="Titles"
                  onChange={(e) => {
                    setSearchKey(e.target.value);
                    setLoadingScreen(true);
                  }}
                />
                {location.pathname === "/" ||
                location.pathname === "/TVShows" ||
                location.pathname === "/Movies" ||
                location.pathname === "/NewAndPopular" ||
                location.pathname === "/MyList" ? (
                  <span onClick={closeSearch}>
                    <AiOutlineClose />
                  </span>
                ) : (
                  <Link to="/" onClick={closeSearch}>
                    <span onClick={closeSearch}>
                      <AiOutlineClose />
                    </span>
                  </Link>
                )}
              </div>
            </div>
          )}
          <Link to="#">Kids</Link>
          <img src={Bell} alt="Bell" />
          <div
            className="user-container"
            onMouseOver={() => {
              setLeftPosition(userImage.getBoundingClientRect().left - 127);
              handleMouseOver(setProfileIsHovered);
            }}
            onMouseLeave={() => {
              handleMouseLeave(setProfileIsHovered);
            }}
          >
            <img id="user" src={User} alt="User" />
            <img src={Vector} alt="Vector" />
            <ProfileMenu leftPosition={leftPosition} />
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
