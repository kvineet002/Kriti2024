// frontend/src/components/App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import People from "./pages/People";
import Project from "./pages/Project";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* Student Side Routes*/}
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore  />} />
      <Route path="/people" element={<People />} />
      <Route path="/project/" element={<Project />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/login" element={<Login />} />
     
    </Routes>
  </BrowserRouter>
  );
}

export default App;
