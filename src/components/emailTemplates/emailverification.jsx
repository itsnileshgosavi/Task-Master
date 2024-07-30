import * as React from 'react';


export const VerifyEmailTemplate = ({
  firstName,
  verificationCode,
}) => (
  <div className='flex flex-col justify-center items-center'>

    <div className='flex items-center'>
      <img src="https://task-manager.nileshgosavi.tech/logo1.png" alt="logo " className="w-7 h-7 m-2" />
      <h1 className="mt-1 text-black text-2xl font-poppins font-bold">Task Master</h1>
    </div>
    <h2 className='text-black text-xl font-roboto'>Welcome to Task Master</h2>
    <h1 className='text-black text-4xl'>Hello, {firstName}!</h1>
    <p className='text-black'>Thank you for signing up. Here is your verification code: <h2 className='font-bold text-xl'>{verificationCode}</h2></p>
    <small className='text-black'> This code will expire in 1 hour</small>
  </div>
);
