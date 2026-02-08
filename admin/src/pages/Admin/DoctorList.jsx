import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)
  console.log(doctors)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.length === 0
            ? <p className='text-gray-700 font-bold text-2xl '>No Doctor Available</p>

            :

            doctors.map((item, index) => (
              <div key={index} className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'>
                <img className='bg-indigo-50 group-hover:bg-[#0250C4] transition-all duration-500' src={item.image} alt="image" />
                <div className='p-4 '>
                  <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                  <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                  <div className='mt-2 flex items-center gap-1 text-sm'>
                    <input onChange={() => { changeAvailability(item._id) }} className="accent-[#0250C4] w-4 h-4 focus:ring-2 focus:ring-[#0250C4]/30 cursor-pointer" type="checkbox" checked={item.available} />
                  </div>
                </div>
              </div>
            ))

        }

      </div>
    </div>
  )
}

export default DoctorList
