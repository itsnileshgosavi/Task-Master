"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "../loading/loading";
import { signIn, signOut } from "next-auth/react";



const Login = () => {
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  
 
  

 const handleEmailSignIn = async () => {
  // Call signIn with the provider name ('credentials') and the credentials (email and password)
  await signIn('Credentials', loginData);
};

const handleGithubSignIn =async()=>{
  try {
    await signIn('github');
  } catch (error) {
    console.error('Error signing in with GitHub:', error);
    // Handle error (e.g., display error message)
    toast.error('Failed to sign in with GitHub');
  }
}

 
  const signupClick = () => {
    router.push("/signup");
  };

  // const handleClick = async () => {
  //   if(loginData.email.trim()==="" || loginData.password.trim()===""){
  //     toast.error("Email or Password cannot be empty")
  //     return;
  //   }else{

  //   try {
  //     setIsLoading(true);
  //     const response = await fetch("/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(loginData),
  //     });

  //     if (response.ok) {
  //       toast.success("User Logged In successfully");
      
  //       router.push("/your-tasks");
        
  //     } else {
  //       console.error("Failed to Login:", response.statusText);
  //       toast.error("Invalid email or Password");
  //     }
  //   } catch (error) {
  //     console.error("Error logging in user:", error.message);
  //     toast.error("failed");
  //   } finally {
  //     setIsLoading(false);
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 2000);
      
  //   }}
  // };
  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-slate-800 mx-auto h-full border border-white my-10">
    <form className="card-body">

        <h2 className="text-3xl mx-auto text-primary">Login</h2>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="Enter Your Email*"
          className="input input-bordered"
          onChange={(event) => {
            setLoginData({
              ...loginData,
              email: event.target.value,
            });
          }}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter Your Password*"
          className="input input-bordered"
          onChange={(event) => {
            setLoginData({
              ...loginData,
              password: event.target.value,
            });
          }}
          required
        />
        <label className="label">
          <a href="#" className="label-text-alt link link-hover">
            Forgot password?
          </a>
        </label>
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" onClick={handleEmailSignIn} disabled={isloading}>{isloading ? <Loading /> : 'Login'}</button>
        <button className="btn btn-secondary my-5" onClick={signupClick}>New User? Sign Up</button>
      </div>
      <button onClick={() => handleGithubSignIn()}>Sign in with GittHub</button>
    </form>
  </div>
  );
};

export default Login;
