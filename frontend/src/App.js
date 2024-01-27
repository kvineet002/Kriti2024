// frontend/src/components/App.js
import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* Student Side Routes*/}
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
     
    </Routes>
  </BrowserRouter>
  );
}

export default App;
