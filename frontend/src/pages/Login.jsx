import React, { useState } from 'react'

const Login = () => {

  const [state,setState] =useState('Sign Up');

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState();

  const onSubmitHandler = (event) =>{
    event.preventDefault()


  }
  return (
    <div>
      <form action="" className='min-h-20 flex items-center'>
          <div className='flex flex-col gap-3 m-auto mt-30 items-start p-8 min-w-85 sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
            <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
            <p>Please {state === "Sign Up" ? "sign up" : "login"} to book appointment</p>
            {
              state === "Sign Up" &&
            <div className='w-full'>
              <p>Full Name</p>
              <input style={{backgroundColor:"transparent",color:"black"}} className='border rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
            </div>
            }
            <div className='w-full'>
              <p>Email</p>
              <input style={{backgroundColor:"transparent",color:"black"}} className='border  rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
            </div>
            <div className='w-full'>
              <p>Password</p>
              <input style={{backgroundColor:"transparent",color:"black"}} className='border  rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
            </div>
            <button style={{backgroundColor:"#0250C4",color:"white"}} className=' w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>
            {
              state === 'Sign Up' ? <p>Already have an account? <span onClick={()=>setState("Login")} className='text-[#0250C4] underline cursor-pointer'>Login here</span></p>
              :<p>Create an new account? <span onClick={()=>setState("Sign Up")} className='text-[#0250C4] underline cursor-pointer'>click here</span></p>
            }
          </div>
      </form>
    </div>
  )
}

export default Login
