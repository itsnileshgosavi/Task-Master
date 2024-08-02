"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "../loading/loading";
import { signIn } from "next-auth/react";
import Link from "next/link";

const RegisterUser = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_picture: "",
    about:""
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(formData.name.trim()===""){
      toast.error("name is required");
      return;
    }else if(formData.email.trim()===""){
      toast.error("email is required");
      return;

    }else if (!emailRegex.test(formData.email.trim())) {

        toast.error("Please enter a valid email address");

    }else if(formData.password.trim()===""){
      toast.error("Password cannot be null");
      return;
    }else if (formData.password.trim().length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
    }else{
        try {
          setLoading(true);
          const response = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          console.log(response)

          if (response.ok) {
            toast.success("User registered successfully");
            const welcomeRes = await fetch("/api/resend/send-welcome", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              
              body: JSON.stringify({
                email: formData.email,
              }),
            })
            if(welcomeRes.ok){
              router.push("/verify");
            }
          }else if(response.status==403){
                toast.error("Provided email is already registered please login");
                return;
          } else {
            console.error("Failed to register user:", response.statusText);
            toast.error("Failed to register");
          }
        } catch (error) {
          //setLoading(false);
          toast.error(`Failed to registered`);
        }finally{
          setLoading(false);
         
        }
    }
  };

  const loginClick = () => {
    router.push("/api/auth/signin");
  };

  return (
    <div className="p-5 bg-white md:flex-1 mx-auto w-96">
        <h3 className="my-4 text-2xl font-semibold text-gray-700">Sign Up</h3>
        <form onSubmit={handleRegister} className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-1">
           
            <label htmlFor="Name" className="text-sm font-semibold text-gray-500">Name</label>
            <input name='name' type="text" id="name" autoComplete='name' onChange={(e)=>{setFormData({...formData, name: e.target.value})}} className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 text-black" />
          </div>
          <div className="flex flex-col space-y-1">
           
            <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
            <input name='email' type="email" id="email" autoComplete='email' onChange={(e)=>{setFormData({...formData, email: e.target.value})}} className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 text-black" />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
              <Link href="/reset-password" className="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</Link>
            </div>
            <input name='password' type="password" id="password" autoComplete='new-password' onChange={(e)=>{setFormData({...formData, password: e.target.value})}} className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 text-black focus:ring-blue-200" />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200" />
            <label htmlFor="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-primary rounded-md shadow hover:bg-blue-800 focus:outline-none focus:ring-blue-200 focus:ring-4">
            {loading? <span className='loading loading-spinner'></span>:"Sign Up"}
            </button>
          </div>
          <div className="flex flex-col space-y-5">
            <span className="flex items-center justify-center space-x-2">
              <span className="h-px bg-gray-400 w-14" />
              <span className="font-normal text-gray-500">or Sign up with</span>
              <span className="h-px bg-gray-400 w-14" />
            </span>
            <div className="flex flex-col space-y-4">
              <div onClick={()=>signIn('github')} className="flex cursor-pointer items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none">
                <span>
                  <svg className="w-5 h-5 text-gray-800 fill-current group-hover:text-white" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-white">Github</span>
              </div>
              <div onClick={()=>signIn('google')} className="flex cursor-pointer items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none">
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                </span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-white">Google</span>
              </div>
              <div onClick={()=>signIn("discord")} className="flex cursor-pointer items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none">
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                            <radialGradient id="La9SoowKGoEUHOnYdJMSEa_2mIgusGquJFz_gr1" cx="24" cy="10.009" r="32.252" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#8c9eff"></stop><stop offset=".368" stopColor="#889af8"></stop><stop offset=".889" stopColor="#7e8fe6"></stop><stop offset="1" stopColor="#7b8ce1"></stop></radialGradient><path fill="url(#La9SoowKGoEUHOnYdJMSEa_2mIgusGquJFz_gr1)" d="M40.107,12.15c-0.065-0.102-0.139-0.182-0.236-0.255c-0.769-0.578-4.671-3.339-9.665-3.875	c-0.01-0.001-0.048-0.003-0.057-0.003c-0.098,0-0.183,0.057-0.224,0.14l-0.269,0.538c0,0-0.001,0-0.001,0	c-0.017,0.033-0.026,0.071-0.026,0.111c0,0.109,0.07,0.202,0.168,0.236c0.006,0.002,0.048,0.011,0.063,0.014	c4.267,1.028,6.863,2.89,9.149,4.945c-4.047-2.066-8.044-4.001-15.009-4.001s-10.961,1.936-15.009,4.001	c2.286-2.055,4.882-3.917,9.149-4.945c0.015-0.004,0.057-0.012,0.063-0.014c0.098-0.034,0.168-0.127,0.168-0.236	c0-0.04-0.009-0.078-0.026-0.111c0,0-0.001,0-0.001,0l-0.269-0.538c-0.041-0.083-0.125-0.14-0.224-0.14	c-0.009,0-0.048,0.002-0.057,0.003c-4.994,0.536-8.896,3.297-9.665,3.875c-0.097,0.073-0.17,0.153-0.236,0.255	c-0.708,1.107-5.049,8.388-5.892,21.632c-0.009,0.142,0.04,0.289,0.135,0.395c4.592,5.144,11.182,5.752,12.588,5.823	c0.167,0.008,0.327-0.065,0.427-0.199l1.282-1.709c0.1-0.134,0.046-0.322-0.111-0.379c-2.705-0.986-5.717-2.7-8.332-5.706	C11.231,34.457,16.12,37,24,37s12.769-2.543,16.009-4.993c-2.616,3.006-5.627,4.719-8.332,5.706	c-0.157,0.057-0.211,0.245-0.111,0.379l1.282,1.709c0.101,0.134,0.26,0.208,0.427,0.199c1.407-0.072,7.996-0.679,12.588-5.823	c0.095-0.106,0.144-0.253,0.135-0.395C45.156,20.538,40.815,13.257,40.107,12.15z"></path><ellipse cx="30.5" cy="26" opacity=".05" rx="4.5" ry="5"></ellipse><ellipse cx="30.5" cy="26" opacity=".05" rx="4" ry="4.5"></ellipse><ellipse cx="30.5" cy="26" fill="#fff" rx="3.5" ry="4"></ellipse><ellipse cx="17.5" cy="26" opacity=".05" rx="4.5" ry="5"></ellipse><ellipse cx="17.5" cy="26" opacity=".05" rx="4" ry="4.5"></ellipse><ellipse cx="17.5" cy="26" fill="#fff" rx="3.5" ry="4"></ellipse>
                </svg>
                </span>
                <span className="text-sm font-medium text-blue-500 group-hover:text-white">Discord</span>
              </div>
            </div>
          </div>
        </form>
      </div>
  );
};

export default RegisterUser;
