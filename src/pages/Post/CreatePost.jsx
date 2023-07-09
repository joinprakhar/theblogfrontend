import React, { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from './Editor';
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";


export default function CreatePost() {
    const { userInfo} = useContext(UserContext);
    console.log(userInfo);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  //const [files, setFiles] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [redirect, setRedirect] = useState(false);
  
  async function createNewPost(ev) {
    if(!title){
      alert("Please select a file");
    }else {
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("image", image);
      data.set("category", type);
     //data.set("file", files[0]);
      data.set("email", userInfo.email);
      ev.preventDefault();
      const response = await fetch(
        "https://blogbackend-e8fr.onrender.com/post",
        {
          method: "POST",
          body: data,
          credentials: "include",
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

 
  return (
    <form onSubmit={createNewPost}>
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
      <input
        type="text"
        placeholder={"Category"}
        value={type}
        onChange={(ev) => setType(ev.target.value)}
      />
      
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>
        Create post
      </button>
    </form>
  );
}
//<input type="file" onChange={(ev) => setFiles(ev.target.files)} />
