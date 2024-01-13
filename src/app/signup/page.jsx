'use client'

import { useState } from 'react';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';


const RegisterUser = () => {
  const router=useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profile_picture: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('User registered successfully');
        router.push("/login");
        
      } else {
        console.error('Failed to register user:', response.statusText);
        toast.error("Failed to register", error.message)
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
      toast.error("failed",error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center p-8 space-y-4 bg-blue-300 h-screen'>
      <h1 className='text-6xl p-10 text-gray-800'>Sign UP</h1>
    <label htmlFor='name' className='text-white'>
      Name
    </label>
    <input
      type='text'
      placeholder='Enter name'
      className='px-4 py-2 bg-gray-50 text-black rounded-md'
      id='name'
      name='name'
      onChange={handleChange}
    />

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

    <label htmlFor='profile_picture' className='text-white'>
      Profile Picture
    </label>
    <input
      type='text'
      placeholder='Enter profile picture URL'
      className='px-4 py-2 bg-gray-50 text-black rounded-md'
      id='profile_picture'
      name='profile_picture'
      onChange={handleChange}
    />

    <button
      type='submit'
      className='px-6 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200'
      onClick={handleRegister}
    >
      Register
    </button>
    
  </div>
  );
};

export default RegisterUser;
