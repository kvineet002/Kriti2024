import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Notifications from "../../components/notification";

const Notification = ({ SERVER_URL }) => {

  const userId=localStorage.getItem('id')
  return (
    <div className="container mx-auto px-4">
        <Navbar/>
      <h2 className="text-2xl font-bold text-white mt-[10%] mb-4">Notifications</h2>
        <Notifications SERVER_URL={SERVER_URL} userId={userId}/>
    </div>
  );
};

export default Notification;
