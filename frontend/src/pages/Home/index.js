import React from 'react'
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
// import Navbar from '../../components/Navbar'
// import './Home.css';
function Home() {
  const userData = {
    "users": [
      {
        "name": "John Doe",
        "rating": 4.5,
        "projectNo": 10
      },
      {
        "name": "Jane Doe",
        "rating": 3.8,
        "projectNo": 7
      },
      {
        "name": "Alice Johnson",
        "rating": 4.2,
        "projectNo": 12
      },
      {
        "name": "Bob Smith",
        "rating": 4.0,
        "projectNo": 8
      },
      {
        "name": "Eva Martinez",
        "rating": 4.7,
        "projectNo": 15
      },
      {
        "name": "Michael Brown",
        "rating": 3.9,
        "projectNo": 9
      },
      {
        "name": "Sophia Lee",
        "rating": 4.5,
        "projectNo": 11
      },
      {
        "name": "Daniel Wilson",
        "rating": 4.2,
        "projectNo": 10
      }
    ]
  }

  return (
    <div className='bg-[black]  text-white'>
       <div className=' flex flex-col gap-1 justify-center my-10 items-center '>
        <Navbar/>
       <div> Your Home Page</div>
       <Link to="/login"><div className=' text-center  w-[40vh] flex justify-center bg-black text-white px-4 cursor-pointer rounded-full py-2'>
     Login
      </div></Link>  
    </div>
      <div className='flex flex-col gap-4'>
        <div className='text-[30px] text-[#EAEAEA] text-2xl md:text-[#EAEAEA] md:text-6xl ml-[13vw]'>Browse talent by category</div>
        <div className=' text-sm mt-[-2px] mb-4  md:text-[18px]  ml-[13vw]'>Looking for collab?<span className='text-[#16ACE7] cursor-pointer'> Browse Projects</span></div>
      </div>
      <div className='flex w-[90vw] md:w-[95vw] flex-wrap justify-center items-center mx-auto'>
        {
          userData.users.map((user, index) =>
          (
            <div className='m-[8px] w-[34vw]  md:w-[18vw] rounded-[8px] h-[30vw] md:h-[16vw]  flex flex-col justify-between border-[1px] border-[#565656] bg-gradient-to-b from-[#343333d8] to-blue-500-500 to-black text-[#EAEAEA]  cursor-pointer '>

              <span className='text-[16px] sm:text-[30px]  lg:text-[30px] ml-3  '>{user.name}</span>
              <div className='ml-3 w-[95%] sm:text-[20px] flex text-sm  lg:text-[28px]  '><img src="./star1.svg" className=' sm:w-5 sm:h-5 md:w-7  md:h-7 my-auto' height="15px" width="15px" alt="" />{user.rating}/5</div>

              <div className=' text-right  mb-4 mr-4 text-[#e8f8ff8e] text-[12px] md:text-end sm:'>{user.projectNo} Projects</div>
            </div>
          )
          )
        }
      </div>
      <div className='flex justify-center'>
        <div className="w-[70px] h-[70px] m-[1.4rem] rounded-full border-[#8D9093] border-2"></div>
        <div className="w-[70px] h-[70px] m-[1.4rem] rounded-full border-[#8D9093] border-2"></div>
        <div className="w-[70px] h-[70px] m-[1.4rem] rounded-full border-[#8D9093] border-2"></div>

      </div>
    </div>
  )
}

export default Home;