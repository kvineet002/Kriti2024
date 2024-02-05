// Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'People', href: '/people' },
    { name: 'Courses', href: '/' },
  ];

  return (
    <nav className="bg-[#0c0c0c97] text-white fixed top-0 left-0 right-0 z-50">
      <div className=" px-8 mx-auto">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
          <span className="tracking-tight uppercase font-semibold text-2xl  text-white cursor-pointer">Collampus</span>
            <div className="hidden ml-8  md:flex space-x-4">
              {links.map((link) => (
                <a key={link.name} href={link.href} className="  hover:underline   px-3 py-1">{link.name}</a>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none">
                {/* Icon for mobile menu */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              </button>
            </div>
            <div className="ml-3" ref={dropdownRef}>
         {!loggedIn?
               <button
          className="border-2 px-4 py-2 bg-white text-black border-black rounded-[25px]   hover:bg-black hover:text-white text-sm"
          onClick={() => {
            setShowLoginModal(true);
          }}
        >
          Get Started
        </button>:   <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="focus:outline-none">
                <img src="/profile-icon.jpg" alt="Profile" className="w-8 h-8 rounded-full"/>
              </button>}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">Logout</a>
                </div>
              )}
            </div>
          </div>
        </div>
        {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0c0c0c97]">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="block px-4 py-2 text-sm text-white ">{link.name}</a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
