import React, { useEffect, useState } from "react";
import Post from "./Post";
import Loading from "../../components/loading";

const IndexPage = () => {
  const [posts, setPost] = useState([]);
  const [loading, setShowLoading] = useState(true);
  useEffect(() => {
    fetch(
      "https://blogbackend-e8fr.onrender.com/post"
    ).then((response) => {
      response.json().then((posts) => {
        setPost(posts);
        setShowLoading(false);
      });
    });
  }, []);

  
  return (
    <div className=".indexPage">
      {loading ? (
        <Loading/>
      ) : (
        <Post post={posts} />
      )}
      
    </div>
  );
};

export default IndexPage;
