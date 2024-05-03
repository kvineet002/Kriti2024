import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  differenceInMilliseconds,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  differenceInYears

} from "date-fns";
export default function ReviewBox({
  SERVER_URL,
  projectId,
  loggedIn,
  setShowLoginModal,
  creatorId
}) {
  const [loading, setloading] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const userId = localStorage.getItem("id");
  const isAdmin = localStorage.getItem("email") === "vineet.mech22@iitg.ac.in";
  const getTimeDifference = (startTime, endTime) => {
    const msDifference = differenceInMilliseconds(endTime, startTime);
  
    if (msDifference < 1000) {
      return `${msDifference} milliseconds`;
    } else
     if (msDifference < 60000) {
      const seconds = differenceInSeconds(endTime, startTime);
      return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    } else if (msDifference < 3600000) {
      const minutes = differenceInMinutes(endTime, startTime);
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    } else if (msDifference < 86400000) {
      const hours = differenceInHours(endTime, startTime);
      return `${hours} hour${hours !== 1 ? "s" : ""}`;
    } else if (msDifference < 2592000000) { // Approximate number of milliseconds in a month
      const days = differenceInDays(endTime, startTime);
      return `${days} day${days !== 1 ? "s" : ""}`;
    } else if (msDifference < 31536000000) { // Approximate number of milliseconds in a year
      const months = differenceInMonths(endTime, startTime);
      return `${months} month${months !== 1 ? "s" : ""}`;
    } else {
      const years = differenceInYears(endTime, startTime);
      return `${years} year${years !== 1 ? "s" : ""}`;
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
        userId:localStorage.getItem("id"),
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
  const handleDelete = async (id) => {
    try {
      const response = await axios.post(`${SERVER_URL}/reviews/delete-review/${id}`);
      console.log(response.data); // Log the response from the server

      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  return (
    <div>
      <div className="flex flex-col">
        <div className="text-white font-bold text-lg mb-2">REVIEWS</div>
        <div
          className="flex flex-col space-y-4 border border-[#565656] rounded-lg py-5 px-4 overflow-y-auto"
          style={{ maxHeight: "300px" }}
        >
          {loading ? (
            <div className="flex justify-center font-semibold text-3xl text-gray-500">
              Loading...
            </div>
          ) : reviews && reviews.length > 0 ? (
            reviews
              .slice()
              .reverse()
              .map((review) => (
                <div className="flex justify-between">
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
                      <div className="text-gray-500 text-xs">{`${
                        review.Name
                      } • ${getTimeDifference(review.time, endTime)} ago`}</div>
                    </div>
                  </div>
               {(loggedIn&&creatorId===userId||isAdmin) &&  <button onClick={()=>{handleDelete(review._id)} } className="border-2 border-white h-6 w-6 rounded-[50%] flex items-center justify-center cursor-pointer hover:bg-red-500 mt-2 ">
                    <img src="/bin.svg" alt="" className="w-4" />
                  </button>}
                </div>
              ))
          ) : (
            <div className="flex justify-center font-semibold text-3xl text-gray-500">
              No Reviews Yet!!!
            </div>
          )}
        </div>
        <div className="flex items-center  w-full bg-white rounded-full mt-4  px-2">
          <input
            type="text"
            placeholder="Type your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="flex-grow px-4 py-3 outline-none bg-transparent w-[90%]  rounded-full"
          />
          <img
            onClick={
              loggedIn
                ? newReview.length > 0
                  ? submitReview
                  : () => {}
                : () => {
                    setShowLoginModal(true);
                  }
            }
            src="https://firebasestorage.googleapis.com/v0/b/campus-collabrate.appspot.com/o/others%2Fsend.png?alt=media&token=8acb7651-7f26-4428-bb6c-3641ed06fd22"
            className=" rounded-full w-10 cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
}
