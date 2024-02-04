import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar2 from '../../components/navbar2';
import Footer from '../../components/Footer';

function Explore({SERVER_URL}) {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [AllProjects, setAllProjects] = useState([]);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("");
  const [selectedTab, setSelectedTab] = useState('All');
  const [loading,setLoading]=useState(false)


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
      
        const response = await axios.post(`${SERVER_URL}/project/allprojects`);
        setAllProjects(response.data);
        setFilteredProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Error fetching projects. Please try again later.');
      }
      finally{
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  const filterProjects = ({ category }) =>  {
    const filtered = AllProjects&&AllProjects.filter(project => {
      return category ? project.category.toLowerCase() === category.toLowerCase() : true;
    });

    setFilteredProjects(filtered);
  };

 
  return (
    <div className='flex flex-col  text-white  '>

      <Navbar2 SERVER_URL={SERVER_URL}/>
  
      <div className=" mt-20 md:ml-[2%] justify-center md:justify-start flex gap-4 mb-4">
          <button
            onClick={() => {setSelectedTab('All');filterProjects({ category: "" })}}
            className={` text-sm  border border-[#565656] hover:opacity-80 rounded-full px-3 py-1 ${selectedTab === 'All' ? 'font-bold text-black bg-white' : ' text-white'}`}
          >
            All
          </button>
         <button
            onClick={() => {setSelectedTab('Android Dev');filterProjects({ category: "android dev" })}}
            className={` text-sm border border-[#565656] hover:opacity-80 rounded-full px-3 py-1 ${selectedTab === 'Android Dev' ? 'font-bold text-black bg-white' : ' text-white'}`}
          >
            Android Dev
          </button>
         <button
            onClick={() => {setSelectedTab('Web Dev');filterProjects({ category: "website" })}}
            className={`  text-sm border border-[#565656] hover:opacity-80 rounded-full px-3 py-1 ${selectedTab === 'Web Dev' ? 'font-bold text-black bg-white' : ' text-white'}`}
          >
            Web Dev
          </button>
         <button
            onClick={() => {setSelectedTab('AI/ML');filterProjects({ category: "ai/ml" })}}
            className={` text-sm border border-[#565656] hover:opacity-80 rounded-full px-3 py-1 ${selectedTab === 'AI/ML' ? 'font-bold text-black bg-white' : ' text-white'}`}
          >
            AI/ML
          </button>
      
        </div>
      {loading ? (
        <img src='/loading.gif' className='w-[50px] m-auto'></img>
      ) : (
        <div className='flex flex-wrap gap-1 w-screen  '>
          {filteredProjects.length>0&&filteredProjects.map(project => (
              <Link to={`/project/${project._id}`}>
                <div key={project.title} className='relative w-full  hover:opacity-80  h-[290px] sm:w-[400px] flex flex-col m-2 rounded-2xl border-[1px] border-[#565656] mx-4 overflow-hidden ' >
                  <div className='uppercase absolute right-3 top-0 mt-3  rounded-[10px] text-xs text-black  px-4 py-[2px] text-center bg-[#83FF70]'>{project.status}</div>
                  <img src={filteredProjects&&project.bannerUrl} alt="" className='rounded-t-2xl h-[180px]  object-cover	 ' />

                  <div className='flex flex-col px-2 py-2'>
                    <h1 className='uppercase  text-xl md:[2xl-10px] font-bold leading-7 '>{project.title}</h1>
                    <p className='text-[12px] text-[#8B8B8B]  font-light leading-4 '>{project.description.length>50?(project.description.substr(0,50)+".."):(project.description)}</p>
                    <div className='flex absolute bottom-3 mt-1'>
                      {project.technologies.map((tech) => {
                        
                          return (
                            <div className={`m-1 uppercase  px-3 py-1 rounded-full text-xs text-white border border-[#565656] bg-[${tech.color}]`} >{tech.Title}</div>
                          )
                        
                      }
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex items-center mx-4 mb-8'>
                  <img src='/showcase.jpg' className='oveflow-hidden contain rounded-[50%] bg-white  w-[40px] h-[40px] ' ></img>
                  <div className="flex flex-col gap-[2px] w-[70%] mx-3 ">
                    <h1 className='text-[18px] uppercase  font-semibold leading-4'>{project.creator[0].Name}</h1>
                    <p className='text-sm font-thin  text-[#8B8B8B]'>{project.creator[0].designation}</p>
                  </div>
                </div>
              </Link>


            ))
          }
        </div>
      )
      }
      <Footer/>
    </div>
  )
}

export default Explore
