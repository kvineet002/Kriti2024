import React, { useEffect, useState } from "react";
import Navbar2 from "../../components/navbar2";
import Footer from "../../components/Footer";
import {
  differenceInMilliseconds,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  differenceInYears
} from "date-fns";
import axios from "axios";
import LoginModal from "../../components/LoginModal";
import { Link } from "react-router-dom";
const Community = ({ SERVER_URL }) => {
  const [loggedIn, setLoggedIn] = useState(
    false || localStorage.getItem("token")
  );

  const placeH = [
    "about new project ideas...",
    "the courses with links...",
    "to colloborate",
  ];
  const [index, setIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState(placeH[index].slice(0, 0));
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [previewData, setPreviewData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [newPost, setnewPost] = useState("");
  const [loading, setloading] = useState(false);
  const userId = localStorage.getItem("id");
  const [reviews, setReviews] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [dropdownOpenStates, setDropdownOpenStates] = useState({});
  const [postReviews, setPostReviews] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setcomments] = useState(0);

  useEffect(() => {
    const intr = setInterval(() => {
      if (placeholderIndex + 1 > placeH[index].length) {
        if (placeholder.length > 0) {
          setPlaceholder((prevPlaceholder) => prevPlaceholder.slice(0, -1));
        } else {
          setPlaceholderIndex(0);
          setIndex((prev) => (prev + 1) % placeH.length);
        }
      } else {
        setPlaceholder(
          (prevPlaceholder) => prevPlaceholder + placeH[index][placeholderIndex]
        );
        setPlaceholderIndex(placeholderIndex + 1);
      }
    }, 120);
    return () => {
      clearInterval(intr);
    };
  }, [index, placeholder, placeholderIndex]);
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
  function extractFirstLink(text) {
    const linkRegExp = new RegExp(
      "https?://(?:www\\.)?[a-zA-Z0-9-]+(?:\\.[a-zA-Z]{2,})+(?:[/?].*)?",
      "i"
    );
    const match = text.match(linkRegExp);
    const firstLink = match ? match[0] : null;
    return firstLink;
  }
  const toggleDropdown = (postId) => {
    setDropdownOpenStates((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };
  const createPost = async () => {
    setloading(true);
    try {
      const apiKey = "64826c44d88ac1727f774f7a1e913076";
      const url = extractFirstLink(newPost);
      const response2 = await fetch(
        `https://api.linkpreview.net/?key=${apiKey}&q=${encodeURIComponent(
          url
        )}`
      );
      const data = await response2.json();

      const response = await axios.post(`${SERVER_URL}/post/create`, {
        title: newPost,
        bannerUrl: data ? data.image : "",
        creator: {
          id: userId,
          Name: localStorage.getItem("Name"),
          email: localStorage.getItem("email"),
          designation: localStorage.getItem("designation"),
          profileUrl: localStorage.getItem("profileUrl"),
        },
      });
      setnewPost("");
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setloading(false);
    }
  };

  const endTime = new Date();

  const [posts, setPosts] = useState([]);
  const renderTitleWithLink = (title) => {
    const link = extractFirstLink(title);

    if (link) {
      const linkIndex = title.indexOf(link);

      const titleWithLink = (
        <div>
          <p className="text-gray-400 text-base">
            {title.substring(0, linkIndex)}
          </p>
          <p className="text-gray-400 text-base">
            <a
              href={link}
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link}
            </a>
          </p>
          <p className="text-gray-400 text-base">
            {title.substring(linkIndex + link.length)}
          </p>
        </div>
      );

      return <p className="text-gray-400 text-base">{titleWithLink}</p>;
    }

    return <p className="text-gray-400 text-base">{title}</p>;
  };
  const fetchReviews = async (postId) => {
    if (!postId) return;
    try {
      const response = await axios.get(
        `${SERVER_URL}/reviews/get-reviews/${postId}`
      );
      setPostReviews((prevReviews) => ({
        ...prevReviews,
        [postId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  const submitReview = async () => {
    if (!selectedPostId) return; // Do not proceed if selectedPostId is not set
    try {
      await axios.post(`${SERVER_URL}/reviews/create-review`, {
        Name: localStorage.getItem("Name"),
        profileUrl: localStorage.getItem("profileUrl"),
        message: newReview,
        projectId: selectedPostId, // Use the selected post ID here
      });
      setNewReview("");
      fetchReviews(selectedPostId); // Refresh the reviews for the current post
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [submitReview,[]]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.post(`${SERVER_URL}/post/getposts`);
        const fetchedPosts = response.data;
        setPosts(fetchedPosts);
        const initialDropdownStates = fetchedPosts.reduce((acc, post) => {
          acc[post._id] = false; // Initialize each post's dropdown as closed
          return acc;
        }, {});
        setDropdownOpenStates(initialDropdownStates);
      } catch (error) {
        console.error(
          "Error fetching posts:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };
  return (
    <div>
      {showLoginModal && (
        <LoginModal
          SERVER_URL={SERVER_URL}
          onClose={() => setShowLoginModal(false)}
        />
      )}
      <Navbar2 SERVER_URL={SERVER_URL} />
      <div className=" flex flex-col mt-[20%] md:mt-[9%]">
        {loggedIn && (
          <div className=" md:px-[18%] mb-10 flex items-center justify-center gap-2  w-full   ">
            <div className=" md:w-full w-[75%] flex bg-blue-50 items-center px-2  gap-2 rounded-full">
              <img src="/plus.png" className=" h-7 w-7" />
              <input
                value={newPost}
                onChange={(e) => {
                  setnewPost(e.target.value);
                }}
                placeholder={`Post ${placeholder}`}
                className="  outline-none bg-transparent w-full  py-2 "
              />
            </div>
            <button
              disabled={loading}
              onClick={
                loggedIn
                  ? newPost.length > 0
                    ? createPost
                    : () => {}
                  : () => {
                      setShowLoginModal(true);
                    }
              }
              className=" bg-blue-50 py-2 rounded-full px-4  font-normal text-base cursor-pointer"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        )}
        <div className=" flex gap-6 flex-col">
          {posts &&
            posts
              .slice()
              .reverse()
              .map((post) => (
                <div className="mx-4  md:mx-64 border border-[#565656] rounded-lg shadow-md overflow-hidden">
                  <div className="flex items-center px-6 py-4">
                    <div className="flex-shrink-0">
                      {/* Assume you have an avatar image. Replace 'path-to-avatar-image.png' with the actual path */}
                      <img
                        src={post.creator[0].profileUrl}
                        alt="User avatar"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </div>
                    <Link
                      to={`/profile/${post.creator[0].id}`}
                      className="ml-4"
                    >
                      <div className="text-lg  text-white font-semibold">
                        {post.creator[0].Name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {post.creator[0].designation}
                      </div>
                    </Link>
                  </div>

                  <div className="px-4 py-2 border-t border-[#565656]">
                    {renderTitleWithLink(post.title)}
                  </div>
                  {post.bannerUrl && post.bannerUrl.length > 0 && (
                    <div className="px-4  py-2 border-t border-[#565656]">
                      {/* Replace 'path-to-project-image.png' with the actual path to your image */}
                      <img
                        src={post.bannerUrl}
                        alt="Project"
                        className="w-full  object-cover rounded-md"
                      />
                    </div>
                  )}




                  <div
                    style={{
                      transition: "max-height 0.9s ease", // Adjust the duration and timing function as needed
                      maxHeight: dropdownOpenStates[post._id]
                        ? "420px"
                        : "40px", // Adjust the duration and timing function as needed
                    }}
                    className={` md:px-6 px-4  my-2 py-2  bg-blue-50 ${
                      isOpen ? "  h-full  rounded-[18px]" : " rounded-[18px]"
                    } mx-4`}
                  >
                    <div className=" flex w-full justify-between text-base font-semibold">
                      Comments
                      <img
                        onClick={() => {
                          toggleDropdown(post._id);
                          setSelectedPostId(post._id);
                          fetchReviews(post._id);
                        }}
                        className={`transition-transform duration-500 cursor-pointer ${
                          dropdownOpenStates[post._id]
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                        width="15px"
                        src="/dropdown.svg"
                        alt="Dropdown"
                      />
                    </div>
                    {dropdownOpenStates[post._id] && (
                      <div className="">
                        <div className="flex flex-col  ">
                          <div
                            className="flex flex-col space-y-4 rounded-lg py-5 px-4 overflow-y-auto"
                            style={{ maxHeight: "300px" }}
                          >
                            {loading ? (
                              <div className="flex justify-center font-semibold text-3xl text-gray-500">
                                Loading...
                              </div>
                            ) : postReviews[post._id] &&
                              postReviews[post._id].length > 0 ? (
                              postReviews[post._id]
                                .slice()
                                .reverse()
                                .map((review) => (
                                  <div
                                    key={review._id}
                                    className="flex items-start space-x-2"
                                  >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
                                      <img
                                        src={review.profileUrl}
                                        alt={`${review.Name}'s profile`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <div className="bg-gray-800 p-2 rounded-lg">
                                        <p className="text-white">
                                          {review.message}
                                        </p>
                                      </div>
                                      <div className="text-gray-500 text-xs">{`${
                                        review.Name
                                      } • ${getTimeDifference(
                                        review.time,
                                        endTime
                                      )} ago`}</div>
                                    </div>
                                  </div>
                                ))
                            ) : (
                              <div className="flex justify-center font-semibold text-3xl text-gray-500">
                                No Comments Yet!!!
                              </div>
                            )}
                          </div>
                          <div className="flex items-center  mt-4 gap-1 md:gap-2">
                            <input
                              type="text"
                              placeholder="Type your comment..."
                              value={newReview}
                              onChange={(e) => setNewReview(e.target.value)}
                              className=" px-6 py-2 w-full outline-none bg-transparent placeholder:text-[#565656] border border-[#565656]  rounded-full"
                            />
                            <button
                              onClick={
                                loggedIn
                                  ? newReview.length > 0
                                    ? submitReview
                                    : () => {}
                                  : () => {
                                      setShowLoginModal(true);
                                    }
                              }
                              className=" rounded-full border border-[#565656] hover:bg-[#565656] flex items-start justify-center p-1 "
                            >
                              <img src="/send.png" className=" w-8 h-8" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          {showLoginModal && (
            <LoginModal
              SERVER_URL={SERVER_URL}
              onClose={() => setShowLoginModal(false)}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Community;
