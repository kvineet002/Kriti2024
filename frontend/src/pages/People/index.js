import React, { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import LoginModal from "../../components/LoginModal";
import Footer from "../../components/Footer";
import Navbar2 from "../../components/navbar2";
import PeopleSkeleton from "../../components/PeopleSkeleton";
import Notifications from "../../components/notification";

function People({SERVER_URL}) {
  const [people, setPeople] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false||localStorage.getItem('token'));
  const [selectedTab, setSelectedTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading,setLoading]=useState(false)

  const currentUserId = localStorage.getItem('id')

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/users/allusers`);
        console.log(response.data);
        setPeople(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{setLoading(false)}
    };

    fetchData();
  }, []);
  const fetchFollowingUsers = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/users/getfollowing`,
        {
          userId: currentUserId,
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
  useEffect(() => {
    const fetchFollowedUsers = async () => {
      try {
        const response = await axios.post(
          `${SERVER_URL}/api/users/getfollowers`,
          {
            userId:currentUserId,
          }
        );
        setFollowedUsers(response.data);
      } catch (error) {
        console.error("Error fetching following users:", error);
      }
    };
    fetchFollowedUsers();
  }, [selectedTab]);
  const isUserFollowing = (userId) => {
    // Check if the user is in the list of following users
    if(loggedIn)return followingUsers.some((user) => user._id === userId);
  };

  const handleFollow = async (userId) => {

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/users/togglefollow`,
        {
          userId:currentUserId,
          targetUserId: userId,
          Name:localStorage.getItem('Name'),
          designation:localStorage.getItem('designation'),
          profileUrl:localStorage.getItem('profileUrl')
        }
      );
      fetchFollowingUsers();
    } catch (error) {
      console.error("Error updating following status:", error);
    }

    return;
  };
  const filteredPeople = () => {
    let filteredList = [];
    if (selectedTab === 'All') {
      filteredList = people;
    } else if (selectedTab === 'Followers') {
      filteredList = followedUsers;
    } else if (selectedTab === 'Following') {
      filteredList = followingUsers;
    }

    if (searchQuery) {
      filteredList = filteredList.filter(person => {
        const name = person.Name ? person.Name.toLowerCase() : '';
        const designation = person.designation ? person.designation.toLowerCase() : '';
        return name.includes(searchQuery.toLowerCase()) || designation.includes(searchQuery.toLowerCase());
      });
    }

    return filteredList;
  };

  return (
    <div>
      <Navbar2 SERVER_URL={SERVER_URL}/>
     
      <div className="flex px-5 md:px-[20%] mt-24  flex-col gap-4">
      <div className="flex gap-1 bg-[#F2F2F2] items-center  mb-4 w-full px-2  text-black rounded-full border border-[#565656]">
        <img src="/search.svg"/>
      <input
        type="text"
        placeholder="Search People..."
        className=" py-2 outline-none w-full  bg-transparent"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
  
    </div>
      <div className="flex gap-4 mb-4">
          <button
            onClick={() => setSelectedTab('All')}
            className={`hover:opacity-80  border border-[#565656] rounded-full px-3 py-1 ${selectedTab === 'All' ? 'font-bold text-black bg-white' : ' text-white'}`}
          >
            All
          </button>
         { loggedIn&&<button
            onClick={() => setSelectedTab('Followers')}
            className={`border hover:opacity-80 border-[#565656] rounded-full px-3 py-1 ${selectedTab === 'Followers' ? 'font-bold text-black bg-white' : ' text-white'}`}
          >
            Followers
          </button>}
      
        </div>
        
        {loading ? (
        <PeopleSkeleton/>
        // <img src='https://firebasestorage.googleapis.com/v0/b/campus-collabrate.appspot.com/o/others%2FLoading.gif?alt=media&token=66254778-8e7a-4582-b752-250852618408' alt="Loading..." className='w-[50px] m-auto '></img>
      ) : (
        filteredPeople().slice().reverse().map(
          (person) =>
            person._id !== currentUserId && (
              <div key={person.id}>
                <div style={{ background: "url('/grid2.svg')"}} className="border bg-opacity-20 before:opacity-50 rounded-lg p-4 gap-4  ">
                  <div className=" flex justify-between items-center">
                    <Link to={`/profile/${person._id}`} className="text-white font-bold flex items-center gap-1 text-lg cursor-pointer">
                      <img
                        src={person.profileUrl}
                        alt={`${person.Name}'s Profile`}
                        className="w-12 h-12 rounded-full object-cover mr-2"
                      /><div className=" flex flex-col"><div>{person.Name}</div><div className=" text-sm font-thin  text-gray-300"> {person.designation}</div></div>
                      
                    </Link>
                    <button >
                      {isUserFollowing(person._id) ? (
                        <div onClick={() => handleFollow(person._id,person.Name,person.designation)} className="bg-[rgba(0, 0, 0, 0.10)] rounded-full text-white border-white border-2 px-4 text-center uppercase text-xs py-[3px] flex justify-center items-center gap-1 font-bold cursor-pointer">
                          <img src="/check.svg" className="h-6" />
                          <div>Following</div>
                        </div>
                      ) : (
                        <div onClick={(loggedIn)?(()=>handleFollow(person._id,person.Name,person.designation)):() => {
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

        ))}
      <div>
<Notifications SERVER_URL={SERVER_URL} handleFollow={handleFollow} userId={localStorage.getItem('id')}/>
      </div>
         {showLoginModal && (
            <LoginModal onClose={() => setShowLoginModal(false)} />
          )}
          
      </div>
      <Footer/>
    </div>
  );
}

export default People
