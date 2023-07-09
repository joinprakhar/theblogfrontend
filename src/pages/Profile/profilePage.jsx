import React, { useContext, useEffect, useState } from "react";
import styles from "./profilePage.module.css";
import { useParams } from "react-router-dom";
import UserPost from "./userPost";

const ProfilePage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch(
      `https://blogbackend-e8fr.onrender.com/user/${id}`
    ).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo?.result);
        setUserInfo(postInfo?.userDoc);
      });
    });
  }, []);
const count = postInfo?.length

  

  if (!postInfo) return "";

  const info = userInfo?.info;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <img
          src="https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon.png"
          alt=""
          className={styles.pic}
        ></img>
        <div>
          <p className={styles.name}>
            {`${userInfo?.firstName}
            ${userInfo?.lastName}`}
          </p>
          <p>Web Developer</p>
          <p>{info?.email}</p>
          <p>Total Post : {count} </p>
        </div>
      </div>
      {postInfo.length > 0 &&
        postInfo.map((post) => {
          return (
            <div key={post?._id}>
              <UserPost post={post} id={userInfo?._id} />
            </div>
          );
        })}
      <div className={styles.content}></div>
    </div>
  );
};

export default ProfilePage;


