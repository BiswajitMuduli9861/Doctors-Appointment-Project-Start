import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality, docId}) => {
    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)

    const [relDocs, setRelDocs] = useState([])

    useEffect(()=>{
        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter((doc)=> doc.speciality === speciality && doc._id !==docId)   //||doc._id !==doc|| current doctors data avoid
            setRelDocs(doctorsData)
        }

    },[doctors,speciality,docId])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to  Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 px-3 sm:px-0">
  {relDocs.slice(0,5).map((item, index) => (
    <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-3 transition-transform duration-500">
      <img className="bg-blue-50 w-full h-32 object-cover" src={item.image} alt="images" />
      <div className="p-4">
        <div className={`flex items-center gap-2 text-sm ${item.available ? ' text-green-500' : "text-gray-500"} mb-2`}>
          <span className={`w-2 h-2 ${item.available ? ' bg-green-500' : "bg-gray-500"} rounded-full`}></span>
          <p>{item.available ? "Available" : "Not Available"}</p>
        </div>
        <p className="font-semibold">{item.name}</p>
        <p className="text-gray-500 text-sm">{item.speciality}</p>
      </div>
    </div>
  ))}
</div>


      <button onClick={()=>{navigate('/doctors'), scrollTo(0,0)}} style={{backgroundColor:"rgba(0, 0, 255, 0.3)", color:"black"}} className='px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  )
}

export default RelatedDoctors
