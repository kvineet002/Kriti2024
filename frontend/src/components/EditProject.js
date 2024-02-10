import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../pages/Login/authConfig";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";
import axios from "axios";
import { useParams } from "react-router-dom";
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const techStack = [
  "JavaScript",
  "Python",
  "Java",
  "C#",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "TypeScript",
  "Go",
  "HTML/CSS",
  "React.js",
  "Angular",
  "Vue.js",
  "Node.js",
  "Django",
  "Flask",
  "Ruby on Rails",
  "ASP.NET",
  "Express.js",
  "React Native",
  "Flutter",
  "Xamarin",
  "Swift (iOS)",
  "Kotlin (Android)",
  "Java (Android)",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "SQLite",
  "SQL Server",
  "Oracle Database",
  "Express.js",
  "Django",
  "Flask",
  "Ruby on Rails",
  "Spring Boot",
  "ASP.NET Core",
  "Laravel",
  "Go (Golang)",
  "Node.js",
  "PHP",
  "(AWS)",
  "Microsoft Azure",
  "(GCP)",
  "Heroku",
  "DigitalOcean",
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "Jenkins",
  "Travis CI",
  "CircleCI",
  "Docker",
  "Kubernetes",
  "Ansible",
  "Terraform",
  "React.js",
  "Angular",
  "Vue.js",
  "Bootstrap",
  "Tailwind CSS",
  "Express.js (Node.js)",
  "Django (Python)",
  "Flask (Python)",
  "Ruby on Rails (Ruby)",
  "Spring Boot (Java)",
  "ASP.NET Core (C#)",
  "Laravel (PHP)",
  "React Native",
  "Flutter (Dart)",
  "Xamarin (C#)",
  "Jest",
  "Mocha",
  "Selenium",
  "Cypress",
  "JUnit",
  "NUnit",
  "VS Code",
  "IntelliJ IDEA",
  "Eclipse",
  "Atom",
  "Sublime Text",
  "Jira",
  "Trello",
  "Asana",
  "Monday.com",
  "Notion",
];

const statuses = ["Completed", "Ongoing"];
const categories = ["Web Dev", "Android Dev", "AI/ML"];

function EditProject({ onCancel, project, setProject, SERVER_URL }) {
  const {id}=useParams();
  const userId=localStorage.getItem('id')//TODO: get from local storage
  const [banner, setBanner] = useState({
    file: null,
    preview: project.bannerUrl,
  });
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openCollab, setOpenCollab] = useState(false);
  const [techStackInput, setTechStackInput] = useState("");
  const [techStackSuggestions, setTechStackSuggestions] = useState([]);
  const [newUrl, setNewUrl] = useState("");

    //Handling Urls
    const handleAddUrl = () => {
        if (newUrl.trim() !== "") {
          setProject({
            ...project,
            courseLinks: [...project.courseLinks, newUrl.trim()],
          });
          setNewUrl(""); 
        }
      };

  useEffect(() => {
    if (project && project.statusMessage.length > 0) {
      setOpenCollab(true);
    }

  }, []);
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  //Handling Banner Image
  const handleBannerImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner({
        file,
        preview: URL.createObjectURL(file),
      });
      setSelectedFile(file);
    } else {
      setBanner({
        file: null,
        preview: project.bannerUrl,
      });
      setSelectedFile(null);
    }
  };

  const handleTechStackInputChange = (e) => {
    const input = e.target.value;
    setTechStackInput(input);
    setTechStackSuggestions(
      input.trim() === ""
        ? []
        : techStack.filter((item) =>
            item.toLowerCase().includes(input.toLowerCase())
          )
    );
  };
  const toggleTechStacks = (item) => {
    setProject((prevData) => {
      const updatedTechStacks = prevData.technologies.includes(item)
        ? prevData.technologies.filter((it) => it !== item)
        : [...prevData.technologies, item];

      return {
        ...prevData,
        technologies: updatedTechStacks,
      };
    });
  };

  const handleSubmit = async() => {
    setLoading(true);

    try {
      let downloadUrl="";
      if (selectedFile) {
        const storageRef = ref(storage, `Profiles/${selectedFile.name}`);
        const uploadResult = await uploadBytes(storageRef, selectedFile);
        downloadUrl = await getDownloadURL(uploadResult.ref);
      }
      const response = await axios.post(`${SERVER_URL}/project/updateproject`, 
      {projectId:id,
        title:project.title,
        description:project.description,
        category:project.category,
        bannerUrl:downloadUrl.length>0?downloadUrl:project.bannerUrl,
        bigdescription:project.bigdescription,
        status:project.status,
        statusMessage:project.statusMessage,
        technologies:project.technologies,
        creator:{
          id:userId,
          Name:localStorage.getItem('Name'),
          email:localStorage.getItem('email'),
          designation:localStorage.getItem('designation'),
          profileUrl:localStorage.getItem('profileUrl'),

        },
        courseLinks:project.courseLinks,
        projectLinks:{
          github:project.GitURL,
          demo:project.DemoLink,
        }
      });
      console.log('Project updated:', response.data);
    } catch (error) {
      console.error('Error updating project:', error);
    }
    finally{
      setLoading(false); 

      onCancel()
    }
  };
console.log(banner)
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden inset-0 z-50 outline-none focus:outline-none fixed no-scrollbar">
        <div
          className="relative w-[95%] mx-auto text-white bg-[#1e1d1d] rounded-lg pt-10 pb-7 border-[#565656] border-2 my-10 h-[90vh] overflow-y-scroll md:no-scrollbar"
          ref={menuRef}
        >
          <div className="flex flex-col justify-center items-center ">
            <div className=" self-start text-[36px] font-semibold mx-5">
              Edit Project
            </div>
            <form
              className="flex flex-wrap justify-between w-full mt-5 gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="w-full overflow-hidden md:w-[65%]">
                {/* Title */}
                <div className="flex flex-col self-start px-5 mb-4 gap-1 w-full">
                  <label htmlFor="text" className="text-sm font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    className=" outline-none bg-transparent border-white border-b-2 w-full"
                    onChange={(e) => {
                      const inp = e.target.value;
                      setProject((prev) => ({
                        ...prev,
                        title: inp,
                      }));
                    }}
                    value={project.title}
                    
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col self-start px-5 mt-2 mb-4 gap-1 w-full">
                  <label htmlFor="text" className="text-sm font-medium">
                    Description
                  </label>
                  <input
                    name="description"
                    type="text"
                    className="outline-none bg-transparent border-white border-b-2 w-full h-10"
                    onChange={(e) => {
                      const inp = e.target.value;
                      setProject((prev) => ({
                        ...prev,
                        description: inp,
                      }));
                    }}
                    value={project && project.description}
                  
                  />
                </div>

                {/* About */}
                <div className="flex flex-col self-start px-5 mt-2 mb-4 gap-1 w-full">
                  <label htmlFor="text" className="text-sm font-medium">
                    About
                  </label>
                  <input
                    name="about"
                    type="text"
                    className="outline-none bg-transparent border-white border-b-2 w-full h-10"
                    onChange={(e) => {
                      const inp = e.target.value;
                      setProject((prev) => ({
                        ...prev,
                        bigdescription: inp,
                      }));
                    }}
                    value={project.bigdescription}
                  
                  ></input>
                </div>

                {/* Github */}
                <div className="flex flex-col self-start px-5 mb-4 gap-1 w-full">
                  <label htmlFor="text" className="text-sm font-medium">
                    Github Repo URL
                  </label>
                  <input
                    type="text"
                    className=" outline-none bg-transparent border-white border-b-2 w-full"
                    onChange={(e) => {
                      const inp = e.target.value;
                      setProject((prev) => ({
                        ...prev,
                        projectLinks: { ...prev.projectLinks, github: inp },
                      }));
                    }}
                    value={project.projectLinks && project.projectLinks.github}
                  />
                </div>

                {/* Website Link */}
                <div className="flex flex-col self-start px-5 mb-4 gap-1 w-full">
                  <label htmlFor="text" className="text-sm font-medium">
                    Website Link(Optional)
                  </label>
                  <input
                    type="text"
                    className=" outline-none bg-transparent border-white border-b-2 w-full"
                    onChange={(e) => {
                      const inp = e.target.value;
                      setProject((prev) => ({
                        ...prev,
                        projectLinks: { ...prev.projectLinks, demo: inp },
                      }));
                    }}
                    value={project.projectLinks && project.projectLinks.demo}
                  />
                </div>

                {/* Banner Image*/}
                <div className="bg-white text-black text-sm font-semibold w-32 ml-7 text-center mr-auto rounded-lg mt-6 mb-2 cursor-pointer self-start">
                  Choose Banner
                </div>
                <div className="flex flex-wrap px-5 w-full mb-4">
                  {banner&& (
                    <div className="relative w-70 h-40 m-2 overflow-hidden shadow-lg border-[#565656] border-2 rounded-lg">
                      <img
                        src={banner.preview}
                        alt={`Uploaded Banner`}
                        className="w-full h-full object-cover"
                      />
                      <img
                        src="/closeicon.svg"
                        alt="x"
                        onClick={() => {
                          setBanner(null);
                        }}
                        className="absolute top-0 right-0 text-white border-none cursor-pointer mt-1 mr-1 z-60"
                      />
                    </div>
                  )}
                  {!banner && (
                    <label
                      htmlFor="bannerImageInput"
                      className="relative w-[200px] h-36 m-2 shadow-lg border-[#565656] border-2 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-[#3a3a3a]"
                    >
                      <span className="block text-[120px] font-thin leading-none">
                        +
                      </span>
                      <span className="block pb-8">Add Banner</span>
                      <input
                        type="file"
                        id="bannerImageInput"
                        accept="image/*"
                        onChange={handleBannerImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
              <div className="w-full md:w-[30%] px-6">
                <div className="flex flex-col gap-4">
                  {/* Categories  */}
                  <div className="self-start text-sm font-bold">Category</div>
                  <div className="flex gap-3 font-semibold">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className={`text-black rounded-lg text-xs w-24 h-6 ${
                          project.category === category
                            ? " bg-[#66ec8b] "
                            : " bg-white "
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setProject((prev) => ({
                            ...prev,
                            category,
                          }));
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  {/* Status  */}
                  <div className="self-start text-sm font-bold">Status</div>
                  <div className="flex gap-3 font-semibold">
                    {statuses.map((status, index) => (
                      <button
                        key={index}
                        className={`text-black rounded-lg text-xs w-24 h-6 ${
                          project.status === status
                            ? " bg-[#66ec8b] "
                            : " bg-white "
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setProject((prevData) => ({
                            ...prevData,
                            status,
                          }));
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                  {/* Toggle Switch & OpenCollab Section*/}
                  <div className="flex gap-3 pt-2 justify-between">
                    <label htmlFor="collaboration" className="font-bold">
                      Open to collaboration
                    </label>
                    <div
                      className={`w-12 h-6 rounded-full flex items-center cursor-pointer ${
                        openCollab
                          ? "bg-[#66ec8b] justify-end"
                          : "bg-white justify-start"
                      }`}
                      onClick={() => {
                        setOpenCollab(!openCollab);
                      }}
                    >
                      <div className="w-4 h-4 bg-[#1e1d1d] rounded-[50%] mx-1" />
                    </div>
                  </div>
                  {/* OpenCollab Message */}
                  {openCollab && (
                    <div className="bg-white rounded-lg h-44 overflow-hidden text-black my-2 py-2">
                      <textarea
                        name="collaboration"
                        id="collaboration"
                        className="outline-none bg-transparent border-black border-b-2 w-[90%] mx-6 h-full font-medium"
                        placeholder="Enter Message"
                        value={
                          project && project.statusMessage.length > 0
                            ? project.statusMessage
                            : ""
                        }
                        onChange={(e) => {
                          const inp = e.target.value;
                          setProject((prev) => ({
                            ...prev,
                            statusMessage: inp,
                          }));
                        }}
                      ></textarea>
                    </div>
                  )}

                  {/* TechStackInput */}
                  <div className="uppercase font-bold text-sm pt-4">
                    Tech stacks
                  </div>
                  <div className="border-2 flex flex-col items-center justify-between border-[#565656] w-full rounded-lg">
                    <div className="flex justify-start w-full gap-2 px-4 py-4 flex-wrap">
                    {project.technologies.map((stack, index) => (
                      <div className="flex bg-white text-black items-center px-2 rounded-lg font-semibold my-1">
                        <div className="text-sm">{stack}</div>
                        <img
                          src="/closeicon.svg"
                          alt="x"
                          onClick={() =>
                            setProject((prevData) => ({
                              ...prevData,
                              technologies:  prevData.technologies.filter(
                                (it) => it !== stack
                              )
                            }))
                          }
                          className="invert h-4 pl-2 cursor-pointer"
                        />
                      </div>
                    ))}
                    </div>
                    <div className="flex-col w-full px-4 mx-6 my-2">
                    <div className="flex justify-between">
                        <input
                          type="text"
                          className="bg-transparent outline-none w-[80%] border-b-2 border-white pb-2"
                          placeholder="Enter Techstack"
                          onChange={(e) => handleTechStackInputChange(e)}
                          
                        />
                        <img
                          src="/bichevrondown.svg"
                          alt="down click"
                          className="h-6"
                        />
                      </div>
                      <div className="bg-white mt-2 flex flex-col overflow-scroll text-black overflow-x-hidden rounded-lg no-scrollbar">
                        {techStackSuggestions.map((item, index) => (
                          <div
                            key={index}
                            className="px-5 py-1 cursor-pointer text-base hover:bg-[#222222] hover:text-white font-semibold"
                            onClick={() => {
                              toggleTechStacks(item);
                              setTechStackSuggestions([]);
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                    {/* Courses Links */}
                  <div className="uppercase font-bold text-sm pt-4">
                    Courses / Materials
                  </div>
                  <div className="border-2 border-[#565656] rounded-lg">
                    <div className="flex gap-2 w-full px-4 items-center flex-wrap mt-4">
                      {project.courseLinks && project.courseLinks.map((url, index) => (
                        <div
                          key={index}
                          className="flex bg-white text-black items-center px-2 rounded-lg font-semibold"
                        >
                          <div>
                            {url.length > 10 ? url.slice(0, 10) + "..." : url}
                          </div>
                          <img
                            src="/closeicon.svg"
                            alt="x"
                            onClick={(e) => {
                              setProject((prevData) => ({
                                ...prevData,
                                courseLinks: 
                                  prevData.courseLinks.filter(
                                    (u, i) => i !== index
                                  ),
                                
                              }));
                            }}
                            className="invert h-4 pl-2 cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mx-4 overflow-hidden mt-3">
                      <input
                        type="text"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        className="bg-transparent border-b-2 outline-none w-full my-3 pb-1"
                        placeholder="ADD NEW URL"
                      />
                      <div
                        className="bg-white text-black text-base font-semibold w-24 h-7 pt-1 text-center ml-auto rounded-lg mb-6 cursor-pointer"
                        onClick={handleAddUrl}
                      >
                        Add URL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex md:justify-end justify-center md:mr-10 items-center gap-4 mt-5 w-full">
                <div
                  onClick={onCancel}
                  className="bg-white rounded-[33.5px]  border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor-pointer text-black "
                >
                  Cancel
                </div>
                <button
                  type="submit"
                  className="bg-white rounded-[33.5px]  border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor text-black"
                 
                >
             {loading ? 'Editing...' : 'Edit'} 
                  
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProject;
