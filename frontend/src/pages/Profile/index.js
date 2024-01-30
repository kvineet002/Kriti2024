import React from 'react'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom'

function Profile() {
  const{ id }=useParams()
  return (

    <div>
        <Navbar/>
        <h1>{id}</h1>
        
      
    </div>
  )
}

export default Profile
