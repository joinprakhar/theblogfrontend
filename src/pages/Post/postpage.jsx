import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import styles from "./postpage.module.css";
import Post from "./Post";
import Loading from "../../components/loading";
import { useCookies } from "react-cookie";
import Comment from "./comment";

export default function PostPage() {
  const [cookies, _] = useCookies(["access_token"]);
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [loading, setShowLoading] = useState(true);
  const [posts, setPost] = useState([]);

  let value = [id, cookies?.access_token?.Name];
  //console.log(value)

  useEffect(() => {
    fetch("https://blogbackend-e8fr.onrender.com/post").then((response) => {
      response.json().then((posts) => {
        setPost(posts);
      });
    });
  }, []);

  useEffect(() => {
    fetch(`https://blogbackend-e8fr.onrender.com/post/${id}`).then(
      (response) => {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
          setShowLoading(false);
        });
      }
    );
  }, [id]);

  if (!postInfo) return "";

  async function deletePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("id", id);
    data.set("userId", cookies?.access_token?.id);

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


  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <article className={styles.container}>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.postpart}>
            <div className={styles.image}>
              {!postInfo.image ? (
                <img
                  className="image"
                  src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                  alt=""
                />
              ) : (
                <img src={postInfo.image} alt="" />
              )}
            </div>
            <div className={styles.detailpart}>

              <div >
                <Link to={`/profile/${postInfo?.author?._id}`}>
                  <a>
                    Author :{" "}
                    {`${postInfo?.author?.firstName} 
                ${postInfo?.author?.lastName}`}
                  </a>
                </Link>
                <a>
                  <time>{formatISO9075(new Date(postInfo?.createdAt))}</time>
                </a>
              </div>
              <div className={styles.block}>
                {" "}
                {cookies?.access_token?.id === postInfo.author._id && (
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
                      <div className={styles.text}>Edit this post</div>
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
                      <div className={styles.text}>Delete this post</div>
                    </Link>
                  </div>
                )}
              </div>

              <div className="author">
                <Link to={`/profile/${postInfo?.author?._id}`}>
                  Author :{" "}
                  {`${postInfo?.author?.firstName} 
                ${postInfo?.author?.lastName}`}
                </Link>
              </div>
              <time>{formatISO9075(new Date(postInfo?.createdAt))}</time>

              {cookies?.access_token?.id === postInfo.author._id && (
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
                    <div className={styles.text}>Edit this post</div>
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
                    <div className={styles.text}>Delete this post</div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.postpart}>
          <div className={styles.cont}>
            <div className={styles.content}>
              <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            </div>
            <div className={styles.comment}>
              <Comment value={value} />
            </div>
          </div>
          <div className={styles.relatedPost}>
            <p className={styles.p}>Related Post</p>
            {loading ? (
              <Loading />
            ) : (
              <div className={styles.related}>
                <Post post={posts} />
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
