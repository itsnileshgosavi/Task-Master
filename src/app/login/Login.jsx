'use client'

import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';




const Login = () => {
  const router = useRouter();
    const [loginData, setLoginData] = useState({
        email:"",
        password:"",
    });
    
    const handleChange=(e)=>{
          setLoginData ({
             ...loginData,
             [e.target.name]: e.target.value,
          });
    };
    const signupClick=()=>{
        router.push('/signup');
    };
      
    const handleClick= async ()=>{
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
  
        if (response.ok) {
          toast.success('User Logged In successfully');
          router.push('/');
          
        } else {
          console.error('Failed to Login:', response.statusText);
          toast.error("Invalid email or Password")
        }
      } catch (error) {
        console.error('Error logging in user:', error.message);
        toast.error("failed");
      }
        
    };
  return (
    <div className='flex flex-col items-center justify-center p-8 space-y-4 bg-blue-300 h-screen'>
    <h1 className='text-6xl p-10 text-gray-800'>Login</h1>

    <label htmlFor='email' className='text-white'>
      Email
    </label>
    <input
      type='email'
      placeholder='Enter email'
      className='px-4 py-2 bg-gray-50 text-black rounded-md'
      id='email'
      name='email'
      onChange={handleChange}
    />

    <label htmlFor='password' className='text-white'>
      Password
    </label>
    <input
      type='password'
      placeholder='Enter password'
      className='px-4 py-2 bg-gray-50 text-black rounded-md'
      id='password'
      name='password'
      onChange={handleChange}
    />

    <button
      type='submit'
      className='px-6 py-3 bg-sky-600 text-white rounded-3xl hover:bg-cyan-800 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200'
      onClick={handleClick}
    >
      Login
    </button>
    <span><button
      type='submit'
      className='px-6 py-3 bg-green-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200'
      onClick={signupClick}
    >
      Sign Up Here
    </button></span>
    
  </div>
  )
};

export default Login;