import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/Post/IndexPage";
import Login from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/RegisterPage";
import { ToastProvider } from "./context/userContext.jsx";
import CreatePost from "./pages/Post/CreatePost";
import Postpage from "./pages/Post/postpage.jsx";
import EditPost from "./pages/Post/EditPost";
import ProfilePage from "./pages/Profile/profilePage";


const App = () => {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<Postpage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/profile/:id" element={<ProfilePage />} /> 
        </Route>
      </Routes>
    </ToastProvider>
  );
};

export default App;
