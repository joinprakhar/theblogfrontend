import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import styles from "./post.module.css";

export default function Post({ post }) {
  
  return (
    <div className={styles.post}>
      {post.length > 0 && 
        post.map((post) => {
          const { _id, title, summary, createdAt, image, category } =
            post;

          return (
            <article className={styles.card} key={_id}>
              <div className={styles.card__inner}>
                <div
                  className={`${styles.card__body} ${styles.card__body__front}`}
                >
                  <div className={styles.image}>
                    <Link to={`/post/${_id}`}>
                      {!image ? (
                        <img
                          src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                          alt=""
                        />
                      ) : (
                        <img src={image} alt="" />
                      )}
                    </Link>
                  </div>
                  <div className={styles.texts}>
                    <Link to={`/post/${_id}`}>
                      <h2 className="card_title">{title}</h2>
                    </Link>
                  </div>
                  <div className={styles.tags}>
                    <div className="info">
                      <a className={styles.author}>{category}</a>
                    </div>
                    <div>
                      <time className={styles.date}>
                        <a> {formatISO9075(new Date(createdAt))}</a>
                      </time>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.card__body} ${styles.card__body__back}`}
                >
                  <div className={styles.texts}>
                    <p className={styles.summary}>{summary}</p>
                    <Link to={`/post/${_id}`}>
                      <p className={styles.author}>Read More...</p>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
    </div>
  );
}
