// frontend/src/components/App.js
import React, { useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Project from "./pages/Project";
import People from "./pages/People";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Community from "./pages/community";
import Notification from "./pages/notification";

function App() {
  const [loggedIn, setLoggedIn] = useState(false||localStorage.getItem('token'));
  const SERVER_URL="https://dihingkriti2024-backend.vercel.app"
  // const SERVER_URL="http://localhost:3002"
  const Wrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
  } 
  return (
    <BrowserRouter>
    <Wrapper>
    <Routes>
      {/* Student Side Routes*/}
    { <Route path="/" element={loggedIn?<Explore SERVER_URL={SERVER_URL}/>:<Home SERVER_URL={SERVER_URL}/>} />}
      <Route path="/explore" element={<Explore SERVER_URL={SERVER_URL}/>} />
      <Route path="/people" element={<People SERVER_URL={SERVER_URL} />} />
      {/* <Route path="/community" element={<Community SERVER_URL={SERVER_URL} />} /> */}
      <Route path="/project/:id" element={<Project SERVER_URL={SERVER_URL} />} />
      <Route path="/profile/:id" element={<Profile SERVER_URL={SERVER_URL}/>} />
      <Route path="/login" element={<Login SERVER_URL={SERVER_URL} />} />
      {/* <Route path="/notifications/:id" element={<Notification SERVER_URL={SERVER_URL} />} /> */}
     
    </Routes>
    </Wrapper>
  </BrowserRouter>
  );
}

export default App;
