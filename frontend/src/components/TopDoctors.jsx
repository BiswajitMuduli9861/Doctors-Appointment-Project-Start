import React from 'react'
import {doctors} from '../assets/assets'
const TopDoctors = () => {
  return (
    <div>
      <h1>Top Doctors to  Book</h1>
      <p>Simply browse through our extensive list of trusted doctors.</p>
      <div>
        {
            doctors.slice
        }
      </div>
    </div>
  )
}

export default TopDoctors
