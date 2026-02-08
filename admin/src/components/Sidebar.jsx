import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
const Sidebar = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)
  return (
    <div>
      {
        aToken && <ul>
            <NavLink to={'/'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#296fd8] " : ""}`}>
                <img src={assets.home_icon} alt="home_icon" />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>
            <NavLink to={'/all-appointment'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#296fd8] " : ""}`}>
                <img src={assets.appointment_icon} alt="appointment_icon" />
                <p className='hidden md:block'>Appointments</p>
            </NavLink>
            <NavLink to={'/add-doctor'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#296fd8] " : ""}`}>
                <img src={assets.add_icon} alt="add_icon" />
                <p className='hidden md:block'>Add Doctor</p>
            </NavLink>
            <NavLink to={'/doctor-list'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#296fd8] " : ""}`}>
                <img src={assets.people_icon} alt="people_icon" />
                <p className='hidden md:block'>Doctor List</p>
            </NavLink>
        </ul>
      }
      {
        dToken && <ul>
            <NavLink to={'/'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#296fd8] " : ""}`}>
                <img src={assets.home_icon} alt="home_icon" />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>
            <NavLink to={'/doctor-appointments'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#296fd8] " : ""}`}>
                <img src={assets.appointment_icon} alt="appointment_icon" />
                <p className='hidden md:block'>Appointments</p>
            </NavLink>
            
            <NavLink to={'/doctor-profile'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#296fd8] " : ""}`}>
                <img src={assets.people_icon} alt="people_icon" />
                <p className='hidden md:block'>Profile</p>
            </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
