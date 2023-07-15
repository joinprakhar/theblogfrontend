import React, { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function CreatePost() {
  const [cookies, _] = useCookies(["access_token"]);
  const cat = [
    "International",
    "Education",
    "Politics",
    "Economy",
    "Buisness",
    "Fashion",
    "Entertainment",
    "Sport",
    "Technology",
    "Other",
  ];
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [redirect, setRedirect] = useState(false);

  

  async function createNewPost(ev) {
    if (!title) {
      alert("Please select a file");
    } else {
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("image", image);
      data.set("category", type);
      data.set("email", cookies.access_token.email);
      ev.preventDefault();
      const response = await fetch(
        "https://blogbackend-e8fr.onrender.com/post",
        {
          method: "POST",
          body: data,
          headers: { authorization: cookies.access_token.token },
        }
      );
      if (response.ok) {
        setRedirect(true);
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  console.log(type)
  return (
    <>
      {!cookies.access_token ? (
        <div className="notSignin">
          <h3>Please signin to Create Post</h3>
        </div>
      ) : (
        <form className="createPost" onSubmit={createNewPost}>
          Title
          <input
            type="title"
            placeholder={"Title"}
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          Summary
          <input
            type="summary"
            placeholder={"Summary"}
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
          />
          Image
          <input
            type="text"
            placeholder={"Image URL"}
            value={image}
            onChange={(ev) => setImage(ev.target.value)}
          />
          Category---{type}
          <div className="categoryChooserbox">
            {cat &&
              cat.map((value, index) => (
                <div
                  className="categoryChooser"
                  value={value}
                  onClick={() => setType(value)}
                  key={index}
                >
                  {value}
                </div>
              ))}
          </div>
          Content
          <Editor value={content} onChange={setContent} />
          <button style={{ marginTop: "5px" }}>Create post</button>
        </form>
      )}
    </>
  );
}
//<input type="file" onChange={(ev) => setFiles(ev.target.files)} />
