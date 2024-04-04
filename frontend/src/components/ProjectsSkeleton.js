import React from 'react'

function ProjectsSkeleton() {
  return (
    <div className='flex flex-wrap gap-1 w-screen'>
        {/* Skeleton Loading */}
        {Array.from({ length: 10 }).map((_, index) => (
            <div className=' flex flex-col gap-1'>
          <div key={index} className='relative w-[90vw] h-[280px] sm:w-[400px] flex flex-col m-2 rounded-2xl border-[1px] border-[#565656] mx-4 overflow-hidden animate-pulse'>
            <div className='h-[180px] bg-gray-300 bg-opacity-25 rounded-t-2xl'></div>
            <div className='flex flex-col gap-1 px-2 py-2'>
              <div className=' md:[2xl-10px] font-bold leading-7 bg-gray-300 bg-opacity-30 w-[70%] h-4 rounded-full'></div>
              <div className=' w-[35%] bg-gray-300 h-4 rounded-full  bg-opacity-20'></div>
              <div className='flex absolute bottom-3'>
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className='m-1 uppercase px-4 py-2 rounded-full text-xs text-white   border-opacity-70 bg-opacity-20  bg-gray-300'></div>
                ))}
              </div>

            </div>
          </div>
          <div className='flex items-center gap-2 mx-4 mb-8'>
  {/* Placeholder for Profile Image */}
  <div className=' bg-gray-300 bg-opacity-20 rounded-full p-5'></div>
  <div className='flex flex-col gap-1 w-full'>
    {/* Placeholder for Name */}
    <div className=' bg-gray-300 bg-opacity-20 h-4 w-[70%] rounded-full'></div>
    {/* Placeholder for Designation */}
    <div className='bg-gray-300 bg-opacity-10 h-4 w-[50%] rounded-full'></div>
  </div>
</div>
          </div>
        ))}
        
      </div>
  )
}

export default ProjectsSkeleton
