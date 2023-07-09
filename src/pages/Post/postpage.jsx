import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import styles from "./postpage.module.css";
import Post from "./Post";

export default function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo} = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

    const [posts, setPost] = useState([]);
    useEffect(() => {
      fetch("https://blogbackend-e8fr.onrender.com/post").then((response) => {
        response.json().then((posts) => {
          setPost(posts);
        });
      });
    }, []);

  useEffect(() => {
    fetch(
      `https://blogbackend-e8fr.onrender.com/post/${id}`
    ).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []); 

  if (!postInfo) return "";

  async function deletePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("id", id);
    data.set("userId", userInfo.id);
    

    const response = await fetch(`https://blogbackend-e8fr.onrender.com/post`, {
      method: "DELETE",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  console.log(posts)

  return (
    <div className="post-page">
      <h2>{postInfo.title}</h2>
      <article className={styles.container}>
        <div className={styles.postpart}>
          <div className="image">
            {!postInfo.image ? (
              <img
                src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                alt=""
              />
            ) : (
              <img src={postInfo.image} alt="" />
            )}
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
          />
        </div>
        <div className={styles.detailpart}>
          <div className="author">
            <Link to={`/profile/${postInfo?.author?._id}`}>
              by @{" "}
              {`${postInfo?.author?.firstName} 
        ${postInfo?.author?.lastName}`}
            </Link>
          </div>
          <time>{formatISO9075(new Date(postInfo?.createdAt))}</time>

          {userInfo?.id === postInfo.author._id && (
            <div className={styles.button}>
              <Link className={styles.btn} to={`/edit/${postInfo?._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                <text>Edit this post</text>
              </Link>
              <Link className={styles.btn} onClick={deletePost}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 6V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5zm6.414 8l1.768-1.768-1.414-1.414L12 12.586l-1.768-1.768-1.414 1.414L10.586 14l-1.768 1.768 1.414 1.414L12 15.414l1.768 1.768 1.414-1.414L13.414 14zM9 4v2h6V4H9z"
                  />
                </svg>
                <text>Delete this post</text>
              </Link>
            </div>
          )}
          <p>Related Post</p>
          <div className={styles.related}>
            
            <Post post={posts} />
          </div>
        </div>
      </article>
    </div>
  );
}
