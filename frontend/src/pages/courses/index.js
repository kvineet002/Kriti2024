import React from "react";
import Navbar2 from "../../components/navbar2";
import CommentDrawer from "../../components/CommentDrawer";
import Footer from "../../components/Footer";

function Courses({SERVER_URL}) {
  return (
    <div>
      <Navbar2  SERVER_URL={SERVER_URL}/>
      <div className=" mt-[15%]"></div>
      <CommentDrawer />   
      <Footer/>
    </div>
  );
}

export default Courses;
