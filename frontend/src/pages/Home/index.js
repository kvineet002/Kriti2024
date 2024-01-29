import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'

function Home() {
  return (
    <div className=' flex flex-col gap-1 justify-center my-10 items-center '>
        <Navbar/>
       <div> Your Home Page</div>
       <Link to="/login"><div className=' text-center  w-[40vh] flex justify-center bg-black text-white px-4 cursor-pointer rounded-full py-2'>
     Login
      </div></Link>  
    </div>
  )
}

export default Home
