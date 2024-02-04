// // CommentDrawer.js
// import React, { useState } from 'react';

// const CommentDrawer = () => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   const addComment = () => {
//     if (newComment.trim() !== '') {
//       setComments([...comments, newComment.trim()]);
//       setNewComment('');
//     }
//   };

//   return (
//     <div className="fixed bottom-0 left-0 w-full">
//       <button onClick={toggleDrawer} className=" bg-blue-500 text-white p-2 rounded">
//         {isDrawerOpen ? 'Close Comments' : 'Open Comments'}
//       </button>

//       {isDrawerOpen && (
//         <div className="bg-gray-100 p-4 shadow-md">
//           <input
//             type="text"
//             placeholder="Add a comment..."
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             className="w-full p-2 mb-2 border border-gray-300 rounded"
//           />
//           <button onClick={addComment} className="bg-blue-500 text-white p-2 rounded">
//             Add Comment
//           </button>
//           <ul className="list-none p-0">
//             {comments.map((comment, index) => (
//               <li key={index} className="bg-white p-2 mb-2 border border-gray-300 rounded">
//                 {comment}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommentDrawer;
// PostTile.js
// import React, { useState } from 'react';

// const CommentDrawer = ({ userProfile, userName, description, imageUrl }) => {
//   const [isCommentsOpen, setIsCommentsOpen] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');

//   const toggleComments = () => {
//     setIsCommentsOpen(!isCommentsOpen);
//   };

//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//   };

//   const handleCommentChange = (e) => {
//     setComment(e.target.value);
//   };

//   const submitComment = () => {
//     // Implement your logic to submit the comment
//     console.log(`Rating: ${rating}, Comment: ${comment}`);
//     setComment(''); // Clear the comment field after submission
//   };

//   return (
//     <div className=" mx-[15%] p-4 my-4 border border-[#565656] rounded shadow-md">
//       <div className="flex items-center mb-4">
//         <img src={userProfile} alt="User Profile" className="w-10 h-10 rounded-full mr-2" />
//         <div>
//           <p className="font-bold">{userName}</p>
//           <p className="text-gray-500">Posted on {new Date().toLocaleDateString()}</p>
//         </div>
//       </div>

//       <p className="mb-4">{description}</p>

//       <img src={imageUrl} alt="Post Image" className="mb-4 rounded-md" />

//       <div className="flex items-center mb-4">
//         <p className="mr-2">Rate:</p>
//         <select
//           value={rating}
//           onChange={(e) => handleRatingChange(parseInt(e.target.value, 10))}
//           className="border rounded p-2"
//         >
//           <option value={0}>0</option>
//           <option value={1}>1</option>
//           <option value={2}>2</option>
//           <option value={3}>3</option>
//           <option value={4}>4</option>
//           <option value={5}>5</option>
//         </select>
//       </div>

//       <button onClick={toggleComments} className="bg-blue-500 text-white p-2 rounded">
//         {isCommentsOpen ? 'Close Comments' : 'Open Comments'}
//       </button>

//       {isCommentsOpen && (
//         <div className="mt-4">
//           <textarea
//             value={comment}
//             onChange={handleCommentChange}
//             placeholder="Add a comment..."
//             className="w-full p-2 border rounded"
//           ></textarea>
//           <button onClick={submitComment} className="bg-blue-500 text-white p-2 mt-2 rounded">
//             Submit Comment
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommentDrawer;
import React from 'react';

const CommentDrawer = () => {
  return (
    <div className="mx-4 md:mx-64 border border-[#565656] rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center px-6 py-4">
        <div className="flex-shrink-0">
          {/* Assume you have an avatar image. Replace 'path-to-avatar-image.png' with the actual path */}
          <img src="https://placekitten.com/400/300" alt="User avatar" className="h-12 w-12 rounded-full"/>
        </div>
        <div className="ml-4">
          <div className="text-lg  text-white font-semibold">VINEET KUMAR</div>
          <div className="text-sm text-gray-400">Student at IIT Guwahati</div>
        </div>
        <div className="ml-auto">
        {/* <div className="bg-[rgba(0, 0, 0, 0.10)] rounded-full text-white border-white border-2 px-4 text-center uppercase text-xs py-[3px] flex justify-center items-center gap-1 font-bold cursor-pointer">
                          <img src="/check.svg" className="h-6" />
                          <div>Following</div>
                        </div> */}
                        <div className="bg-white rounded-full  border-white border-2 px-4 text-center uppercase text-xs py-[6px] flex justify-center items-center font-bold cursor-pointer">
                       Follow
                        </div>
        </div>
      </div>

      <div className="px-4 py-2 border-t border-[#565656]">
        <p className="text-gray-400 text-base">
          In my experience collaborating on UI/UX projects, finding the right partner is key. I seek someone with a unique fusion of creativity and analytical acumen
        </p>
      </div>
      <div className="px-4  py-2 border-t border-[#565656]">
        {/* Replace 'path-to-project-image.png' with the actual path to your image */}
        <img src="https://placekitten.com/400/300" alt="Project" className="w-full h-48 object-cover rounded-md bg-gray-300"/>
      </div>


      <div className="px-4 py-2">
        <span className="text-xs font-semibold text-[#565656]">Ratings: 4.5/5</span>
        <div className="flex items-center mt-1">
          {/* Insert SVG stars here */}
        </div>
        <div className="text-xs text-gray-500 mt-2">1 Review Here</div>
      </div>

      <div className="px-4 py-2  flex gap-3 ">
        <input
          className=" border bg-transparent border-black rounded-full w-full py-2 px-4 text-sm items-center text-gray-700 leading-tight focus:outline-none "
          type="text"
          placeholder="Type Your Comment Here"
        />
         <button
            className=" rounded-full bg-white flex items-start justify-center p-1 "
          >
            <img src="/send.svg" width="40px" />
          </button>
      </div>
    </div>
  );
};

export default CommentDrawer;

