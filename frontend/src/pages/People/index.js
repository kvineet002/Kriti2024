import React, { useEffect, useId, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar2 from "../../components/navbar2";
import LoginModal from "../../components/LoginModal";

function People() {
  const [people, setPeople] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/users/allusers"
        );
        console.log(response.data);
        setPeople(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const fetchFollowingUsers = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/users/getfollowing",
        {
          userId: "65b74ff720fcc017069a1d5c",
        }
      );
      setFollowingUsers(response.data);
    } catch (error) {
      console.error("Error fetching following users:", error);
    }
  };
  useEffect(() => {
    fetchFollowingUsers();
  }, []);
  const isUserFollowing = (userId) => {
    // Check if the user is in the list of following users
    return followingUsers.some((user) => user.id === userId);
  };
  console.log(followingUsers);

  const handleFollow = async (userId) => {

    try {
      const response = await axios.post(
        "http://localhost:3002/api/users/togglefollow",
        {
          userId: "65b74ff720fcc017069a1d5c",
          targetUserId: userId,
        }
      );
      fetchFollowingUsers();
    } catch (error) {
      console.error("Error updating following status:", error);
    }
  };
  const currentUserId = "65b74ff720fcc017069a1d5c";
  return (
    <div>
      <Navbar2 />
      List of people
      <div className="flex px-5 md:px-[20%] mt-16 flex-col gap-4">
        {people.map(
          (person) =>
            person._id !== currentUserId && (
              <div key={person.id}>
                <div className="border rounded-lg p-4 gap-4">
                  <div className=" flex justify-between items-center">
                    <div className="text-white font-bold flex items-center gap-1 text-lg">
                      <img
                        src="/profile-icon.jpg"
                        alt={`${person.Name}'s Profile`}
                        className="w-12 h-12 rounded-full"
                      />
                      {person.Name}
                    </div>
                    <button >
                      {isUserFollowing(person._id) ? (
                        <div onClick={() => handleFollow(person._id)} className="bg-[rgba(0, 0, 0, 0.10)] rounded-full text-white border-white border-2 px-4 text-center uppercase text-xs py-[3px] flex justify-center items-center gap-1 font-bold cursor-pointer">
                          <img src="/check.svg" className="h-6" />
                          <div>Following</div>
                        </div>
                      ) : (
                        <div onClick={(loggedIn)?() => handleFollow(person._id):() => {
                          setShowLoginModal(true);
                        }} className="bg-white rounded-full  border-white border-2 px-4 text-center uppercase text-xs py-[6px] flex justify-center items-center font-bold cursor-pointer">
                       Follow
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
         {showLoginModal && (
            <LoginModal onClose={() => setShowLoginModal(false)} />
          )}
      </div>
    </div>
  );
}

export default People;
