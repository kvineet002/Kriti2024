import React from 'react'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'

function People() {
    const id1="person1"
  return (
    <div>
        <Navbar/>
      List of people
      <div className=' flex flex-col gap-2'></div>
      <Link to={`/profile/${id1}`}><div> people 1</div></Link>
      
      <div> people</div>
      <div> people</div>
      <div> people</div>
      <div> people</div>
      <div> people</div>
      <div> people</div>
      <div> people</div>
      <div> people</div>
      <div> people</div>
      <div> people</div>
      <div> people</div>
      <div> people</div>
    </div>
  )
}

export default People
