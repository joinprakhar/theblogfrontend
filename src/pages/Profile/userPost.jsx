import { Link } from "react-router-dom";
import styles from "./profilePage.module.css";
import { formatISO9075 } from "date-fns";


const UserPost = ({ post}) => {
  const { _id, title, summary, createdAt, image, category } = post;

  return (
    <div className={styles.containerPost}>
      <div className={styles.content} key={_id}>
        <div className={styles.img}>
          <img src={image} alt="" className={styles.image} />
        </div>
        <div className={styles.text}>
          <div className={styles.button}>
            <div className={styles.clicks}>
              {" "}
              Created On -{formatISO9075(new Date(createdAt))}
              <div className={styles.cli}>{category}</div>
            </div>
            <div className={styles.click}>
              <Link className="edit-btn" to={`/post/${_id}`}>
                <div className={styles.cl}>VIEW</div>
              </Link>
            </div>
          </div>
          <h3>{title}</h3>
          <p>{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
