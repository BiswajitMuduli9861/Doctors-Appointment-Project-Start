import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {setAToken,backendUrl} = useContext(AdminContext)
  const {setDToken} = useContext(DoctorContext)

  const onSubmitHandler = async(event) =>{
    event.preventDefault()
    try {
      if(state === 'Admin'){
        const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
        // console.log(data)
        if(data.success){
          // console.log(data.token)
          localStorage.setItem('aToken',data.token)
          setAToken(data.token)
        }else{
          toast.error(data.message,{
            className:" !bg-[white] !text-black"
          })
        }
      }else{
        const {data} = await axios.post(backendUrl + '/api/doctor/login',{email, password})
        // console.log(data)
        if(data.success){
          // console.log(data.token)
          localStorage.setItem('dToken',data.token)
          setDToken(data.token)
          console.log(data.token)
        }else{
          toast.error(data.message,{
            className:" !bg-[white] !text-black"
          })
        }
      }
    } catch (error) {
      
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border rounded-sl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-[#0250C4]'>{state}</span> Login</p>
        <div className='w-full'>
         <input onChange={(e)=>setEmail(e.target.value)} value={email}
  className="border border-[#DADADA] rounded w-full p-2 mt-1  !text-[color:rgb(0,0,0)] !bg-transparent"
  type="email"
  required
/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1  !text-[color:rgb(0,0,0)] !bg-transparent' type="password" required />
        </div>
        <button className='w-full py-2 rounded-md text-base !bg-[#0250C4] cursor-pointer'>Login</button>
        {
          state === 'Admin'
          ?<p>Doctor Login? <span className='text-[#0250C4] underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
          :<p>Admin Login? <span className='text-[#0250C4] underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
