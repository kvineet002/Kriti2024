import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../pages/Login/authConfig";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginModal({onClose,SERVER_URL}) {
  const [val,setVal]=useState('')
  const navigate= useNavigate();
  const location=useLocation();
  const handleLogin = async () => {

    try {
      const result = await signInWithPopup(auth, provider);
      const { email, displayName,accessToken} = result.user;
      const response = await axios.post(`${SERVER_URL}/api/users`, {
        Email: email,
        Name: displayName,
        token:accessToken
      });
      localStorage.setItem('id',response.data.user._id);
      localStorage.setItem('Name',response.data.user.Name);
      localStorage.setItem('email',response.data.user.Email);
      localStorage.setItem('token',response.data.user.token);
      localStorage.setItem('profileUrl',response.data.user.profileUrl);
      localStorage.setItem('designation',response.data.user.designation);
      
       navigate(`/profile/${localStorage.getItem('id')}`);
    } catch (error) {
      console.error("Error in login:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm h-screen flex justify-center items-center">
      <div className="flex-col">
        <div className="pb-2  flex justify-end" >
          <img src="/closeicon.svg" alt="close" className="cursor-pointer" onClick={onClose}/>
        </div>
        
        <div className="hero__page rounded-xl w-[80vw] sm:w-[50vw] lg:w-[40vw] flex flex-col items-center my_shadow">
          
          <div className="pt-10 px-10 " >
            <p className=" text-center text-white text-3xl font-semibold">
            Discover world's best community of designers and developers
            </p>
          </div>

          <div className="mt-[40px] gap-2 flex flex-col mb-[30px]  text-white text-center">
            <div className="text-[25px]  lg:text-4xl font-extrabold">Welcome to Collampus</div>
            <div className="text-sm">Start your journey with us.</div>
          </div>

          <div className="flex bg-[rgba(83,83,83,0.78)] w-[75%] justify-center items-center gap-3 h-8 rounded-[10px] md:w-[50%] mb-2 cursor-pointer sm:h-10">
            <img src="/outlook.svg" alt="Outlook" className=" w-5"/>
            <div className="text-white text-sm sm:text-base" onClick={handleLogin}>Sign in with Outlook</div>
          </div>
          


          <div className="w-[75%] md:w-[50%] flex justify-between text-xs md:text-xs mb-20">
            <div className="text-white">Having problem signing up?</div>
            <div className=" text-red-600 cursor-pointer hover:underline">Report Problem</div>
          </div>
          <div className="h-[1px]  bg-black w-[90%] mb-[20px] mx-auto"/>
          <div className="text-white text-center font-semibold text-xs px-3 mb-5">
          By signing in your account you agree with our Terms of Service, Privacy Policy, and our default Notification Settings. 
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default LoginModal
