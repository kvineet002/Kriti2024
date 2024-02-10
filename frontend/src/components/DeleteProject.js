import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeleteProject({ onCancel,SERVER_URL,remainingtime }) {
  let menuRef = useRef();
 const {id}=useParams();

 const navigate=useNavigate();
 const [loading, setLoading] = useState(false);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm h-screen flex justify-center items-center z-50">
      <div
        className="relative rounded-lg py-3 my-auto  z-50 about-us my_shadow w-[90%] md:w-[45%]"
        ref={menuRef}
      >
        <div className="pb-2 w-full px-3 flex justify-between">
          <div className="text-[#bdbdbd] text-4xl font-bold">Alert</div>
     
        </div>
        <div className="my-3 flex justify-center text-white">
           <p className=" text-xl"> {`Add a new project after ${remainingtime} minutes `}</p>
        </div>
        <div className="flex px-3 justify-center md:mr-10 items-center gap-4 my-5 w-full">
                <div
                  onClick={onCancel}
                  className="bg-white w-full rounded-[33.5px]  border-white border-2 text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor-pointer text-black hover:opacity-75"
                >
                  Ok
                </div>

              </div>
      </div>
    </div>
  );
}

export default DeleteProject;
