// frontend/src/components/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Project from "./pages/Project";
import People from "./pages/People";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Courses from "./pages/courses";

function App() {
  const [isAuthenticated,setisAuthenticated]=useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const SERVER_URL="https://dihingkriti2024-backend.vercel.app"
  // const SERVER_URL="http://localhost:3002"
  return (
    <BrowserRouter>
    <Routes>
      {/* Student Side Routes*/}
    { <Route path="/" element={loggedIn?<Explore SERVER_URL={SERVER_URL}/>:<Home SERVER_URL={SERVER_URL}/>} />}
      <Route path="/explore" element={<Explore SERVER_URL={SERVER_URL}/>} />
      <Route path="/people" element={<People SERVER_URL={SERVER_URL} />} />
      <Route path="/courses" element={<Courses SERVER_URL={SERVER_URL} />} />
      <Route path="/project/:id" element={<Project SERVER_URL={SERVER_URL} />} />
      <Route path="/profile/:id" element={<Profile SERVER_URL={SERVER_URL}/>} />
      <Route path="/login" element={<Login SERVER_URL={SERVER_URL} />} />
     
    </Routes>
  </BrowserRouter>
  );
}

export default App;
