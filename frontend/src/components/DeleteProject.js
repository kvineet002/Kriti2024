import React, { useState, useEffect, useRef } from "react";

function DeleteProject({ onCancel }) {
  let menuRef = useRef();

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
        className="relative rounded-lg py-3 my-auto  z-50 about-us my_shadow w-[60%] md:w-[45%]"
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
           <p> Are you sure you want to do this?</p>
        </div>
        <div className="flex md:justify-end justify-center md:mr-10 items-center gap-4 my-5 w-full">
                <div
                  onClick={onCancel}
                  className="bg-white rounded-[33.5px]  border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor-pointer text-black hover:opacity-75"
                >
                  Cancel
                </div>
                <button
                  type="submit"
                  className="bg-white rounded-[33.5px]  border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor text-black hover:opacity-75"
                 
                >
                    Delete
                  
                </button>
              </div>
      </div>
    </div>
  );
}

export default DeleteProject;
