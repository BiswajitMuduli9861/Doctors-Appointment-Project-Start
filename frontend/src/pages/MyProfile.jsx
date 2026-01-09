import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);

      image && formData.append('image', image);

      const { data } = await axios.put(backendUrl + '/api/user/update-profile', formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message, { className: "!bg-[white] !text-black" })
        setIsEdit(false)
        setImage(false)
        await loadUserProfileData()
      } else {
        toast.error(data.message, {
          className: " !bg-[white] !text-black"
        })
      }
    } catch (error) {
      console.log(error)
       toast.error(error.message, {
          className: " !bg-[white] !text-black"
        })
    }
  }

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>


      {
        isEdit
          ? <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75 ' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className=' bg-gray-500 w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="upload_icon" />
             

            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
          </label>
          :
          <img className='w-36 rounded' src={userData.image} alt="User_Image" />
      }


      {
        isEdit
          ? <input type="text" value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} className='!bg-[gray] !text-black rounded-2xl p-1 text-3xl font-medium max-w-60 mt-4' />
          : <p className='!bgfont-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-0.5 border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>phone:</p>
          {
            isEdit
              ? <input className='!bg-[gray] !text-white rounded-2xl p-1 max-w-52' type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit
              ? <p>
                <input className='!bg-[gray] !text-white rounded-2xl p-1 ' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} /><br />
                <input className='!bg-[gray] !text-white rounded-2xl p-1 mt-0.5' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
              </p>
              : <p className='text-gray-500'>
                {userData.address.line1}<br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select  className='max-w-20 !bg-[white] !text-black' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-500'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday</p>
          {
            isEdit
              ? <input className='max-w-28 !bg-[white] !text-black' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
              : <p>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit
            ? <button className='pay_online_button border border-[#0250C4] px-8 py-2 rounded-full transition-all' onClick={updateUserProfileData}>Save information</button>
            : <button className='pay_online_button border border-[#0250C4] px-8 py-2 rounded-full transition-all' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile
