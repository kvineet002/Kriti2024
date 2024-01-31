import React from 'react'
import Navbar from '../../components/Navbar'

function Project() {
  return (
    <div className='flex flex-col  text-white'>
      
      <div><Navbar></Navbar></div>
      <div className='h-48 relative top-12 border-b-[1px] border-white  flex  items-center'>
        <span className='text-2xl border-[1px] w-[230px] sm:h-[50px] sm:rounded-[30px]  pt-2px uppercase border-[#EAEAEA] mx-[40px]  flex items-center justify-center cursor-pointer'>CATEGORIES</span>
        <div className='text-xl font-nornal uppercase mx-6 cursor-pointer'>design</div>
        <div  className='text-xl font-nornal uppercase mx-6 cursor-pointer'>Development</div>
        <div  className='text-xl font-nornal uppercase mx-6 cursor-pointer'>Biology</div>

      </div>
    </div>
  )
}

export default Project
