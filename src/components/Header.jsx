import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [ first, setFirst] = useState(true)
  function profile() {
    fetch(
      "https://blogbackend-e8fr.onrender.com/profile",
      {
        credentials: "include",
      }
    ).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setFirst(false);
      });
    });
  }
    function profileAgain() {
      const data = new FormData();
      data.set("token", userInfo.token);
      fetch("https://blogbackend-e8fr.onrender.com/profile", {
        method: "POST",
        body: data,
        credentials: "include",
      }).then((response) => {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
        });
      });
    }

  useEffect(() => {
    if(first){
      profile()
    }else {
      profileAgain();
    }
   
    
  }, []);
console.log(userInfo);


  function logout() {
    setUserInfo(null);
    fetch("https://blogbackend-e8fr.onrender.com/logout", {
      credentials: "include",
      method: "POST",
    });
  }

  return (
    <div>
      <header>
        <Link to="/" className="logo">
          The Post
        </Link>
        <nav>
          {userInfo && (
            <>
              <Link to="/create">Create new post</Link>
              <Link to={`/profile/${userInfo?.id}`}>{userInfo?.Name}</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          )}
          {!userInfo && (
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
