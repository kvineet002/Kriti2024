import React, { useEffect, useId, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import ProfileEditModal from "../../components/ProfileEditModal";
import AddProject from "../../components/AddProject";

import Navbar2 from "../../components/navbar2";
import axios from "axios";
import LoginModal from "../../components/LoginModal";
import DeleteProject from "../../components/DeleteProject";
import PageLoader from "../../components/pageLoader";

function Profile({ SERVER_URL }) {
  const [loggedIn, setLoggedIn] = useState(
    false || localStorage.getItem("token")
  );
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { id } = useParams();
  const userId = localStorage.getItem("id");
  const [profile, setprofile] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
const isAdmin=localStorage.getItem('email')==='vineet.mech22@iitg.ac.in';
  const [AllProjects, setAllProjects] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Your Projects");
  const [loading, setLoading] = useState(false);
  const [deleteproj, setDeleteproj] = useState(false);
  const [pageloading, setPageloading] = useState(true);

  const [profileEditData, setProfileEditData] = useState({
    profileUrl: "",
    designation: "",
    about: "",
    joiningYear: "",
    graduatingYear: "",
    socials: {
      github: "",
      linkedin: "",
      instagram: "",
      facebook: "",
      twitter: "",
      youtube: "",
    },
  });
  const [addProject, setAddProject] = useState(false);
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    bigdescription: "",
    category: "Web Dev",
    bannerUrl: "",
    extraMedia: [],
    status: "Completed",
    openCollab: false,
    statusMessage: "",
    technologies: [],
    courseLink: [],
  });

  const colors = [
    "blue",
    "green",
    "pink",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#f0f0f0",
  ];
  useEffect(() => {
    const fetchUserById = async () => {
      setPageloading(true);
      try {
        // Make a POST request to your backend endpoint
        const response = await axios.post(`${SERVER_URL}/api/users/getuser`, {
          userId: id,
        });
        setprofile(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      finally {
        setPageloading(false);
      }
    };
    fetchUserById();
  }, [userId, id, profileEdit]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${SERVER_URL}/project/allprojects`);
        setAllProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterProjects = (tab) => {
    const filtered = AllProjects.filter((project) => {
      if (tab === "Your Projects") {
        return project.creator.some((creator) => creator.id === id);
      } else if (tab === "Saved Projects") {
        return project.saved.some((saved) => saved.id === id);
      }
    });

    setFilteredProjects(filtered);
  };
  useEffect(() => {
    filterProjects(selectedTab);
  }, [AllProjects, selectedTab]);
  const fetchFollowingUsers = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/users/getfollowing`,
        {
          userId: userId,
        }
      );
      loggedIn && setIsFollowing(response.data.some((user) => user._id === id));
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
          targetUserId: id,
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
  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
    // The useEffect hook will automatically re-filter projects based on the new tab.
  };
  function calculateHoursDifference(specificDateString) {
    // Convert the date string to a Date object
    const specificDate = new Date(specificDateString);

    // Get the current date
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - specificDate;

    // Convert the time difference to hours
    const minutesDifference = timeDifference / (1000 * 60);

    return Math.floor(minutesDifference);
  }

  return (
    <div className="flex flex-col">
      <Navbar2 SERVER_URL={SERVER_URL} />
     {pageloading?<PageLoader/>: <div className=" w-full h-full">
      <div className="hero__page w-full">
        <div className="flex md:gap-3 gap-5 pt-[140px] pb-6 md:justify-start">
          <div className="w-[35%] md:w-[20%] flex items-center overflow-hidden mx-2 my-auto">
            <img
              src={profile.profileUrl}
              alt="profileImg"
              className="border-[#565656] object-cover border-2 rounded-full h-32 w-32 md:h-48 md:w-48 m-auto"
            />
          </div>
          <div className="flex flex-wrap w-[60%] justify-between">
            <div className="flex justify-start flex-col mr-4">
              <div className=" text-[30px] sm:text-[40px] font-bold flex justify-between leading-8 sm:leading-tight">
                {/* <div className="text-transparent flex flex-wrap bg-clip-text font-extrabold bg-gradient-to-r from-[#868686] via-[#ffffff] to-[#969696] text-[linear-gradient-to-r from-[#DEDEDE]  to-[#79D0F6]] w-full border-2">
                  <div className="">{profile.Name}</div>
                  {profile.joiningYear && profile.graduatingYear && <div className=" text-[12px] font-thin text-white">{`${
                  profile.joiningYear
                } - ${profile.graduatingYear}`}</div>}
                </div> */}
                <div className="flex flex-wrap gap-1">
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#868686] via-[#ffffff] to-[#969696] text-[linear-gradient-to-r from-[#DEDEDE] to-[#79D0F6]]">
                    {profile.Name}
                  </div>
                  {profile.joiningYear && profile.graduatingYear && (
                    <div className=" text-[12px] font-thin text-[#aeaeae] mt-auto sm:mt-7">{`${profile.joiningYear} - ${profile.graduatingYear}`}</div>
                  )}
                </div>
              </div>
              <div className=" text-white text-xs sm:text-base mt-[-4px]">
                {profile.designation}
              </div>
              <div className="text-white pt-6 mt-4 overflow-auto max-h-[100px]">
                {profile.About}
              </div>

              <div className="flex gap-2 py-4">
                {profile.socials && profile.socials.github && (
                  <Link to={`https://${profile.socials.github}`} target="blank">
                    <img
                      src="/github.svg"
                      alt="github"
                      className="w-5  md:w-6"
                    />
                  </Link>
                )}
                {profile.socials && profile.socials.facebook && (
                  <Link
                    to={`https://${profile.socials.facebook}`}
                    target="blank"
                  >
                    {" "}
                    <img
                      src="/facebook.svg"
                      alt="facebook"
                      className="w-5 sm:w-7 "
                    />
                  </Link>
                )}
                {profile.socials && profile.socials.linkedin && (
                  <Link
                    to={`https://${profile.socials.linkedin}`}
                    target="blank"
                  >
                    {" "}
                    <img
                      src="/linkedin.svg"
                      alt="linkedin"
                      className="w-5 sm:w-7 "
                    />
                  </Link>
                )}
                {profile.socials && profile.socials.twitter && (
                  <Link
                    to={`https://${profile.socials.twitter}`}
                    target="blank"
                  >
                    <img
                      src="/twitter.svg"
                      alt="twitter"
                      className="w-5 sm:w-7 "
                    />
                  </Link>
                )}
                {profile.socials && profile.socials.youtube && (
                  <Link
                    to={`https://${profile.socials.youtube}`}
                    target="blank"
                  >
                    <img
                      src="/youtube.svg"
                      alt="youtube"
                      className="w-5 sm:w-7"
                    />
                  </Link>
                )}
                {profile.socials && profile.socials.instagram && (
                  <a
                    href={`https://${profile.socials.instagram}`}
                    target="blank"
                  >
                    <img
                      src="/instagram.svg"
                      alt="instagram"
                      className="w-5 sm:w-7"
                    />
                  </a>
                )}
              </div>
              {id !== userId && (
                <div className="mt-8 mb-10">
                  {" "}
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
                </div>
              )}
            </div>

            {(id === userId||isAdmin)&& (
              <div className=" py-4">
                <img
                  src="/edit.svg"
                  alt=""
                  className="w-[95px] cursor-pointer hover:invert"
                  onClick={() => {
                    setProfileEdit(true);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {showLoginModal && (
        <LoginModal
          SERVER_URL={SERVER_URL}
          onClose={() => setShowLoginModal(false)}
        />
      )}
      {deleteproj && (
        <DeleteProject
          SERVER_URL={SERVER_URL}
          remainingtime={10 - calculateHoursDifference(profile.lastposttime)}
          onCancel={() => {
            setDeleteproj(!deleteproj);
          }}
        />
      )}

      <div className="flex-col pt-8 bg-black justify-center items-center">
        {id === userId && (
          <div
            className="text-white bg-[#1c1b1b] flex  w-[240px]  flex-col justify-center items-center mx-auto  pb-8 cursor-pointer"
            onClick={() => {
              profile.lastposttime
                ? calculateHoursDifference(profile.lastposttime) >= 10
                  ? setAddProject(true)
                  : setDeleteproj(true)
                : setAddProject(true);
            }}
          >
            <span className="text-[150px] font-thin my-[-50px]">+</span>
            <span> ADD PROJECT</span>
          </div>
        )}
        <div className="flex gap-3 justify-center items-center mt-6 mb-6">
          <button
            onClick={() => handleTabChange("Your Projects")}
            className={` text-sm  border border-[#565656] hover:opacity-80 rounded-full px-3 py-1 ${
              selectedTab === "Your Projects"
                ? "font-bold text-black bg-white"
                : " text-white"
            }`}
          >
            {userId === id ? "Your Projects" : "Projects"}
          </button>
          <button
            onClick={() => handleTabChange("Saved Projects")}
            className={` text-sm  border border-[#565656] hover:opacity-80 rounded-full px-3 py-1 ${
              selectedTab === "Saved Projects"
                ? "font-bold text-black bg-white"
                : " text-white"
            }`}
          >
            Saved Projects
          </button>
        </div>

        <div className="bg-[#7c7c7c] h-[1px] my-4 mx-6" />
      </div>
      {loading ? (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/campus-collabrate.appspot.com/o/others%2FLoading.gif?alt=media&token=66254778-8e7a-4582-b752-250852618408"
          alt="Loading..."
          className="w-[50px] m-auto"
        ></img>
      ) : (
        <div className="flex flex-wrap gap-1 w-screen  ">
          {filteredProjects.length > 0 &&
            filteredProjects.map((project) => (
              <Link to={`/project/${project._id}`}>
                <div
                  key={project.title}
                  className="relative w-[95vw]  hover:opacity-80  h-[290px] sm:w-[400px] flex flex-col m-2 rounded-2xl border-[1px] border-[#565656] mx-4 overflow-hidden "
                >
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
                    src={filteredProjects && project.bannerUrl}
                    alt=""
                    className="rounded-t-2xl h-[180px]  object-cover	 "
                  />

                  <div className="flex flex-col px-2 py-2">
                    <h1 className="uppercase  text-xl md:[2xl-10px] text-white font-bold leading-7 ">
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
              </Link>
            ))}
        </div>
      )}

      <Footer />
      {profileEdit && (
        <ProfileEditModal
          onClose={() => {
            setProfileEdit(false);
          }}
          profileEditData={profileEditData}
          setProfileEditData={setProfileEditData}
          Email={profile.Email}
          Name={profile.Name}
          SERVER_URL={SERVER_URL}
          profile={profile}
          setprofile={setprofile}
        />
      )}
      {addProject && (
        <AddProject
          onCancel={() => {
            setAddProject(false);
          }}
          projectData={projectData}
          setProjectData={setProjectData}
          SERVER_URL={SERVER_URL}
        />
      )}
      </div>}
    </div>
  );
}

export default Profile;
