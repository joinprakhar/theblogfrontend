import React, { useState, useEffect } from "react";
import styles from "./comment.module.css";

const Comment = ({ value }) => {
  const [comment, setComment] = useState("");
  const [getComment, getSetComment] = useState("");
  const data = {...value}
  const id = data[0];
  //console.log(id)
  async function fetchComment() {
    await fetch(`https://blogbackend-e8fr.onrender.com/comment/${id}`).then(
      (response) => {
        response.json().then((postInfo) => {
          getSetComment(postInfo[0]?.comments);
        });
      }
    );
  }

  async function createNewPost(ev) {
    if (!value[1]) {
      alert("Please select a file");
    } else {
      const data = new FormData();
      data.set("userid", value[1]);
      data.set("blogId", value[0]);
      data.set("comment", comment);
      ev.preventDefault();
      const response = await fetch(
        "https://blogbackend-e8fr.onrender.com/createComment",
        {
          method: "POST",
          body: data,
          credentials: "include",
        }
      );
      if (response.ok) {
        //console.log("commented successfully");
        setComment("");
        fetchComment();
      }
    }
  }

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <div>
      <h3>Add new Comment</h3>

      <form className={styles.containers} onSubmit={createNewPost}>
        <div className={styles.image}>
          <img
            className={styles.images}
            src="https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon.png"
            alt="img"
          />
        </div>
        <div className={styles.comment}>
          {value[1] ? `${value[1]}` : "Sign In to Comment"}
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button>Post your Comment</button>
        </div>
      </form>
      <h3>Comments</h3>
      {getComment
        ? getComment.map((data) => {
            const { userid, comment } = data;
            return (
              <div className={styles.container}>
                <div className={styles.image}>
                  <img
                    className={styles.images}
                    src="https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon.png"
                    alt="img"
                  />
                </div>
                <div className={styles.comment}>
                  <h4>{userid}</h4>
                  <p>{comment}</p>
                </div>
              </div>
            );
          })
        : "No comments"}
    </div>
  );
};

export default Comment; 

//{cookies ? `${cookies.access_token.Name}` : "Sign In to Comment"}
