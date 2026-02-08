import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const {dToken, setDToken} = useContext(DoctorContext)
    const navigate = useNavigate()

    const logout = () =>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')

        dToken && setDToken("")
        dToken && localStorage.removeItem('dToken')
    }
    return (
        
            <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
                <div className='flex items-center gap-2 text-xs'>
                    <div className='flex items-center'>

                    <img className=' cursor-pointer w-20 h-13 mr-1' src="/logo.png" alt="admin_logo" />
                    <p className='text-[#5F6FFF] font-bold cursor-pointer ' style={{marginLeft:"-20px"}}>HealSphere <br /><span className='text-gray-400'>Dashboard Panel</span> </p>
                    </div>
                    <p className='border px-2.5 py-0.5 rounded-full border-gray text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
                </div>
                <button onClick={logout} className='!bg-[#0250C4] text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
            </div>

    )
}

export default Navbar
