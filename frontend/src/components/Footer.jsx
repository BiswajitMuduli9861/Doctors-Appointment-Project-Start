import React from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'
const Footer = () => {
    const date = new Date()
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* ------ Left Section ------*/}
        <div>
            <div className='flex items-center gap-1'>

            <img className=' w-20' src='/logo.png' alt="logo" style={{marginTop:"-10px", marginBottom:"-10px"}}/>
            <h2 className=' text-[#5F6FFF] text-xl font-bold cursor-pointer' style={{marginLeft:"-20px"}}>HealSphere</h2>
            </div>
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>HealSphere is a smart doctor appointment system connecting patients and doctors for fast, secure, and hassle-free healthcare access.</p>
        </div>
        {/* ------ Center Section ------*/}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <Link to="/">Home</Link>
                <Link to="/about">About us</Link>
                <Link to="/contact">Contact us</Link>
                <Link href="">Privacy police</Link>
            </ul>
        </div>
        {/* ------ Right Section ------*/}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+919861591502</li>
                <li>healsphere@zohomail.in</li>
            </ul>
        </div>
      </div>
        {/* ------ Copyright Section --------*/}
        <div>
            <hr />
            <p className='py-2 text-sm text-center'>Copyright {date.getFullYear()}@ HealSphere - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
