import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {

    const {aToken} = useContext(AdminContext)
  return (
    <div>
      {
        aToken && <ul>
            <NavLink to={'/admin-dashboard'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#296fd8] " : ""}`}>
                <img src={assets.home_icon} alt="home_icon" />
                <p>Dashboard</p>
            </NavLink>
            <NavLink to={'/all-appointment'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#296fd8] " : ""}`}>
                <img src={assets.appointment_icon} alt="appointment_icon" />
                <p>Appointments</p>
            </NavLink>
            <NavLink to={'/add-doctor'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#296fd8] " : ""}`}>
                <img src={assets.add_icon} alt="add_icon" />
                <p>Add Doctor</p>
            </NavLink>
            <NavLink to={'/doctor-list'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#296fd8] " : ""}`}>
                <img src={assets.people_icon} alt="people_icon" />
                <p>Doctor List</p>
            </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
