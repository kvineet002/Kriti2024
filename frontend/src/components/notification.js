import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = ({ SERVER_URL, userId,handleFollow }) => {
  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/notification/allnotifications/${userId}`,
        {
            userId: userId,
        }
      );
      setNotifications(response.data.allnotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, [userId,handleFollow]);

  const seeAllnotifications = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/notification/seeall`, {
        userId: userId,
      });
      setNotifications(response.data.allnotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  useEffect(() => {
    seeAllnotifications();
  }, []);
  return (
    <ul className="divide-y divide-gray-200">
      {notifications &&
        notifications
          .slice()
          .reverse()
          .map((notification) =>
            notification.seenStatus ? (
              <li key={notification._id} className="py-4">
                <h3 className="text-lg font-semibold">{notification.title}</h3>
                <p className="text-gray-600">{notification.message}</p>
              </li>
            ) : (
              <li key={notification._id} className="py-4 bg bg-red-500">
                <h3 className="text-lg font-semibold">{notification.title}</h3>
                <p className="text-gray-600">{notification.message}</p>
              </li>
            )
          )}
    </ul>
  );
};

export default Notifications;
