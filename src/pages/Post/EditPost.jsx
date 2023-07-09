import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "./Editor";
import { UserContext } from "../../context/userContext";

export default function EditPost() {
  const { userInfo } = useContext(UserContext);
  console.log(userInfo.id);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
 // const [files, setFiles] = useState("");
  const [image, setImage] = useState("");

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("https://blogbackend-e8fr.onrender.com/post/" + id).then(
      (response) => {
        response.json().then((postInfo) => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
          setImage(postInfo.image);
        });
      }
    );
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("image", image);
    data.set("id", id);
    data.set("userId", userInfo.id);
    // if (files?.[0]) {
    //   data.set("file", files?.[0]);
    // }
    const response = await fetch(
      "https://blogbackend-e8fr.onrender.com/post/",
      {
        method: "PUT",
        body: data,
        credentials: "include",
      }
    );
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />

      <input
        type="text"
        placeholder={"Image URL"}
        value={image}
        onChange={(ev) => setImage(ev.target.value)}
      />

      
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
}
//<input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      