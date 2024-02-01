import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Navbar2 from "../../components/navbar2";

function Project() {
  const [newReview, setNewReview] = useState('');
  const TechStacks = [
    {
      Title: "REACtJS",
      link: " ",
      color: "#FFF",
    },
    {
      Title: "HTML",
      link: " ",
      color: "#75C44F",
    },
    {
      Title: "CSS",
      link: " ",
      color: "#FFF",
    },
    {
      Title: "NODEJS",
      link: " ",
      color: "#75C44F",
    },
    {
      Title: "JS",
      link: " ",
      color: "#FFF",
    },
  ];
  const courseLinks = [
    {
      link: "https://cloud.mongodb.com/v2/651e9cee50567201e91b710a#/metrics/replicaSet/651e9d9991c0f705dff7ee9b/explorer/Kriti2024(Dihing)/users/find",
    },
    {
      link: "https://chat.openai.com/c/076895c1-78c7-44c1-84ee-8ec7f037ed9c",
    },
  ];
  const reviews = [
    {
      message: "Great service!",
      user: {
        name: "John Doe",
        profilePic: "/profile-icon.jpg ",
      },
      timestamp: "2 hours ago",
    },
    {
      message: "Great service!",
      user: {
        name: "John Doe",
        profilePic: "/profile-icon.jpg ",
      },
      timestamp: "2 hours ago",
    },
    {
      message: "Great service!",
      user: {
        name: "John Doe",
        profilePic: "/profile-icon.jpg ",
      },
      timestamp: "2 hours ago",
    },
    {
      message: "Great service!",
      user: {
        name: "John Doe",
        profilePic: "/profile-icon.jpg ",
      },
      timestamp: "2 hours ago",
    },
    {
      message: "Great service!",
      user: {
        name: "John Doe",
        profilePic: "/profile-icon.jpg ",
      },
      timestamp: "2 hours ago",
    },
    {
      message: "Great service!",
      user: {
        name: "John Doe",
        profilePic: "/profile-icon.jpg ",
      },
      timestamp: "2 hours ago",
    },
    {
      message: "Great service!",
      user: {
        name: "John Doe",
        profilePic: "/profile-icon.jpg ",
      },
      timestamp: "2 hours ago",
    },
    {
      message: "Great service!",
      user: {
        name: "John Doe",
        profilePic: "/profile-icon.jpg ",
      },
      timestamp: "2 hours ago",
    },
  ];

  return (
    <div>
      <Navbar2 />
      <div className=" my-[6%] rounded-lg border-[#565656] border-2 p-5 md:mx-20 mx-2">
        <div className=" flex flex-col gap-6">
          <div className=" flex  flex-col gap-2">
            <div className=" flex  justify-between items-center">
            <div className=" flex gap-2 items-center">
              <div className=" text-white font-bold text-2xl">
                PORTFOLIO WEBSITE
              </div>
              <div className=" px-2 py-[1px] bg-green-400 rounded-full text-xs">
                Open for collabration
              </div>
            </div>
            <div>
hell
            </div>
            </div>
            <div className=" text-white  font-light text-sm w-[90%]">
              Flutter is an open source UI toolkit for building beautiful,
              natively compiled applications for mobile, web, desktop, and
              embedded devices from a single codebase. Flutter is primarily
              funded by Google with contributors from all around the world.
            </div>
          </div>
          <div className=" flex justify-between px-2">
            <div className="flex gap-2  items-center">
              <div className=" w-8 h-8  bg-slate-400 rounded-full flex items-center justify-center ">
                <img src="/profile-icon.jpg " className=" p-2" alt="" />
              </div>
              <div className=" flex flex-col">
                <div className="  text-white">Google</div>
                <div className=" text-[#C4C4C4] text-xs">Google Inc.</div>
              </div>
            </div>
            <button className="  border flex items-center text-base bg-white text-black border-white rounded-full px-3 py-1 cursor-pointer">
              Follow
            </button>
            {/* <button className="  border flex items-center text-base text-white border-white rounded-full px-3 py-1 cursor-pointer">
             <img src="/followtick.svg"/> Following
            </button> */}
          </div>
          <div className="  w-full ">
            <img className=" rounded-xl" src="/sample-project.png" />
          </div>
          <div className=" flex-col flex md:flex-row md:flex w-full md:justify-between ">
            <div className=" flex flex-col md:w-[35%] gap-8 w-full">
              <div className=" flex flex-col gap-1">
                <label className=" text-white">Project Links</label>
                <div className=" border border-white flex gap-3 p-2 rounded-xl">
                  <a
                    target="blank"
                    href=""
                    className=" px-3 py-1  justify-center gap-1  text-black  font-bold text-xs flex items-center bg-[#FFF]  rounded-full"
                  >
                    <img src="/github.svg" /> GITHUB
                  </a>
                  <a
                    target="blank"
                    href=""
                    className=" px-3 py-1  text-black  font-bold text-xs flex gap-1 items-center bg-[#FFF]  rounded-full"
                  >
                    <img width="15px" src="/demo.svg" /> DEMO
                  </a>
                </div>
              </div>
              <div className=" flex flex-col gap-1">
                <label className=" text-white">Tech stacks</label>
                <div className=" border border-white flex flex-wrap gap-3 p-2 rounded-xl">
                  {TechStacks.map((data, index) => (
                    <a
                      href={data.link}
                      className={` px-3 py-1  text-black   font-bold text-xs flex items-center  rounded-full bg-[${data.color}]`}
                    >
                      {data.Title}
                    </a>
                  ))}
                </div>
              </div>
              <div className=" flex flex-col gap-1">
                <label className=" text-white">Courses / material</label>
                <div className=" border border-white flex flex-col gap-3 p-2 py-4  rounded-xl">
                  {courseLinks.map((data, index) => (
                    <a
                      href={data.link}
                      className=" px-2  underline   gap-2 text-white font-thin text-xs flex items-center"
                    >
                      <img
                        width={"15px"}
                        className="  border-white"
                        src="/pin.svg"
                      />{" "}
                      <div className=" truncate flex w-full flex-wrap">
                        {data.link}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className=" flex  flex-col w-[60%]">
              <div className=" flex flex-col gap-4">
                <div className=" flex flex-col gap-1">
                  <label className=" text-white">About</label>
                  <div className=" border px-8 border-white flex gap-3 p-2 rounded-xl text-white">
                    In the fast-evolving landscape of mobile, web, and desktop
                    applications, developers are constantly seeking tools that
                    streamline the development process, enhance efficiency, and
                    enable the creation of visually stunning and
                    high-performance user interfaces. Google's open-source
                    project, Flutter, has emerged as a powerful solution,
                    redefining cross-platform app development and contributing
                    significantly to the world of software development.
                  </div>
                </div>
                <div className="flex flex-col">
      <div className="text-white font-bold text-lg mb-2">REVIEWS</div>
      <div
        className="flex flex-col space-y-4 border rounded-lg py-5 px-4 overflow-y-auto"
        style={{ maxHeight: '300px' }} 
      >
        {reviews.map((review) => (
          <div key={review.id} className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
              <img
                src={review.user.profilePic}
                alt={`${review.user.name}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="bg-gray-800 p-2 rounded-lg">
                <p className="text-white">{review.message}</p>
              </div>
              <div className="text-gray-500 text-xs">{`${review.user.name} • ${review.timestamp}`}</div>
            </div>
          </div>
        ))}
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
          className=" rounded-full bg-white flex items-start justify-center p-1 "
        ><img src="/send.svg" width="40px"/>
        </button>
      </div>
    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
