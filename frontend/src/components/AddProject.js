import React, { useState, useEffect } from "react";

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
  "Microsoft SQL Server",
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
  "Amazon Web Services (AWS)",
  "Microsoft Azure",
  "Google Cloud Platform (GCP)",
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
  "React Native (JavaScript)",
  "Flutter (Dart)",
  "Xamarin (C#)",
  "Jest",
  "Mocha",
  "Selenium",
  "Cypress",
  "JUnit",
  "NUnit",
  "Visual Studio Code",
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

function AddProject({ onCancel, projectData, setProjectData }) {
  const [images, setImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [openCollab, setOpenCollab] = useState(false);
  const [selectedTechStacks, setselectedTechStacks] = useState([]);
  const [techStackInput, setTechStackInput] = useState("");
  const [techStackSuggestions, setTechStackSuggestions] = useState([]);

  const statuses = ["Completed", "Ongoing", "Need Help"];
  const categories = ["Web Dev", "Android Dev", "AI/ML"];

  const handleTechStackInputChange = (e) => {
    const input = e.target.value;
    setTechStackInput(input);

    // Filter techStack based on input and update suggestions
    const suggestions = techStack.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );
    setTechStackSuggestions(suggestions);
  };
  
  const toggleTechStacks = (item) => {
    if (selectedTechStacks.includes(item)) {
      setselectedTechStacks(selectedTechStacks.filter((it) => it !== item));
    } else {
      setselectedTechStacks([...selectedTechStacks, item]);
    }
  };
  const handleStatusChange = (status, e) => {
    e.preventDefault();
    setSelectedStatus(status);
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const removeImage = (index, e) => {
    e.preventDefault();
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleCategoryClick = (category, e) => {
    e.preventDefault();
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((selected) => selected !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  console.log(selectedTechStacks);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden inset-0 z-50 outline-none focus:outline-none fixed no-scrollbar">
        <div className="relative w-[95%] mx-auto text-white bg-[#1e1d1d] rounded-lg pt-10 pb-7 border-[#565656] border-2 my-10 h-[90vh] overflow-y-scroll md:no-scrollbar">
          <div className="flex flex-col justify-center items-center ">
            <div className=" self-start text-[24px] sm:text-[28px] font-semibold mx-5">
              Add New Project
            </div>
            <form
              action=""
              className="flex flex-wrap justify-between w-full mt-5 gap-2"
            >
              {/* Left Side */}
              <div className="w-full overflow-hidden md:w-[65%]">
                <div className="flex flex-col self-start px-5 mb-4 gap-1 w-full">
                  <label htmlFor="text" className="text-sm font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    className=" outline-none bg-transparent border-white border-b-2 w-full"
                  />
                </div>
                <div className="flex flex-col self-start px-5 mt-2 mb-4 gap-1 w-full">
                  <label htmlFor="text" className="text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="outline-none bg-transparent border-white border-b-2 w-full h-20"
                  ></textarea>
                </div>
                <div className="flex flex-col self-start px-5 mt-2 mb-4 gap-1 w-full">
                  <label htmlFor="text" className="text-sm font-medium">
                    About
                  </label>
                  <textarea
                    name="about"
                    className="outline-none bg-transparent border-white border-b-2 w-full h-24"
                  ></textarea>
                </div>
                <div className="flex flex-col self-start px-5 mb-4 gap-1 w-full">
                  <label htmlFor="text" className="text-sm font-medium">
                    Github Repo URL
                  </label>
                  <input
                    type="text"
                    className=" outline-none bg-transparent border-white border-b-2 w-full"
                  />
                </div>
                <div className="flex flex-col self-start px-5 mb-4 gap-1 w-full">
                  <label htmlFor="text" className="text-sm font-medium">
                    README URL <span>(optional)</span>
                  </label>
                  <input
                    type="text"
                    className=" outline-none bg-transparent border-white border-b-2 w-full"
                  />
                </div>
                <div className="flex flex-wrap px-5 w-full mb-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-70 h-40 m-2 overflow-hidden shadow-lg border-[#565656] border-2 rounded-lg"
                    >
                      <img
                        src={image.preview}
                        alt={`Uploaded ${index}`}
                        className="w-full h-full object-cover "
                      />
                      <img
                        src="/closeicon.svg"
                        alt="x"
                        onClick={(e) => removeImage(index, e)}
                        className="absolute top-0 right-0  text-white border-none cursor-pointer mt-1 mr-1 z-60  "
                      />
                    </div>
                  ))}
                  <label
                    htmlFor="imageInput"
                    className="relative w-[200px] h-36 m-2  shadow-lg border-[#565656] border-2 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-[#3a3a3a]"
                  >
                    <span className="block text-[120px] font-thin leading-none">
                      +
                    </span>
                    <span className=" block pb-8">Add Image</span>
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      multiple
                    />
                  </label>
                </div>
              </div>

              {/* Right Side that moves down for medium screen */}
              <div className="w-full md:w-[30%] px-6">
                <div className="flex flex-col gap-4">
                  <div className="self-start text-sm font-bold">Category</div>
                  <div className="flex gap-3 font-semibold">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className={`text-black rounded-lg text-xs w-24 h-6 ${
                          selectedCategories.includes(category)
                            ? " bg-[#66ec8b] "
                            : " bg-white "
                        }`}
                        onClick={(e) => handleCategoryClick(category, e)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <div className="self-start text-sm font-bold">Status</div>
                  <div className="flex gap-3 font-semibold">
                    {statuses.map((status, index) => (
                      <button
                        key={index}
                        className={`text-black rounded-lg text-xs w-24 h-6 ${
                          selectedStatus === status
                            ? " bg-[#66ec8b] "
                            : " bg-white "
                        }`}
                        onClick={(e) => handleStatusChange(status, e)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                  {/* Toggle Swicth */}

                  <div className="flex gap-3 pt-2 justify-between">
                    <label htmlFor="collaboration" className="font-bold">
                      Open to collaboration
                    </label>
                    <div
                      className={` w-12 h-6 rounded-full flex  items-center cursor-pointer ${
                        openCollab
                          ? " bg-[#66ec8b] justify-end "
                          : " bg-white justify-start "
                      }`}
                      onClick={() => {
                        setOpenCollab(!openCollab);
                      }}
                    >
                      <div className="w-4 h-4 bg-[#1e1d1d] rounded-[50%] mx-1" />
                    </div>
                  </div>
                  {openCollab && (
                    <div className="bg-white rounded-lg h-44 overflow-hidden text-black my-2 py-2">
                      <textarea
                        name="collaboration"
                        id="collaboration"
                        className=" outline-none bg-transparent border-black border-b-2 w-[90%] mx-6 h-full font-medium"
                        placeholder="Enter Message"
                      ></textarea>
                    </div>
                  )}
                  <div className=" uppercase font-bold text-sm">
                    
                  </div>
                  <div className="border-2 flex flex-col items-center justify-between border-[#565656] w-full rounded-lg">
                    <div className="flex gap-2 w-full px-4 items-center flex-wrap mt-4" >
                    {selectedTechStacks.map((stack) => (
                      <div className="flex bg-white text-black items-center px-2 rounded-lg font-semibold">
                        <div className="text-sm">{stack}</div>
                        <img
                          src="/closeicon.svg"
                          alt="x"
                          onClick={(e) => {
                            setselectedTechStacks(selectedTechStacks.filter((it) => it !== stack));
                          }}
                          className="invert h-4 pl-2 cursor-pointer"
                        />
                      </div>
                    ))}
                    </div>
                    <div className="flex-col w-full px-4 mx-6 my-2">
                      <div className="flex justify-between">
                        <input
                          type="text"
                          className="bg-transparent outline-none"
                          placeholder="Enter Techstack"
                          onChange={(e) => {
                            handleTechStackInputChange(e);
                          }}
                        />
                        <img
                          src="/bichevrondown.svg"
                          alt="down click"
                          className="h-6"
                        />
                      </div>

                      <div className="bg-white mt-2 flex flex-col overflow-scroll text-black overflow-x-hidden rounded-lg  no-scrollbar ">
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
                </div>
              </div>
              <div className="flex md:justify-end justify-center md:mr-10 items-center gap-4 mt-5 w-full">
                <div
                  onClick={onCancel}
                  className="bg-white rounded-[33.5px]  border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor text-black"
                >
                  Cancel
                </div>
                <button
                  type="submit"
                  className="bg-white rounded-[33.5px]  border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor text-black"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default AddProject;
