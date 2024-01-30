import React, { useState } from "react";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
     <nav className="flex items-center justify-between flex-wrap bg-[#0c0c0c97] p-6">
      <div className="uppercase font-semibold text-2xl flex items-center flex-shrink-0 text-white mr-6">
        <span className="tracking-tight cursor-pointer">Collampus</span>
      </div>
      <div className="block lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 border rounded text-white border-white-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className={`${isOpen ? `block` : `hidden`} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
        <div className="text-sm lg:flex-grow">
          <form className="flex">
            <input type="text" placeholder="Search" className="px-4 py-2 rounded-lg border-transparent focus:border-gray-300 focus:outline-none focus:shadow-outline-blue bg-gray-100 bg-opacity-25 form-input w-full mr-2"/>
            <button type="submit" className="flex items-center bg-gray-100 bg-opacity-25 hover:bg-gray-200 hover:bg-opacity-50 text-gray-600 font-semibold py-2 px-4 rounded-lg">
              <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35-5.33a8 8 0 0 1 0 1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
              Search
            </button>
          </form>
        </div>
        <div>
          <button className="block mt-4 lg:inline-block lg:mt-0 text-white-200 hover:underline mr-4">
            Profile
          </button>
          <button className="block mt-4 lg:inline-block lg:mt-0 text-white-200 hover:underline mr-4">
            Projects
          </button>
          <button className="block mt-4 lg:inline-block lg:mt-0 text-white-200 hover:underline">
            Courses
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
