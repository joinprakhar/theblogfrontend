import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "./Editor";
import { useCookies } from "react-cookie";
import { useToast } from "../../context/userContext";

export default function EditPost() {
  const [cookies, _] = useCookies(["access_token"]);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const showToast = useToast();
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
    if (!title || !summary || !content || !image) {
      showToast("Complete all feilds", "error");
    } else {
      ev.preventDefault();
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("image", image);
      data.set("id", id);
      data.set("userId", cookies.access_token.id);
      const response = await fetch(
        "https://blogbackend-e8fr.onrender.com/post/",
        {
          method: "PUT",
          body: data,
          headers: { authorization: cookies.access_token.token },
        }
      );
      if (response.ok) {
        setRedirect(true);
        showToast("Loged In SuccesFull!", "success");
      }else{
        showToast("Failed to Edit..!", "error");
      }
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
