import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useCookies } from "react-cookie";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  function logout() {
    setCookies("access_token", "");
    window.localStorage.clear();
  }

  //console.log(cookies?.access_token);
  return (
    <nav className="main-nav">
      {/* 1st logo part  */}
      <div className="logo">
        <h2 className="logoss">
          <Link to="/">
            <div>
              <span>T</span>he
              <span> P</span>ost
            </div>
          </Link>
        </h2>
      </div>

      {/* 2nd menu part  */}
      <div
        className={showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"}
      >
        <ul className="lili" onClick={() => setShowMediaIcons(false)}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {cookies.access_token && (
            <li>
              <NavLink to="/create">Create new post</NavLink>
            </li>
          )}
          {cookies.access_token && (
            <li>
              <NavLink to={`/profile/${cookies.access_token.id}`}>
                {cookies?.access_token?.Name}
              </NavLink>
            </li>
          )}
          {cookies.access_token && (
            <li>
              <NavLink to="/" onClick={logout}>
                Logout
              </NavLink>
            </li>
          )}
          {!cookies.access_token && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {!cookies.access_token && (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}
          <li>
            <NavLink to="https://joinprakhar.netlify.app/" target="_blank">
              contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* 3rd social media links */}
      <div className="social-media">
        {/* hamburget menu start  */}
        <div className="hamburger-menu">
          <Link to="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            <GiHamburgerMenu />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
/* <header>
  <Link to="/" className="logo">
    The Post
  </Link>
  <nav>
    {cookies.access_token && (
      <>
        <Link to="/create">Create new post</Link>
        <Link to={`/profile/${cookies.access_token.id}`}>
          {cookies?.access_token?.Name}
        </Link>
        <a href="/" onClick={logout}>
          Logout
        </a>
      </>
    )}
    {!cookies.access_token && (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    )}
  </nav>
</header>; */
