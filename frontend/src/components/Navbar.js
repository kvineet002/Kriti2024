import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const id="12345"
  return (
    <div className=' flex flex-row gap-2 justify-center items-center'>
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/people">People</Link>
        <Link to={`/profile/${id}`}>Profile</Link>
      
    </div>
  )
}

export default Navbar
