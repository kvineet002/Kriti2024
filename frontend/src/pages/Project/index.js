import React, { useEffect, useId, useState } from "react";
import Navbar2 from "../../components/navbar2";
import { useParams } from "react-router";
import axios from "axios";
import LoginModal from "../../components/LoginModal";
import { Link } from "react-router-dom";
import ReviewBox from "../../components/ReviewBox";
import Footer from "../../components/Footer";
import EditProject from "../../components/EditProject";
import DeleteProject from "../../components/DeleteProject";
import DeleteProj from "../../components/DeleteProj";
import PageLoader from "../../components/pageLoader";

function Project({ SERVER_URL }) {
  const [loggedIn, setLoggedIn] = useState(
    false || localStorage.getItem("token")
  );
  const isAdmin=localStorage.getItem('email')==="vineet.mech22@iitg.ac.in";
  const { id } = useParams();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const userId = localStorage.getItem("id");
  const [project, setProject] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [saveCount, setSaveCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editProject, setEditProject] = useState(false);
  const [deleteproj, setDeleteproj] = useState(false);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/project/likeorunlike-project`,
        {
          userId: userId,
          projectId: id,
        }
      );
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.error("Error updating following status:", error);
    }
  };
  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/project/saveorunsave-project`,
        {
          userId: userId,
          projectId: id,
        }
      );
      setIsSaved(!isSaved);
      setSaveCount(isSaved ? saveCount - 1 : saveCount + 1);
    } catch (error) {
      console.error("Error updating following status:", error);
    }
  };
  useEffect(() => {
    setLoading(true);
    const fetchProject = async () => {
      try {
        const response = await axios.post(`${SERVER_URL}/project/getproject`, {
          projectId: id,
        });

        setProject(response.data);
        setLikeCount(response.data.likes.length);
        loggedIn &&
          setIsLiked(response.data.likes.some((like) => like.id === userId));
        setSaveCount(response.data.saved.length);
        loggedIn &&
          setIsSaved(response.data.saved.some((save) => save.id === userId));
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, userId]);
  const fetchFollowingUsers = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/users/getfollowing`,
        {
          userId: userId,
        }
      );
      loggedIn &&
        setIsFollowing(
          response.data.some((user) => user._id === project.creator[0].id)
        );
    } catch (error) {
      console.error("Error fetching following users:", error);
    }
  };

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/users/togglefollow`,
        {
          userId: userId,
          targetUserId: project && project.creator[0].id,
        }
      );
      fetchFollowingUsers();
    } catch (error) {
      console.error("Error updating following status:", error);
    }
  };
  useEffect(() => {
    fetchFollowingUsers();
  }, [handleFollow]);
  return (
    <div>
      <Navbar2 SERVER_URL={SERVER_URL} />
      {loading ? (
        <PageLoader />
        // <img
        //   src="https://firebasestorage.googleapis.com/v0/b/campus-collabrate.appspot.com/o/others%2FLoading.gif?alt=media&token=66254778-8e7a-4582-b752-250852618408"
        //   className="w-[50px] md:mt-[8%] mt-[25%] m-auto "
        // ></img>
      ) : (
        <div className=" md:mt-[8%] mt-[25%] rounded-lg border-[#565656] border p-5 md:mx-20 mx-2">
          {(project.creator[0].id === userId||isAdmin) && (
                    <div className="flex md:justify-end justify-center md:mr-10 items-center gap-4 mb-6 w-full">
                      <div className= "rounded-[33.5px] w-[80px] text-center uppercase text-xs h-7 flex justify-center items-center font-bold cursor-pointer text-black bg-[#e64d4d]  hover:opacity-70"
                      onClick={()=>{
                        setDeleteproj(!deleteproj);
                      }}
                      >
                        Delete
                      </div>
                      <div className="w-[100px] hover:opacity-80 cursor-pointer" onClick={() => {
                          setEditProject(!editProject);
                        }}>
                        <img src="/edit.svg" alt="Edit" />
                      </div>
                    </div>
                  )}
          <div className=" flex flex-col gap-6">
            <div className=" flex  flex-col gap-2">
              <div className=" flex  justify-between items-center">
                <div className=" flex gap-2 items-center">
                  <div className=" text-white font-bold text-sm  md:text-2xl">
                    {project && project.title}
                  </div>
                </div>
                <div className=" flex gap-4">
                  <div
                    onClick={
                      loggedIn
                        ? handleLike
                        : () => {
                            setShowLoginModal(true);
                          }
                    }
                    className=" rounded-full md:px-6 pr-6 pl-3 py-1 flex items-center bg-white cursor-pointer "
                  >
                    <img
                      className=" w-5"
                      src={isLiked ? "/likestate.svg" : "/unlikestate.svg"}
                    />
                    <span className="   font-semibold">{likeCount}</span>
                  </div>
                  <div
                    onClick={
                      loggedIn
                        ? handleSave
                        : () => {
                            setShowLoginModal(true);
                          }
                    }
                    className=" rounded-full md:px-6 pr-6 pl-3 py-1 flex items-center gap-1 bg-white cursor-pointer "
                  >
                    <img
                      className=" w-5"
                      src={isSaved ? "/savestate.svg" : "/unsavestate.svg"}
                    />
                    <span className="   font-semibold">{saveCount}</span>
                  </div>
                </div>
              </div>
              <div className=" text-white  font-light text-sm w-[90%]">
                {project && project.description}{" "}
              </div>
            </div>
            <div className=" flex justify-between px-2">
              <div className="flex gap-2  items-center">
                <div className="   bg-slate-400 rounded-full flex object-cover bg-cover items-center justify-center ">
                  <img
                    src={project && project.creator[0].profileUrl}
                    className="w-10 h-10  bg-cover rounded-full object-cover"
                    alt=""
                  />
                </div>
                <Link
                  to={`/profile/${project && project.creator[0].id}`}
                  className=" flex flex-col"
                >
                  <div className="  text-white">
                    {project && project.creator[0].Name}
                  </div>
                  <div className=" text-[#C4C4C4] text-xs">
                    {project && project.creator[0].designation}
                  </div>
                </Link>
              </div>

              {project.creator[0].id !== userId && (
                <button>
                  {isFollowing ? (
                    <div
                      onClick={() => handleFollow()}
                      className="bg-[rgba(0, 0, 0, 0.10)] rounded-full text-white border-white border-2 px-4 text-center uppercase text-xs py-[3px] flex justify-center items-center gap-1 font-bold cursor-pointer"
                    >
                      <img src="/check.svg" className="h-6" />
                      <div>Following</div>
                    </div>
                  ) : (
                    <div
                      onClick={
                        loggedIn
                          ? () => handleFollow()
                          : () => {
                              setShowLoginModal(true);
                            }
                      }
                      className="bg-white rounded-full  border-white border-2 px-4 text-center uppercase text-xs py-[6px] flex justify-center items-center font-bold cursor-pointer"
                    >
                      Follow
                    </div>
                  )}
                </button>
              )}
            </div>
            {showLoginModal && (
              <LoginModal
                SERVER_URL={SERVER_URL}
                onClose={() => setShowLoginModal(false)}
              />
            )}
            <div className="  w-full ">
              <img className=" rounded-xl" src={project && project.bannerUrl} />
            </div>
            <div className=" flex-col flex md:flex-row md:flex w-full md:justify-between ">
              <div className=" flex flex-col md:w-[35%] gap-8 w-full">
                <div className=" flex flex-col gap-1">
                  <label className=" text-white">Project Links</label>
                  <div className=" border border-[#565656]  flex gap-3 p-2 rounded-xl">
                    <a
                      target="blank"
                      href={
                        project &&
                        project.projectLinks &&
                        `${project.projectLinks.github}`
                      }
                      className=" px-3 py-1 cursor-pointer  justify-center gap-1  text-black  font-bold text-xs flex items-center bg-[#FFF]  rounded-full"
                    >
                      <img src="/github2.svg" /> GITHUB
                    </a>
                    <a
                      target="blank"
                      href={
                        project &&
                        project.projectLinks &&
                        `${project.projectLinks.demo}`
                      }
                      className=" px-3 py-1 cursor-pointer  text-black  font-bold text-xs flex gap-1 items-center bg-[#FFF]  rounded-full"
                    >
                      <img width="15px" src="/demo.svg" /> DEMO
                    </a>
                  </div>
                </div>
                <div className=" flex flex-col gap-1">
                  <label className=" text-white">Tech stacks</label>
                  <div className=" border border-[#565656] flex flex-wrap gap-3 p-2 rounded-xl">
                    {project &&
                      project.technologies.map((data, index) => (
                        <div
                          className={` px-3 py-1  text-black   font-bold text-xs flex items-center  rounded-full bg-white bg-[${data.color}]`}
                        >
                          {data}
                        </div>
                      ))}
                  </div>
                </div>
                {project && project.statusMessage.length > 0 && (
                  <div className="border border-[#565656] bg-white flex-col flex justify-start   gap-2 p-2 rounded-xl">
                    <div className="bg-[#66ec8b] border justify-start w-min border-[#069D30] text-xs px-3  rounded-full py-1">
                      Collaboration
                    </div>
                    <div className=" font-extralight  text-sm">
                      {project && project.statusMessage}
                    </div>
                  </div>
                )}
           {   project&&project.courseLinks.length>0&&  <div className=" flex flex-col gap-1">
                  <label className=" text-white">Courses / material</label>
                  <div className=" border border-[#565656]  flex flex-col gap-3 p-2 py-4  rounded-xl">
                    {project &&
                      project.courseLinks.map((data, index) => (
                        <a
                          href={data}
                          target="blank"
                          className=" px-2  underline   gap-2 text-white font-thin text-xs flex items-center"
                        >
                          <img
                            width={"15px"}
                            className="  border-[#565656] "
                            src="/pin.svg"
                          />{" "}
                          <div className=" truncate flex w-full flex-wrap">
                            {data}
                          </div>
                        </a>
                      ))}
                  </div>
                </div>}
              </div>
              <div className=" flex  flex-col md:w-[60%] w-full">
                <div className=" flex flex-col gap-4">
                 {project&&project.bigdescription.length>0&& <div className=" flex flex-col gap-1">
                    <label className=" text-white">About</label>
                    <div className=" border px-8 border-[#565656]  flex gap-3 p-2 rounded-xl text-white">
                      {project && project.bigdescription}{" "}
                    </div>
                  </div>}
                  <ReviewBox
                    SERVER_URL={SERVER_URL}
                    projectId={id}
                    loggedIn={loggedIn}
                    setShowLoginModal={setShowLoginModal}
                    creatorId= {project.creator[0].id}
                  />
                  
                </div>
                {editProject && <EditProject
                  onCancel={() => {
                    setEditProject(false);
                  }}
                  project={project}
                  setProject={setProject}
                  SERVER_URL={SERVER_URL}
                />}

                {
                  deleteproj &&
                   <DeleteProj
                  SERVER_URL={SERVER_URL}
                      onCancel={() => {
                        setDeleteproj(!deleteproj);
                      }}
                   />
                }
              </div>
            </div>
            
          </div>
          
        </div>
        
      )}
      <Footer />
    </div>
  );
}

export default Project;
