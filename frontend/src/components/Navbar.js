import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="mobile lg:hidden">
        <nav className="flex fixed z-10  w-full items-center justify-between flex-wrap bg-[#0c0c0c97]  p-6 ">
          <div className="uppercase font-semibold text-2xl flex items-center flex-shrink-0 text-white mr-6">
            <Link to="/" className="tracking-tight cursor-pointer">
              Collampus
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-3 py-2 border rounded text-white border-white-400 hover:text-white hover:border-white"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
          >
            <div className="text-sm lg:flex-grow">
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
            </div>
            <div>
              <Link
                to="/profile/2"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:underline mr-4"
              >
                Profile
              </Link>
              <Link
                to="/project/2"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:underline mr-4"
              >
                Projects
              </Link>
              <Link
                to="/courses/2"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:underline"
              >
                Courses
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div className="navbar fixed  top-0 lg:flex items-center justify-between flex-wrap w-full pl-[10px] bg-[#0c0c0c97] h-16  hidden ">
        <Link
          to="/"
          className="uppercase text-white font-semibold w-15 text-2xl flex justify-center items-center cursor-pointer"
        >
          Collampus
        </Link>
        <nav className="flex flex-wrap justify-start w-[25%] items-center">
          <Link
            to="/profile/2"
            className="text-[#ffffff] font-[700] p-[10px] hover:underline cursor-pointer mx-1"
          >
            People
          </Link>
          <Link
            to="/project/1"
            className="text-[#ffffff] font-[700] p-[10px] hover:underline cursor-pointer mx-1"
          >
            Projects
          </Link>
          <Link className="text-[#ffffff] font-[700] p-[10px] hover:underline cursor-pointer mx-1">
            Courses
          </Link>
        </nav>
        <div className="w-[35%] pl-[50px]">
          <div className="flex justify-end items-center gap-2 pr-3 pl-0.5 h-8 rounded-[25px] bg-[#ffffffa5] ml-5 w-[85%] max-w-[400px]">
            <div className=" flex justify-center items-center bg-[#fffffff7] rounded-[50%]">
              <img
                src="/search.svg"
                height="15px"
                width="15px"
                className="h-[95%] w-[95%] mt-1 "
              />
            </div>
            <input
              type="text"
              className="placeholder-gray-800 outline-none w-[95%] bg-transparent search__input "
              placeholder="SEARCH"
            />
          </div>
        </div>

        {loggedIn ? (
          <Link
            to="/profile/2"
            className=" mx-4 bg-white text-black rounded-[25rem] text-center font-[700] cursor-pointer w-[5%] h-[30px] my-auto pt-[2px]"
          >
            Profile
          </Link>
        ) : (
          <Link
            to="/login"
            className=" mx-4 bg-white text-black rounded-[25rem] text-center font-[700] cursor-pointer w-[5%] h-[30px] my-auto pt-[1px] "
          >
            Login
          </Link>
        )}
      </div>
      <div className=""></div>
    </div>
  );
}

export default Navbar;
