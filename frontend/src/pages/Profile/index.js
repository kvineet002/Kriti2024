import React, { useEffect, useId, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Footer from "../../components/Footer";
import ProfileEditModal from "../../components/ProfileEditModal";
import AddProject from "../../components/AddProject";

import Navbar2 from "../../components/navbar2";
import axios from "axios";

function Profile({SERVER_URL}) {
  const {id}=useParams();
  const userId=localStorage.getItem('id')
  const [profile,setprofile]=useState('');
  const [isfollowing, setisfollowing] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [profileEditData, setProfileEditData] = useState(
    {
      profileUrl: "",
      designation: "",
      about: "",
      joiningYear: "",
      graduatingYear: "",
      socials : {
        github: "",
        linkedin: "",
        instagram: "",
        facebook: "",
        twitter: "",
        youtube: ""
      }
    }
  );
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
    courseLink: []
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
      try {
        // Make a POST request to your backend endpoint
        const response = await axios.post(`${SERVER_URL}/api/users/getuser`, {
          userId:id,
        });
        setprofile(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserById();
  }, [userId,id,profileEdit]);

  return (
    <div className="flex flex-col">
      <Navbar2 SERVER_URL={SERVER_URL} />
      <div className="hero__page">
        <div className="flex md:gap-3 pt-[120px] md:justify-start">
          <div className="px-2 w-[35%] md:w-[20%] flex items-center overflow-hidden mx-4">
            <img
              src={profile.profileUrl}
              alt="profileImg"
              className="border-slate-300 border-2 rounded-full h-24 w-24 md:h-48 md:w-48  m-auto"
            />
          </div>
          <div className="flex  justify-start w-[60%] md:w-[60%] flex-col mr-4">
            <div className=" text-[30px] sm:text-[40px]   font-bold  flex justify-between leading-8 sm:leading-tight">
              <div className="text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-[#868686] via-[#ffffff] to-[#969696] text-[linear-gradient-to-r from-[#DEDEDE]  to-[#79D0F6]]">
                {profile.Name}
                {/* <span className=" text-[6px] font-thin text-white flex flex-nowrap mt-[-6px] mb-[6px] sm:mt-0">{`${
                  profile.graduationPeriod - 4
                } - ${profile.graduationPeriod}`}</span> */}
              </div>

            { (id===userId)&& <div className="flex justify-end">
                <img
                  src="/edit.svg"
                  alt=""
                  className="w-[95px] cursor-pointer hover:invert"
                  onClick={() => {
                    setProfileEdit(true);
                  }}
                />
              </div>}
            </div>
            <div className=" text-white pl-2 text-xs sm:text-base mt-[-4px]">
              {profile.designation}
            </div>
            <div className="text-white pt-6 mt-4 overflow-auto max-h-[100px]">
              {profile.About}
            </div>

            <div className="flex gap-2 pt-4">
              {(profile.socials&&profile.socials.github )&& (
                <Link to={`https://${profile.socials.github}`}  target="blank">
                  <img
                    src="/github.svg"
                    alt="github"
                    className="w-5  md:w-6"
                  />
                </Link>
              )}
              {(profile.socials&&profile.socials.facebook )&& (
                <Link to={`https://${profile.socials.facebook}`}  target="blank">
                  {" "}
                  <img
                    src="/facebook.svg"
                    alt="facebook"
                    className="w-5 sm:w-7 "
                  />
                </Link>
              )}
              {profile.socials&&profile.socials.linkedin&& (
                <Link to={`https://${profile.socials.linkedin}`}  target="blank">
                  {" "}
                  <img
                    src="/linkedin.svg"
                    alt="linkedin"
                    className="w-5 sm:w-7 "
                  />
                </Link>
              )}
              {profile.socials &&profile.socials.twitter&& (
                <Link to={`https://${profile.socials.twitter}`}  target="blank">
                  <img
                    src="/twitter.svg"
                    alt="twitter"
                    className="w-5 sm:w-7 "
                  />
                </Link>
              )}
              {profile.socials&&profile.socials.youtube && (
                <Link to={`https://${profile.socials.youtube}`} target="blank" >
                  <img
                    src="/youtube.svg"
                    alt="youtube"
                    className="w-5 sm:w-7"
                  />
                </Link>
              )}
              {profile.socials&&profile.socials.instagram && (
                <a href={`https://${profile.socials.instagram}`} target="blank">
                  <img
                    src="/instagram.svg"
                    alt="instagram"
                    className="w-5 sm:w-7"
                  />
                </a>
              )}
            </div>
            <div className="mt-8 mb-10">
            {  (id!==userId)&&(isfollowing ? (
                <div
                  className="bg-[rgba(0, 0, 0, 0.10)] rounded-[33.5px] text-white border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center gap-1 font-bold cursor-pointer"
                  onClick={() => {
                    setisfollowing(!isfollowing);
                  }}
                >
                  <img src="/check.svg" className="h-6" />
                  <div>Following</div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setisfollowing(!isfollowing);
                  }}
                  className="bg-white rounded-[33.5px]  border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor-pointer"
                >
                  <p>Follow</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col bg-black justify-center items-center">
      {  (id===userId)&&<div
          className="text-white bg-[#1c1b1b] flex rounded-lg w-[240px]  flex-col justify-center items-center mx-auto my-8 pb-8 cursor-pointer"
          onClick={() => {
            setAddProject(true);
          }}
        >
          <span className="text-[150px] font-thin my-[-50px]">+</span>
          <span> ADD PROJECT</span>
        </div>}
        <div className="flex gap-3 justify-center items-center mt-6 mb-6">
          <div className="bg-[rgba(0, 0, 0, 0.10)] rounded-[33.5px] text-white border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center gap-1 font-bold cursor-pointer">
            Your projects
          </div>
          <div className="bg-white rounded-[33.5px] border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor-pointer">
            Saved projects
          </div>
        </div>

        <div className="bg-[#7c7c7c] h-[1px] my-4 mx-6" />
      </div>
      {/* <div className="flex flex-wrap gap-1 w-screen shadow-inner text-white justify-start">
        {profile.savedProjects.map((project) => (
          <Link to={`/project/${project.courseLink}`}>
            <div
              key={project.title}
              className="relative w-[95vw] h-[290px] sm:w-[400px] flex flex-col m-2 rounded-2xl border-[1px] mx-auto sm:mx-4 overflow-hidden "
            >
              <div
                className="uppercase absolute right-3 top-0 mt-3  rounded-[10px] text-xs text-black bg-green-300 px-4 py-[2px] text-center"
                style={{
                  backgroundColor:
                    colors[
                      project.status[0] == "I"
                        ? 0
                        : project.status[0] == "C"
                        ? 1
                        : project.status[0] == "N"
                        ? 3
                        : 0
                    ],
                }}
              >
                {project.status}
              </div>
              <img
                src={project.bannerUrl}
                alt=""
                className="rounded-t-2xl h-[180px]  object-cover	 "
              />

              <div className="flex flex-col pl-2 py-2">
                <h1 className="uppercase  text-xl md:[2xl-10px] leading-7 text-[] ">
                  {project.title}
                </h1>
                <p className="text-[12px]  leading-4 ">
                  {project.description.length > 100
                    ? project.description.substr(0, 100) + ".."
                    : project.description}
                </p>
                <div className="flex absolute bottom-3 mt-1">
                  {project.listTechnologies.map((tech, index) => {
                    if (index < 4) {
                      return (
                        <div
                          className="m-1 uppercase  px-4 py-1 rounded-[10px] text-xs text-black"
                          style={{
                            backgroundColor:
                              colors[tech.length % colors.length],
                          }}
                          key={index}
                        >
                          {tech}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div> */}

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
      {/* <div>
        <div className=" ">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button
            className=" border border-black  rounded-full p-2 text-xs hover:bg-gray-500"
            onClick={handleUpload}
          >
            Upload Profile Picture
          </button>
          <img src={serverURL} />
          <object className=" h-screen w-screen" data={serverURL} />
        </div>
      </div> */}
    </div>
  );
}

export default Profile;
