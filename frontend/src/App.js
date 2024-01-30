// frontend/src/components/App.js
import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* Student Side Routes*/}
      <Route path="*" element={<Login />} />
      <Route path="/" element={<Home />} />
     
    </Routes>
  </BrowserRouter>
  );
}

export default App;
