import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
export default function OutstandingProject({ SERVER_URL}) {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollHandler = (direction) => (e) => {
    e.preventDefault();
    const box = document.querySelector('.project_container');
    const width = box.clientWidth;

    if (direction === 'left') {
      box.scrollBy({
        left: -width/2,
        behavior: 'smooth',
      });
    } else if (direction === 'right') {
      box.scrollBy({
        left: width/2,
        behavior: 'smooth',
      });
    }
  };
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
    <div className="m-5 bg-[#1e1d1d] my_shadow flex-col rounded-[5px] z-30">
    <div className=" text-[#AAA] font-bold text-4xl md:text-6xl pl-6 py-4">
      Look at some{" "}
      <span className="text-[#fff]">
        Outstanding projects
      </span>
    </div>
    <div className="relative overflow-hidden">
      {loading ? (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/campus-collabrate.appspot.com/o/others%2FLoading.gif?alt=media&token=66254778-8e7a-4582-b752-250852618408"
          alt="Loading..."
          className="w-[50px] m-auto mb-6"
        ></img>
      ) : (
        <div className="relative overflow-hidden flex items-center mt-5 mb-2">
          <button className="absolute bg-[#dedede8e] w-[50px] h-[50px] translate-x-2 rounded-[50%] z-50 mx-3 drop-shadow-2xl  border-2 border-black" onClick={scrollHandler('left')}><p className=" text-3xl">&lt;</p></button>
          <button className="absolute bg-[#dededebc] w-[50px] h-[50px] flex items-center justify-center rounded-[50%] z-50 right-0 mx-3 drop-shadow-2xl hover:bg-[#c1c1c1] border-2 border-black" onClick={scrollHandler('right')}><p className=" text-3xl">&gt;</p></button>
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
  )
}
