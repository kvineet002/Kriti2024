// Navbar.js
import React, { useState, useEffect, useRef } from "react";
import LoginModal from "./LoginModal";
import { useLocation,useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Navbar2 = ({SERVER_URL,openEdit}) => {
  const [loggedIn, setLoggedIn] = useState(false||localStorage.getItem('token'));
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location=useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate=useNavigate();

  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token)setLoggedIn(true);
  },[])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

 const handleLogout=()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('Name');
  localStorage.removeItem('email');
  localStorage.removeItem('id');
  localStorage.removeItem('profileUrl');
  localStorage.removeItem('designation');
  navigate('/')
  window.location.reload();
 }

  return (
    <nav className="bg-[#0c0c0c97] text-white fixed top-0 left-0 right-0 z-40">
      <div className=" px-8 mx-auto">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="tracking-tight uppercase font-semibold text-2xl  text-white cursor-pointer">
              <Link to="/">Collampus</Link>
            </span>
            <div className="hidden ml-8  md:flex space-x-4">
            { !loggedIn&&<a
                href='/'
                className={`${location.pathname==='/'&&'border-b-[2px] border-[#565656]  text-white opacity-100 '} opacity-80 px-3 py-1 hover:border-b-[2px] hover:border-[#565656] transition duration-300 ease-in-out`}
              >
                Home
              </a>}
              <a
                href='/explore'
                className={`${location.pathname==='/explore'&&'border-b-[2px] border-[#565656] text-white opacity-100 '} opacity-80 px-3 py-1 hover:border-b-[2px] hover:border-[#404040] transition duration-300 ease-in-out`}
              >
                Explore
              </a>
              <a
                href='/people'
                className={`${location.pathname==='/people'&&'border-b-[2px] border-[#565656] text-white opacity-100 '} opacity-80 px-3 py-1 hover:border-b-[2px] hover:border-[#565656] transition duration-300 ease-in-out`}
              >
                People
              </a>
              {/* <a
                href='/community'
                className={`${location.pathname==='/community'&&'border-b-[2px] border-[#565656]  text-white opacity-100 '} opacity-80 px-3 py-1 hover:border-b-[2px] hover:border-[#565656] transition duration-300 ease-in-out`}
              >
                  Community
              </a> */}
            </div>
          </div>
          <div className="flex items-center">
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="focus:outline-none"
              >
                {/* Icon for mobile menu */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="ml-3" ref={dropdownRef}>
              {!loggedIn ? (
                <button
                  className="border-2 px-4 py-2 bg-white text-black border-black rounded-[25px]   hover:bg-black hover:text-white text-sm"
                  onClick={() => {
                    setShowLoginModal(true);
                  }}
                >
                  Get Started
                </button>
              ) : (
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="focus:outline-none"
                >
                  <img
                    src={localStorage.getItem('profileUrl')}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>
              )}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                  <Link
                   to={`/profile/${localStorage.getItem('id')}`}
                    className="block px-4 cursor-pointer py-2 text-sm text-gray-800 hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                  <div 
                    
                    onClick={handleLogout}
                    className="block px-4 cursor-pointer py-2 text-sm text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {showLoginModal && (
          <LoginModal SERVER_URL={SERVER_URL} onClose={() => setShowLoginModal(false)} />
        )}

        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-2 bg-[#0c0c0c97]">
                    {!loggedIn&& <a
                href='/'
                className="hover:underline px-3 py-1"
              >
                Home
              </a>}
              <a
                href='/explore'
                className="hover:underline px-3 py-1"
              >
                Explore
              </a>
              <a
                href='/people'
                className="hover:underline px-3 py-1"
              >
                People
              </a>
              {/* <a
                href='/community'
                className="hover:underline px-3 py-1"
              >
               Community
              </a> */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar2;
