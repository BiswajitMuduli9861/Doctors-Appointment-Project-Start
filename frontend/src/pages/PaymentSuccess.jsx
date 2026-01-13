import React from 'react'
import { useContext } from 'react';
import { useSearchParams, useNavigate,  } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
     const [params] = useSearchParams();
  const order_id = params.get("order_id");
   const appointment_id = params.get("appointment_id");
  // console.log(order_id)
  // console.log(appointment_id)

    const {backendUrl} = useContext(AppContext)

    const navigate = useNavigate()

    const verify = async() =>{
        try {
        if (order_id && appointment_id) {
          const res = await axios.post(`${backendUrl}/api/user/payment-verify`, {
            order_id,
            appointment_id
          });

          if (res.data.success) {
            toast.success("Payment Successful ",{ className: " !bg-[white] !text-black" });
            navigate("/my-appointments");
          } else {
            toast.error("Payment Failed",{ className: " !bg-[white] !text-black" });
          }
        }
      } catch (err) {
        console.log(err);
        toast.error("Verification Error",{ className: " !bg-[white] !text-black" });
      }
    }

    useEffect(()=>{
        verify()
    },[order_id])
  return (
    <div>
      <h2 className="text-center mt-20">Verifying Payment...</h2>
    </div>
  )
}

export default PaymentSuccess
