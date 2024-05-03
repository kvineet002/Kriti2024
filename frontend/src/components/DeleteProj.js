import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeleteProj({ onCancel,SERVER_URL }) {
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

  const deleteProject = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${SERVER_URL}/project/delete`,{
        projectId:id
      });
      console.log('Project deleted:', response.data);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
    finally{
    setLoading(false);
      onCancel();
      navigate("/explore")
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm h-screen flex justify-center items-center z-50">
      <div
        className="relative rounded-lg py-3 my-auto  z-50 about-us my_shadow w-[90%] md:w-[45%]"
        ref={menuRef}
      >
        <div className="pb-2 w-full px-3 flex justify-between">
          <div className="text-[#bdbdbd] text-4xl font-bold">Confirm</div>
          <img
            src="/closeicon.svg"
            alt="close"
            className="cursor-pointer"
            onClick={onCancel}
          />
        </div>
        <div className="my-3 flex justify-center text-white">
           <p className=" text-xl"> Are you sure you want to do this?</p>
        </div>
        <div className="flex md:justify-end px-3 justify-center md:mr-10 items-center gap-4 my-5 w-full">
                <div
                  onClick={onCancel}
                  className="bg-white rounded-[33.5px]  border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor-pointer text-black hover:opacity-75"
                >
                  Cancel
                </div>
                <button
                onClick={deleteProject}
                  type="submit"
                  className="bg-red-500 rounded-[33.5px]  w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor text-black hover:opacity-75"
                 
                >
                  {loading?"Deleting...":"  Delete"}
                  
                </button>
              </div>
      </div>
    </div>
  );
}

export default DeleteProj;
