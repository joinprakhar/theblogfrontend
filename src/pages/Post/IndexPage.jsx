import React, { useEffect, useState } from "react";
import Post from "./Post";

const IndexPage = () => {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    fetch(
      "https://blogbackend-e8fr.onrender.com/post"
    ).then((response) => {
      response.json().then((posts) => {
        setPost(posts);
      });
    });
  }, []);

  
  return (
    <div className=".indexPage">
      <Post post={posts} />
    </div>
  );
};

export default IndexPage;
