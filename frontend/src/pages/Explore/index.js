import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar2 from '../../components/navbar2';

function Explore({SERVER_URL}) {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("");

  // json data 
  const Projects = [
    {
      "title": "E-commerce Website Redesign",
      "description": "Redesigning the user interface and experience of an existing e-commerce website.",
      "category": "Web",
      "bannerUrl": "https://source.unsplash.com/800x400/?web-development",
      "extraMedia": "https://source.unsplash.com/800x600/?ecommerce",
      "status": "Need help",
      "statusMessage": "Currently working on the frontend components.",
      "listTechnologies": ["React", "Node.js", "MongoDB", "Redux"],
      "creator": "John Doe",
      "likes": 120,
      "saved": 56,
      "collaborators": ["Jane Smith", "Bob Johnson"],
      "courseLink": "https://example.com/web-development-course",
      "rating": 4.7
    },
    {
      "title": "Mobile App for Fitness Tracking",
      "description": "Developing a mobile app to track and analyze fitness activities.",
      "category": "App",
      "bannerUrl": "https://source.unsplash.com/800x400/?fitness-app",
      "extraMedia": "https://source.unsplash.com/800x600/?mobile-app",
      "status": "Completed",
      "statusMessage": "App successfully launched on app stores.",
      "listTechnologies": ["Swift", "iOS", "Firebase"],
      "creator": "Alice Johnson",
      "likes": 256,
      "saved": 78,
      "collaborators": ["Charlie Brown"],
      "courseLink": "https://example.com/mobile-app-development-course",
      "rating": 4.9
    },
    {
      "title": "Mobile App for Fitness Tracking",
      "description": "Developing a mobile app to track and analyze fitness activities.",
      "category": "Design",
      "bannerUrl": "https://source.unsplash.com/800x400/?fitness-app",
      "extraMedia": "https://source.unsplash.com/800x600/?mobile-app",
      "status": "Completed",
      "statusMessage": "App successfully launched on app stores.",
      "listTechnologies": ["Swift", "iOS", "Firebase"],
      "creator": "Alice Johnson",
      "likes": 256,
      "saved": 78,
      "collaborators": ["Charlie Brown"],
      "courseLink": "https://example.com/mobile-app-development-course",
      "rating": 4.9
    },
    {
      "title": "Mobile App for Fitness Tracking",
      "description": "Developing a mobile app to track and analyze fitness activities.",
      "category": "Web",
      "bannerUrl": "https://source.unsplash.com/800x400/?fitness-app",
      "extraMedia": "https://source.unsplash.com/800x600/?mobile-app",
      "status": "Completed",
      "statusMessage": "App successfully launched on app stores.",
      "listTechnologies": ["Swift", "iOS", "Firebase"],
      "creator": "Alice Johnson",
      "likes": 256,
      "saved": 78,
      "collaborators": ["Charlie Brown"],
      "courseLink": "https://example.com/mobile-app-development-course",
      "rating": 4.9
    },
    {
      "title": "E-commerce Website Redesign",
      "description": "Redesigning the user interface and experience of an existing e-commerce website.",
      "category": "Web",
      "bannerUrl": "https://source.unsplash.com/800x400/?web-development",
      "extraMedia": "https://source.unsplash.com/800x600/?ecommerce",
      "status": "In Progress",
      "statusMessage": "Currently working on the frontend components.",
      "listTechnologies": ["React", "Node.js", "MongoDB", "Redux"],
      "creator": "John Doe",
      "likes": 120,
      "saved": 56,
      "collaborators": ["Jane Smith", "Bob Johnson"],
      "courseLink": "https://example.com/web-development-course",
      "rating": 4.7
    },
    {
      "title": "E-commerce Website Redesign",
      "description": "Redesigning the user interface and experience of an existing e-commerce website.",
      "category": "Web",
      "bannerUrl": "https://source.unsplash.com/800x400/?web-development",
      "extraMedia": "https://source.unsplash.com/800x600/?ecommerce",
      "status": "In Progress",
      "statusMessage": "Currently working on the frontend components.",
      "listTechnologies": ["React", "Node.js", "MongoDB", "Redux"],
      "creator": "John Doe",
      "likes": 120,
      "saved": 56,
      "collaborators": ["Jane Smith", "Bob Johnson"],
      "courseLink": "https://example.com/web-development-course",
      "rating": 4.7
    },
    {
      "title": "Mobile App for Fitness Tracking",
      "description": "Developing a mobile app to track and analyze fitness activities.",
      "category": "App",
      "bannerUrl": "https://source.unsplash.com/800x400/?fitness-app",
      "extraMedia": "https://source.unsplash.com/800x600/?mobile-app",
      "status": "Completed",
      "statusMessage": "App successfully launched on app stores.",
      "listTechnologies": ["Swift", "iOS", "Firebase"],
      "creator": "Alice Johnson",
      "likes": 256,
      "saved": 78,
      "collaborators": ["Charlie Brown"],
      "courseLink": "https://example.com/mobile-app-development-course",
      "rating": 4.9
    },
    {
      "title": "Mobile App for Fitness Tracking",
      "description": "Developing a mobile app to track and analyze fitness activities.",
      "category": "App",
      "bannerUrl": "https://source.unsplash.com/800x400/?fitness-app",
      "extraMedia": "https://source.unsplash.com/800x600/?mobile-app",
      "status": "Completed",
      "statusMessage": "App successfully launched on app stores.",
      "listTechnologies": ["Swift", "iOS", "Firebase"],
      "creator": "Alice Johnson",
      "likes": 256,
      "saved": 78,
      "collaborators": ["Charlie Brown"],
      "courseLink": "https://example.com/mobile-app-development-course",
      "rating": 4.9
    }
    ,
    {
      "title": "Mobile App for Fitness Tracking",
      "description": "Developing a mobile app to track and analyze fitness activities.",
      "category": "App",
      "bannerUrl": "https://source.unsplash.com/800x400/?fitness-app",
      "extraMedia": "https://source.unsplash.com/800x600/?mobile-app",
      "status": "Completed",
      "statusMessage": "App successfully launched on app stores.",
      "listTechnologies": ["Swift", "iOS", "Firebase"],
      "creator": "Alice Johnson",
      "likes": 256,
      "saved": 78,
      "collaborators": ["Charlie Brown"],
      "courseLink": "https://example.com/mobile-app-development-course",
      "rating": 4.9
    }
    ,
    {
      "title": "Mobile App for Fitness Tracking",
      "description": "Developing a mobile app to track and analyze fitness activities.",
      "category": "App",
      "bannerUrl": "https://source.unsplash.com/800x400/?fitness-app",
      "extraMedia": "https://source.unsplash.com/800x600/?mobile-app",
      "status": "Completed",
      "statusMessage": "App successfully launched on app stores.",
      "listTechnologies": ["Swift", "iOS", "Firebase"],
      "creator": "Alice Johnson",
      "likes": 256,
      "saved": 78,
      "collaborators": ["Charlie Brown"],
      "courseLink": "https://example.com/mobile-app-development-course",
      "rating": 4.9
    }
  ]


  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://192.168.31.95:3001/projects');
        setProjects(Projects);
        setFilteredProjects(Projects);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Error fetching projects. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const filterProjects = ({ category, e }) => {
    e.preventDefault();
    var elements = document.getElementsByClassName('filter');
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = "#000";
      elements[i].style.color = '#fff'
    }
    e.target.style.backgroundColor = '#fff'
    e.target.style.color = '#000'
    const filtered = projects.filter(project => {
      return category ? project.category.toLowerCase() === category.toLowerCase() : true;
    });

    setFilteredProjects(filtered);
  };


  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#f0f0f0'];
  return (
    <div className='flex flex-col  text-white  '>

      <Navbar2/>
      <div className='relative  mt-24  mb-8  flex  items-center mx-auto sm:ml-24 sm:align-left'>
        <div className='text-[16px] sm:text-xl border-[1px] px-5 sm:h-[40px] sm:rounded-[30px] items-center  uppercase border-[#EAEAEA]  cursor-pointer hidden sm:flex  mx-2  filter text-[#000] bg-white' onClick={(e) => filterProjects({ category: "", e })}>all</div>
        <div className='text-[16px] sm:text-xl border-[1px] px-5  sm:h-[40px] rounded-[30px] items-center  uppercase border-[#EAEAEA]  cursor-pointer flex mx-2   filter' onClick={(e) => filterProjects({ category: "App", e })}>App Dev</div>
        <div className='text-[16px] sm:text-xl border-[1px] px-5  sm:h-[40px] rounded-[30px] items-center  uppercase border-[#EAEAEA] cursor-pointer flex mx-2  filter' onClick={(e) => filterProjects({ category: "Web", e })}>Web Dev</div>
        <div className='text-[16px] sm:text-xl border-[1px] px-5 sm:h-[40px] rounded-[30px]  items-center uppercase border-[#EAEAEA]  cursor-pointer flex mx-2  filter' onClick={(e) => filterProjects({ category: "Design", e })} >Design</div>

      </div>
      {error ? (
        <img src='/loading.gif' className='w-[100px] m-auto mt-28'></img>
      ) : (
        <div className='flex flex-wrap gap-1 w-screen justify-center shadow-inner '>
          {
            filteredProjects.map(project => (
              <Link to={`/project/${project.courseLink}`}>
                <div key={project.title} className='relative w-[100vw] h-[290px] sm:w-[400px] flex flex-col m-2 rounded-2xl border-[1px]  mx-4 overflow-hidden ' >
                  <div className='uppercase absolute right-3 top-0 mt-3  rounded-[10px] text-xs text-black bg-green-300 px-4 py-[2px] text-center'style={{ backgroundColor: colors[project.status[0]=='I'?0:project.status[0]=='C'?1:project.status[0]=='N'?3:0] }}>{project.status}</div>
                  <img src={project.bannerUrl} alt="" className='rounded-t-2xl h-[180px]  object-cover	 ' />

                  <div className='flex flex-col pl-2 py-2'>
                    <h1 className='uppercase  text-xl md:[2xl-10px] leading-7 text-[] '>{project.title}</h1>
                    <p className='text-[12px]  leading-4 '>{project.description.length>100?(project.description.substr(0,100)+".."):(project.description)}</p>
                    <div className='flex absolute bottom-3 mt-1'>
                      {project.listTechnologies.map((tech, index) => {
                        if (index < 4) {
                          return (
                            <div className='m-1 uppercase  px-4 py-1 rounded-[10px] text-xs text-black' style={{ backgroundColor: colors[(tech.length) % colors.length] }} key={index}>{tech}</div>
                          )
                        }
                      }
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex items-center px-8 mb-8'>
                  <img src='/showcase.jpg' className='oveflow-hidden contain rounded-[50%] bg-white  w-[40px] h-[40px] ' ></img>
                  <div className="flex flex-col gap-1 w-[70%] mx-3 ">
                    <h1 className='text-[18px] uppercase leading-4'>{project.creator}</h1>
                    <p className='text-[14px] text-[#00B2FF] font-medium	 uppercase leading-4'>{project.description.substr(0,30)}</p>
                  </div>
                </div>
              </Link>


            ))
          }
        </div>
      )
      }
    </div>
  )
}

export default Explore
