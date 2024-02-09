import React, { useEffect, useState } from "react";
import {
  differenceInMilliseconds,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
} from "date-fns";
import LoginModal from "./LoginModal";
import axios from "axios";
const CommentDrawer = ({ url,SERVER_URL}) => {
  const [loggedIn, setLoggedIn] = useState(
    false || localStorage.getItem("token")
  );
  const [previewData, setPreviewData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [loading,setloading]=useState(false)
  const [reviews, setReviews] = useState([
    {message:"hello wold"},
    {message:"hello wold"},
    {message:"hello wold"},
    {message:"hello wold"},
    {message:"hello wold"},
    {message:"hello wold"},
    {message:"hello wold"},
    {message:"hello wold"},
    {message:"hello wold"},

  ]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const getTimeDifference = (startTime, endTime) => {
    const msDifference = differenceInMilliseconds(endTime, startTime);

    if (msDifference < 1000) {
      return `${msDifference} milliseconds`;
    } else if (msDifference < 60000) {
      const seconds = differenceInSeconds(endTime, startTime);
      return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    } else if (msDifference < 3600000) {
      const minutes = differenceInMinutes(endTime, startTime);
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    } else {
      const hours = differenceInHours(endTime, startTime);
      return `${hours} hour${hours !== 1 ? "s" : ""}`;
    }
  };
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchPreviewData = async () => {
      // Replace YOUR_API_KEY with your actual LinkPreview API key
      const apiKey = "64826c44d88ac1727f774f7a1e913076";
      try {
        const response = await fetch(
          `https://api.linkpreview.net/?key=${apiKey}&q=${encodeURIComponent(
            url
          )}`
        );
        const data = await response.json();
        setPreviewData(data);
      } catch (error) {
        console.error("Error fetching link preview:", error);
      }
    };

    if (url) {
      fetchPreviewData();
    }
  }, []);
  const endTime = new Date();
  const submitReview = async () => {
    try {
      await axios.post(`${SERVER_URL}/reviews/create-review`, {
        Name: localStorage.getItem('Name'), 
        profileUrl:localStorage.getItem('profileUrl'),
        message: newReview,
      });
      setNewReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="mx-4 md:mx-64 border border-[#565656] rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center px-6 py-4">
        <div className="flex-shrink-0">
          {/* Assume you have an avatar image. Replace 'path-to-avatar-image.png' with the actual path */}
          <img
            src="https://placekitten.com/400/300"
            alt="User avatar"
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div className="ml-4">
          <div className="text-lg  text-white font-semibold">VINEET KUMAR</div>
          <div className="text-sm text-gray-400">Student at IIT Guwahati</div>
        </div>
        <div className="ml-auto">
          <div className="bg-white rounded-full  border-white border-2 px-4 text-center uppercase text-xs py-[6px] flex justify-center items-center font-bold cursor-pointer">
            Follow
          </div>
        </div>
      </div>

      <div className="px-4 py-2 border-t border-[#565656]">
        <p className="text-gray-400 text-base">
          {previewData && previewData.description}
        </p>
      </div>
     { previewData && previewData.image&&<div className="px-4  py-2 border-t border-[#565656]">
        {/* Replace 'path-to-project-image.png' with the actual path to your image */}
        <img
          src={previewData && previewData.image}
          alt="Project"
          className="w-full h-48 object-cover rounded-md bg-gray-300"
        />
      </div>}
      <div
        style={{
          transition: "max-height 0.9s ease", // Adjust the duration and timing function as needed
          maxHeight: isOpen ? "420px" : "40px"// Adjust the duration and timing function as needed
        }}
        className={` px-6  my-2 py-2 bg-[#BFBFBF] ${
          isOpen ? "  h-full  rounded-[18px]" : " rounded-[18px]"
        } mx-4`}
      >
        <div className=" flex justify-between text-base font-semibold">
          Comments
          <img
        onClick={toggleDropdown}
            className={`transition-transform duration-500 cursor-pointer ${
              isOpen ? "rotate180" : "rotate0"
            }`}
            width="15px"
            src="/dropdown.svg"
            alt="Dropdown"
          />
        </div>
        {isOpen && (
          <div>
          <div className="flex flex-col">
        <div
          className="flex flex-col space-y-4 rounded-lg py-5 px-4 overflow-y-auto"
          style={{ maxHeight: "300px" }}
        >
{loading ? (
  <div className="flex justify-center font-semibold text-3xl text-gray-500">Loading...</div>
) : reviews && reviews.length > 0 ? (
    reviews.slice().reverse().map((review) => (
    <div key={review._id} className="flex items-start space-x-2">
      <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
        <img
          src={review.profileUrl}
          alt={`${review.Name}'s profile`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="bg-gray-800 p-2 rounded-lg">
          <p className="text-white">{review.message}</p>
        </div>
        <div className="text-gray-500 text-xs">{`${review.Name} • ${getTimeDifference(review.time, endTime)} ago`}</div>
      </div>
    </div>
  ))
) : (
  <div className="flex justify-center font-semibold text-3xl text-gray-500">No Reviews Yet!!!</div>
)}

        </div>
        <div className="flex items-center mt-4 gap-2">
          <input
            type="text"
            placeholder="Type your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="flex-grow px-6 py-2 outline-none bg-transparent placeholder:text-[#565656] border border-[#565656]  rounded-full"
          />
          <button
            onClick={loggedIn?newReview.length>0?submitReview:()=>{}:()=>{setShowLoginModal(true)}}
            className=" rounded-full border border-[#565656] hover:bg-[#565656] flex items-start justify-center p-2 "
          >
            <img src="/send.svg" width="25px" />
          </button>
        </div>
      </div>
          </div>
        )}
      </div>
      {showLoginModal && (
              <LoginModal
                SERVER_URL={SERVER_URL}
                onClose={() => setShowLoginModal(false)}
              />
            )}
    </div>
  );
};

export default CommentDrawer;
