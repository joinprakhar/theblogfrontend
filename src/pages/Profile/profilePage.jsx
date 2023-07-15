import React, { useEffect, useState } from "react";
import styles from "./profilePage.module.css";
import { useParams } from "react-router-dom";
import Tables from "../../components/Tables/Tables";

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

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.profile_detail}>
          <p className={styles.name}>
            {`${userInfo?.firstName}
            ${userInfo?.lastName}`}
          </p>
          <p>{userInfo?.email}</p>
          <p>Total Post : {count} </p>
        </div>
      </div>
      <div className={styles.tablecontent}>
        <Tables posted={postInfo} info={userInfo} />
      </div>
    </div>
  );
};

export default ProfilePage;


