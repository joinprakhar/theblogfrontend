import React, { useEffect, useState } from "react";
import Post from "./Post";
import styles from "./post.module.css";

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
        <section className={styles.dots_container}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </section>
      ) : (
        <Post post={posts} />
      )}
      
    </div>
  );
};

export default IndexPage;
