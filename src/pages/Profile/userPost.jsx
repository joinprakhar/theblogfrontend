import { Link } from "react-router-dom";
import styles from "./profilePage.module.css";
import { formatISO9075 } from "date-fns";
import Tables from "../../components/Tables/Tables";


const UserPost = ({ post ,info}) => {
  //const { _id, title, summary, createdAt, image, category } = post;
console.log(info)
  return (
    <div className={styles.containerPost}>
      <Tables post={post} info={info}/>
    </div>
  );
};

export default UserPost;
