import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import LoginModal from "../../components/LoginModal";
import Footer from "../../components/Footer";
import InfiniteScrollingGallery from "../../components/Home";
import Navbar2 from "../../components/navbar2";
import axios from "axios";
import { Link } from "react-router-dom";

function Home({ SERVER_URL }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${SERVER_URL}/project/allprojects`);
        setFeaturedProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="hero__page w-full ">
        <Navbar2 SERVER_URL={SERVER_URL} />
        <div className="pt-[200px]  sm:pt-44 sm:pb-[50px] flex flex-col items-center justify-center gap-7">
          <div>
            <div className="bg-[#FFF] py-3 rounded-full  text-[#474646] text-[15px]  md:text-base flex justify-center items-center font-bold">
              <h1 className=" px-12 md:px-16">
                Endless collaboration possibilities!
              </h1>
            </div>
          </div>
          <div className=" flex flex-col items-center text-white">
            <img className=" w-[70vw]" src="/herotext.svg" />
            <p className=" text-slate-400  lg:text-xl font-medium  text-center mt-4">
              Collaborate. Create. Innovate. Inspire. Revolutionize.
            </p>
            <h3 className="mt-12 font-thin text-center">
              Spark innovation through dynamic collaboration and diverse
              expertise. Embrace the revolution!
            </h3>

            <button
              className="border-2 border-black rounded-[25px] hover:text-black hover:bg-white  w-44 h-12 text-xl my-5 bg-black text-white text-normal mb-[80px]"
              onClick={() => {
                setShowLoginModal(true);
              }}
            >
              Get Started
            </button>
            <div
              className="flex justify-center items-center mb-[3rem] cursor-pointer"
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
            >
              <img
                src="/ScrollDown.svg"
                className="absolute rotate-infinite w-16 sm:w-20 "
              />
              <img src="/Arrow.svg" alt="" className="absolute" />
            </div>
          </div>
        </div>
      </div>
      {/*Login Modal */}
      {showLoginModal && (
        <LoginModal
          SERVER_URL={SERVER_URL}
          onClose={() => setShowLoginModal(false)}
        />
      )}

      <div className="flex flex-col text-[#d9d9d9] about-us pt-8">
        <h1 className=" pl-6 text-6xl my-3">About Us</h1>
        <div className="flex text-[14px] px-auto mt-5  mx-auto text-xl">
          <p className="text-[14px] px-6 my-8 md:text-xl sm:text-base ">
            Collampus is an innovative online platform designed to foster
            collaboration and creativity within the tech community. At its core,
            Collampus serves as a dynamic hub where individuals can seamlessly
            add and showcase their projects, review others' work, connect with
            like-minded individuals through following, and stay informed with
            the latest updates from community discussions.
          </p>
          <p className="text-[14px] px-6 my-8 md:text-xl sm:text-base ">
            Step into our cutting-edge platform, where creativity knows no
            bounds. Discover a modern, stylish space to showcase your projects,
            collaborate seamlessly, and connect with fellow innovators. Join our
            vibrant community and unlock endless opportunities to elevate your
            work and make your mark in the ever-evolving world of digital
            expression.
          </p>
        </div>
      </div>

      {/*Browse Talent*/}

      {/*User Cards*/}
      <InfiniteScrollingGallery />

      {/*Showcase Suite */}
      <div className=" m-5 bg-[#272727] my_shadow flex-col rounded-[5px] z-30 ">
        <div className="flex gap-3 pt-3 items-center pl-3">
          <div className="h-[45px] w-[45px] bg-[#262626] rounded-[50%] flex items-center justify-center">
            <img src="/flag.svg" height="30px" width="30px" />
          </div>
          <h1
            className="text-white font-['Bourrasque'] font-normal 
           text-xl"
          >
            Showcase Suite
          </h1>
        </div>
        <div className="flex-col sm:flex md:flex-row-reverse sm:flex-gap-[10px] sm:justify-between sm:items-center">
          <img
            src="/showcase.jpg"
            alt="architects"
            className=" pt-4 rounded-[5px] sm:w-[520px] "
          />
          <div>
            <div className=" pt-3 pl-[15px] sm:px-[80px] font_urbanist text-white  text-[30px] sm:text-[50px] font-extrabold">
              This is how
              <span className=" text-[#AAA] block">good companies </span>
              <span className="text-[#AAA] block">find good projects.</span>
            </div>
            <div className="font_urbanist text-white pt-6 px-3 sm:px-[80px] text-[16px]">
              Access the top 1% of talent on Collampus, and a full suite of
              hybrid profile management tools. This is how collaboration works
              now.
            </div>
            <div className="flex-col px-2 font_urbanist text-white sm:px-[80px] pt-5 text-[12px] gap-2 pb-8">
              <div className="flex items-center gap-2">
                <img
                  src="/pencil.svg"
                  alt="pencil"
                  className="w-[20px] h-[20px]"
                />
                <div>Access expert talent to fill your skill gaps</div>
              </div>
              <div className="flex items-center gap-2 py-1">
                <img
                  src="/iconbag.svg"
                  alt="pencil"
                  className="w-[20px] h-[20px]"
                />
                <div>
                  Control your workflow: hire, classify and pay your talent
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/iconheadset.svg"
                  alt="pencil"
                  className="w-[20px] h-[20px]"
                />
                <div>Partner with Upwork for end-to-end support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Featured Projects*/}
      <div className="m-5 bg-[#1e1d1d] my_shadow flex-col rounded-[5px] z-30">
        <div className=" text-[#d5edff] font-bold text-4xl md:text-6xl pl-6 py-4">
          Look at some{" "}
          <span className="text-[#379bff] hover:text-[#153c63] cursor-pointer">
            Outstanding projects
          </span>
        </div>
        <div className="relative overflow-hidden">
          {loading ? (
            <img
              src="https://firebasestorage.googleapis.com/v0/b/campus-collabrate.appspot.com/o/others%2FLoading.gif?alt=media&token=66254778-8e7a-4582-b752-250852618408"
              alt="Loading..."
              className="w-[50px] m-auto"
            ></img>
          ) : (
            <div className="relative overflow-hidden flex items-center">
              <button className="absolute bg-[#dededebc] w-[50px] h-[50px] rounded-[50%] z-50 mx-3 drop-shadow-2xl hover:bg-[#c1c1c1] border-2 border-black" onClick={(e)=>{
                e.preventDefault();
                let box = document.querySelector('.project_container');
                let width = box.clientWidth;
                box.scrollLeft = box.scrollLeft - width/2;
              }}><p className=" text-3xl">&lt;</p></button>
              <button className="absolute bg-[#dededebc] w-[50px] h-[50px] rounded-[50%] z-50 right-0 mx-3 drop-shadow-2xl hover:bg-[#c1c1c1] border-2 border-black" onClick={(e)=>{
                e.preventDefault();
                let box = document.querySelector('.project_container');
                let width = box.clientWidth;
                box.scrollLeft = box.scrollLeft + width/2;
              }}><p className=" text-3xl">&gt;</p></button>
              <div className="flex overflow-x-hidden scroll-smooth project_container">
                {featuredProjects &&
                  featuredProjects.length > 0 &&
                  featuredProjects
                    .slice()
                    .sort((a, b) => b.likes.length - a.likes.length)
                    .slice(0, Math.min(featuredProjects.length, 6))
                    .map((project) => (
                      <Link to={`/project/${project._id}`} key={project.title}>
                        <div className="relative w-[95vw]  hover:opacity-80  h-[290px] sm:w-[400px] flex flex-col m-2 rounded-2xl border-[1px] border-[#565656] mx-4 overflow-hidden ">
                          <div
                            className={` absolute right-3 top-0 mt-3  rounded-[10px] text-xs border-[#069D30] text-black  px-4 py-[2px] text-center  ${
                              project.status === "Completed"
                                ? "bg-[#66ec8b]"
                                : "bg-red-200"
                            }`}
                          >
                            {project.status}
                          </div>
                          <img
                            src={featuredProjects && project.bannerUrl}
                            alt=""
                            className="rounded-t-2xl h-[180px]  object-cover	 "
                          />

                          <div className="flex flex-col px-2 py-2">
                            <h1 className="uppercase  text-xl md:[2xl-10px] font-bold leading-7 text-white">
                              {project.title}
                            </h1>
                            <p className="text-[12px] text-[#8B8B8B]  font-light leading-4 ">
                              {project.description.length > 50
                                ? project.description.substr(0, 50) + ".."
                                : project.description}
                            </p>
                            <div className="flex absolute bottom-3 mt-1">
                              {project.technologies &&
                                project.technologies.length > 0 &&
                                project.technologies.map((tech) => {
                                  return (
                                    <div
                                      className={`m-1 uppercase  px-3 py-1 rounded-full text-xs text-white border border-[#565656] bg-[${tech.color}]`}
                                    >
                                      {tech}
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mx-4 mb-8">
                          <img
                            src={project.creator[0].profileUrl}
                            className="oveflow-hidden  object-cover rounded-[50%] bg-white  w-[40px] h-[40px] "
                          ></img>
                          <div className="flex flex-col gap-[2px] w-[70%] mx-3 ">
                            <h1 className="text-[18px] uppercase  font-semibold leading-4 text-white">
                              {project.creator[0].Name}
                            </h1>
                            <p className="text-sm font-thin  text-[#8B8B8B]">
                              {project.creator[0].designation}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Queries */}
      <div className="m-5 bg-[#1e1d1d] my_shadow flex-col rounded-[5px] z-30">
        <div className="text-white text-5xl font-semibold ml-6 my-6 pt-5">
          Got <span className="text-[#AAA]">Queries?</span>
        </div>
        <div className="w-full px-4 divide-slate-200 py-4">
          <details className="p-4 group" open>
            <summary className="relative cursor-pointer list-none pr-8 font-medium text-[#eeeeee] group-hover:text-[#767676] transition-colors duration-300 focus-visible:outline-none">
              Is there any project size limit?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-white group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 text-slate-500">
              Absolutely not! Small or big, we love them all.
            </p>
          </details>
          <hr className="border-white" />
          <details className="p-4 group">
            <summary className="relative cursor-pointer list-none pr-8 font-medium text-[#eeeeee] group-hover:text-[#767676] transition-colors duration-300 focus-visible:outline-none">
              Can I collaborate with multiple projects?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-white group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 text-slate-500">
              Of course! There's no limit. Help bring as many ideas to life.
            </p>
          </details>
          <hr className="border-white" />
          <details className="p-4 group">
            <summary className="relative cursor-pointer list-none pr-8 font-medium transition-colors duration-300 focus-visible:outline-none text-[#eeeeee] group-hover:text-[#767676]">
              Is it easy to use?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-white group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 text-slate-500">As easy as pie! We promise.</p>
          </details>
          <hr className="border-white" />
          <details className="p-4 group">
            <summary className="relative cursor-pointer list-none pr-8 font-medium text-[#eeeeee] group-hover:text-[#767676] transition-colors duration-300 focus-visible:outline-none">
              Is there any time limit for adding subsequent projects?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-white group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 text-slate-500">
              Yes, to protect our website from spamming we have made time limit
              of 1 hour in adding subsequent project.
            </p>
          </details>
          <hr className="border-white" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
