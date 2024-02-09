import React from "react";
import Navbar2 from "../../components/navbar2";
import CommentDrawer from "../../components/CommentDrawer";
import Footer from "../../components/Footer";
import LinkPreviewImage from "../../components/CommentDrawer";

function Community({SERVER_URL}) {
  return (
    <div>
      <Navbar2  SERVER_URL={SERVER_URL}/>
      <div className=" mt-[15%]"></div>
      <CommentDrawer url={"https://www.coursera.org/specializations/machine-learning-introduction"} SERVER_URL={SERVER_URL}/>
      {/* // <LinkPreviewImage url={"https://www.youtube.com/watch?v=ahttNxGnLsQ"}/> */}
      <Footer/>
    </div>
  );
}

export default Community;
