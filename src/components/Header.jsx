import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";
import { useCookies } from "react-cookie";

const Header = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

   

  // useEffect(() => {
  //     profile()    
  // }, []);


  function logout() {
    
    setCookies("access_token", "");
    window.localStorage.clear();

  }
//console.log(cookies?.access_token);
  return (
    <div>
      <header>
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
      </header>
    </div>
  );
};

export default Header;
