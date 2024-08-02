'use client'
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Verify = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('');

  const router = useRouter();
  const handleVerify =async () => {
    try {
      if(email.trim()==="" || verificationCode.trim()===""){
        toast.error("Email and verification code cannot be null");
        return;    
    }else{
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verificationCode }),
      });
      
      if (res.ok) {
        toast.success("Email verified successfully");
        router.push("/your-tasks");
      } else {
        toast.error("Something went wrong: Try again");  
      }
    }

  } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <>
   <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold uppercase text-black">Please verify your email</h1>
        <input type="email" onChange={(e)=>{setEmail(e.target.value)}}  id="email" placeholder="enter email" className="input input-bordered my-3 bg-white text-black" />
        {/* {session && <button className="btn btn-secondary my-5">Send Verification Code to Email</button>} */}
        <input type="tel" name="verificationCode" id="verificationCode" onChange={(e)=>{setVerificationCode(e.target.value)}} placeholder="enter verification code" className="input input-bordered my-3 bg-white text-black" />
        <button className="btn btn-primary my-5" onClick={handleVerify}>Verify Now</button>
        <button className="btn btn-ghost" onClick={()=>{router.push("/signin")}}>Verify Later</button>
   </div>
    </>
  )
}

export default Verify