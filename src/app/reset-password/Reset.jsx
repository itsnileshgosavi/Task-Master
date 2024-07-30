'use client'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Reset = () => {
    const [email, setEmail] = useState('');
    const [ newPass, setNewPass] = useState('');
    const [ confirmPass, setConfirmPass] = useState('');
    const [ verificationCode, setVerificationCode] = useState('');
    const router = useRouter();
    const SendCode =async (e) => {
        e.preventDefault();
        try {
            const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(email.trim() === "" || !emailregex.test(email)){ 
                toast.error("Please enter a valid email address");
                return;
            }else{
            const res = await fetch('/api/resend/send-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            })
            
            if(res.status === 200){
                toast.success("Verification code sent successfully");
                e.target.disabled=true;
            }else if(res.status === 404){
                toast.error("This email is not registered");
            }else if(res.status === 400){
                toast.info("Verification code already sent");
            }else{
                toast.error("Error:Please try again later");
            }
            
        }
        } catch (error) {
            console.log(error);
        }
    }

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if(newPass.trim() === "" || confirmPass.trim() === "" || verificationCode.trim() === ""){
                toast.error("All fields are required");
                return;
            }else if(newPass.trim() !== confirmPass.trim()){
                toast.error("Passwords do not match");
                return;
            }else if(passwordregex.test(newPass) === false){
                toast.error("Password is not secure. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
                return;

            } else{
                const res = await fetch('/api/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        newPass: newPass,
                        verificationCode: verificationCode
                    })
                })
                if(res.status === 200){
                    toast.success("Password reset successfully");
                    router.push("/signin");
                }else{
                    toast.error("Error:Please try again later");
                }
            }
            } catch (error) {
                toast.error("Error:Please try again later");
            }}
  return (
    <section>
        <div className="bg-white relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
          <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
             <div className="flex flex-col">
                <div>
                <h2 className="text-4xl text-black font-poppins">Reset Password</h2>
                </div>
             </div>
                <form onSubmit={handleReset}>
                    <div className="mt-4 space-y-6">
                        <div className="col-span-full">
                            <label className="block mb-3 text-sm font-medium text-gray-600"> Enter registered email</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"/>
                            <button type='button' onClick={(e) => SendCode(e)} className='btn btn-secondary my-2'>Send Verification Code</button>
                        </div>
                        <div className="col-span-full">
                            <label className="block mb-3 text-sm font-medium text-gray-600"> Enter Verification Code sent to email</label>
                            <input type="number" onChange={(e) => setVerificationCode(e.target.value)} placeholder="" className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"/>
                        </div>
                        <div className="col-span-full">
                            <label className="block mb-3 text-sm font-medium text-gray-600">New Password   </label>
                            <input type="password" onChange={(e) => setNewPass(e.target.value)} placeholder="******" className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"/>
                        </div>
                        <div className="col-span-full">
                            <label className="block mb-3 text-sm font-medium text-gray-600"> Confirm Password   </label>
                            <input type="password" onChange={(e) => setConfirmPass(e.target.value)} placeholder="******" className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"/>
                        </div>

                        <div className="col-span-full">
                            <button type="submit" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-blue-500 border-2 border-blue-500 rounded-full nline-flex hover:bg-transparent hover:border-blue-500 hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black">Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Reset;