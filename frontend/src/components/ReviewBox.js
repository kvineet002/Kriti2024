import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  differenceInMilliseconds,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
} from "date-fns";
export default function ReviewBox({ SERVER_URL, projectId,loggedIn,setShowLoginModal}) {
    const [loading,setloading]=useState(false)
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);
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
  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/reviews/get-reviews/${projectId}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  const submitReview = async () => {
    try {
      await axios.post(`${SERVER_URL}/reviews/create-review`, {
        Name: localStorage.getItem('Name'), 
        profileUrl:localStorage.getItem('profileUrl'),
        message: newReview,
        projectId: projectId,
      });
      setNewReview("");
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [projectId, submitReview]);
  const endTime = new Date();
  return (
    <div>
      <div className="flex flex-col">
        <div className="text-white font-bold text-lg mb-2">REVIEWS</div>
        <div
          className="flex flex-col space-y-4 border border-[#565656] rounded-lg py-5 px-4 overflow-y-auto"
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
            className="flex-grow px-6 py-3 outline-none  rounded-full"
          />
          <button
            onClick={loggedIn?newReview.length>0?submitReview:()=>{}:()=>{setShowLoginModal(true)}}
            className=" rounded-full bg-white flex items-start justify-center p-[5px] "
          >
           <img src="/send.png" className=" w-10 h-10"/>

          </button>
        </div>
      </div>
    </div>
  );
}
