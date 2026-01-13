import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointment = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  //convert date
  const slotDateFormat = (slotDate) => {
    // let slotDate = "16_1_2026"
    const dateArray = slotDate.split('_')
    // console.log(dateArray)
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }



  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message,{ className: " !bg-[white] !text-black" })
    }
  }


  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.put(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message,{ className: " !bg-[white] !text-black" })
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message,{ className: " !bg-[white] !text-black" })
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message,{ className: " !bg-[white] !text-black" })
    }
  }



const paymentCashfree = async (appointmentId) => {
  try {
    const res = await axios.post(backendUrl+ '/api/user/payment-cashfree', { appointmentId}, {headers:{ token }});

  const paymentSessionId = res.data.payment_session_id;

  const cashfree = new window.Cashfree({ mode:"sandbox" }); // live → production

  cashfree.checkout({
    paymentSessionId,
    redirectTarget: "_self"
  });

  } catch (err) {
    console.log(err)
    toast.error("Payment failed",{ className: " !bg-[white] !text-black" })
  }
}


  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointment</p>
      <div>
        {
          appointments.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
              <div>
                <img className='w-32 bg-indigo-50' src={item.docData.image} alt="image" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-700 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && item.payment && <button className="sm:min-w-48 py-2 border rounded !text-stone-500 !bg-indigo-50">Paid</button>}
                {!item.cancelled && !item.payment && <button onClick={() => paymentCashfree(item._id)} className='pay_online_button text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded transition-all duration-300 cursor-pointer'>Pay Online</button>}
                {!item.cancelled && <button onClick={() => cancelAppointment(item._id)} className='cancel_appointment_button text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded transition-all duration-300 cursor-pointer'>Cancel appointment</button>}
                {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded !bg-[white] !text-red-500'>Appointment cancelled</button>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointment
