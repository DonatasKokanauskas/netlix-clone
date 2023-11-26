import React from "react";
import "../style/css/NavigationMenu.css";
import { useMoviesData } from "../context/Context";
import { Link } from "react-router-dom";

const NavigationMenu = ({ boldNav, closeSearch }) => {
  const { navMenuIsHovered } = useMoviesData();

  if (navMenuIsHovered) {
    return (
      <div className="navigation-menu">
        <div className="menu">
          <ul>
            <Link to="/" onClick={closeSearch} style={boldNav("/")}>
              <li>Home</li>
            </Link>

            <Link
              to="TVShows"
              onClick={closeSearch}
              style={boldNav("/TVShows")}
            >
              <li>TV Shows</li>
            </Link>

            <Link to="Movies" onClick={closeSearch} style={boldNav("/Movies")}>
              <li>Movies</li>
            </Link>

            <Link
              to="NewAndPopular"
              onClick={closeSearch}
              style={boldNav("/NewAndPopular")}
            >
              <li>New & Popular</li>
            </Link>

            <Link to="MyList" onClick={closeSearch} style={boldNav("/MyList")}>
              <li>My List</li>
            </Link>
            <Link to="#">
              <li>Browse by Languages</li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
};

export default NavigationMenu;
