import React, { useState } from 'react';
import {signInWithPopup} from 'firebase/auth'
import { auth, provider } from './authConfig';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Login = () => {
  const [val,setVal]=useState('')
  const navigate= useNavigate();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { email, displayName, uid,accessToken} = result.user;
      const response = await axios.post('http://localhost:3002/api/users', {
        Email: email,
        Name: displayName,
        Id: uid,
        token:accessToken
      });
      console.log("Response from server:", response.data.user);
      navigate('/explore');
    } catch (error) {
      console.error("Error in login:", error);
    }
  };
  

  return (
    <div>
      <div>
      <h2 className=" font-bold">Login Page</h2>
      <div className=" flex justify-center flex-col w-full items-center my-10">
        <h2>Outlook Authentication</h2>
        <div
          className=" border bg-blue-500 text-white font-bold rounded-lg cursor-pointer p-2 px-6"
          onClick={handleLogin}
        >
          Login with Outlook
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
