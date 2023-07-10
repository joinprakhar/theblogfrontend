import React from 'react'
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <section className={styles.dots_container}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </section>
  );
}

export default Loading