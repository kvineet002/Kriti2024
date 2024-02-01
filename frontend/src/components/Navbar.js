import React, { useState } from "react";
import LoginModal from "./LoginModal";

function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="fixed top-0 w-full z-50">
    <nav className=" bg-[#0c0c0c97] p-6 w-full md:px-12">
      <div className=" flex flex-col items-center justify-center">
        <div className=" ">
        <div> <div className="uppercase font-semibold text-2xl flex text-white">
            <span className="tracking-tight cursor-pointer">Collampus</span>
            {!loggedIn&&  <button
          className="border-2 px-4 py-2 bg-white text-black border-black rounded-[25px]   hover:bg-black hover:text-white text-sm"
          onClick={() => {
            setShowLoginModal(true);
          }}
        >
          Get Started
        </button>}
          </div></div> 
         {loggedIn&& <button className="block mt-4 lg:inline-block lg:mt-0 text-white hover:underline mr-4">
            Home
          </button>}
          <button className="block mt-4 lg:inline-block lg:mt-0 text-white hover:underline mr-4">
            Explore
          </button>
          <button className="block mt-4 lg:inline-block lg:mt-0 text-white hover:underline mr-4">
            Projects
          </button>
          <button className="block mt-4 lg:inline-block lg:mt-0 text-white hover:underline">
            People
          </button>
        </div>
    
      </div>
      {/*Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}


     
          {loggedIn && (
            <form className="flex">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 rounded-lg border-transparent focus:border-gray-300 focus:outline-none focus:shadow-outline-blue bg-gray-100 bg-opacity-25 form-input w-full mr-2"
              />
              <button
                type="submit"
                className="flex items-center bg-gray-100 bg-opacity-25 hover:bg-gray-200 hover:bg-opacity-50 text-white font-semibold py-2 px-4 rounded-lg"
              >
                <svg
                  className="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35-5.33a8 8 0 0 1 0 1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
                Search
              </button>
            </form>
          )}
    </nav></div>
  );
}

export default Navbar;
