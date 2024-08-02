import * as React from 'react';


export const ResetPwdTemplate = ({
  firstName,
  verificationCode,
}) => (
  <div className='flex flex-col justify-center items-center'>

    <div className='flex items-center' style={{ display: 'flex', alignItems: 'center' }}>
      <img src="https://task-manager.nileshgosavi.tech/logo1.png" alt="logo " style={{width: "30px", height: "30px"}} className="w-7 h-7 m-2" />
      <h1 className="mt-1 text-black text-2xl font-poppins font-bold">Task Master</h1>
    </div>
    <h2 className='text-black text-xl font-roboto'>Reset Password</h2>
    <h1 className='text-black text-4xl'>Hello, {firstName}!</h1>
    <p className='text-black'>You requested a password reset. Here is your verification code: <h2 className='font-bold text-xl'>{verificationCode}</h2></p>
    <small className='text-black'> This code will expire in 1 hour</small>
  </div>
);
