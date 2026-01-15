import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify'

const DoctorProfile = () => {

  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }
      const { data } = await axios.put(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })
      if (data.success) {
        toast.success(data.message, {
          className: " !bg-[white] !text-black"
        })
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message, {
          className: " !bg-[white] !text-black"
        })
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message, {
        className: " !bg-[white] !text-black"
      })
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])
  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-[#702CF4]/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="image" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* ------ Doc Info : name, degree, experience ------- */}
          <p className='flex items-center gap-2 text-3xl font-medium text0gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <p className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</p>
          </div>

          {/* ------- Doc About ------- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-sm text-gray-600 max-w-[175] mt-1'>{profileData.about}</p>
          </div>
          <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{currency} {isEdit ? <input className='!bg-[gray] !text-[white]' type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span></p>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? <input className='!bg-[gray] !text-[white]' type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
              <br />
              {isEdit ? <input className='!bg-[gray] !text-[white] mt-0.5' type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type="checkbox" />
            <label htmlFor="">Available</label>
          </div>
          {
            isEdit
              ? <button onClick={updateProfile} className='px-4 py-1 !bg-[white] !text-gray-800 border border-[#0250C4] text-sm rounded-full mt-5 hover:!bg-[#0250C4] hover:!text-white transition-all cursor-pointer'>Save</button>
              : <button onClick={() => setIsEdit(true)} className='px-4 py-1 !bg-[white] !text-gray-800 border border-[#0250C4] text-sm rounded-full mt-5 hover:!bg-[#0250C4] hover:!text-white transition-all cursor-pointer'>Edit</button>
          }

        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
