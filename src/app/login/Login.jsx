"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const signupClick = () => {
    router.push("/signup");
  };

  const handleClick = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        toast.success("User Logged In successfully");
        document.location.reload();
        router.push("/your-tasks");
      } else {
        console.error("Failed to Login:", response.statusText);
        toast.error("Invalid email or Password");
      }
    } catch (error) {
      console.error("Error logging in user:", error.message);
      toast.error("failed");
    }
  };
  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-slate-800 mx-auto h-full border border-white my-10">
    <div className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="enter your email here"
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
          placeholder="enter your password here"
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
        <button className="btn btn-primary" onClick={handleClick}>Login</button>
        <button className="btn btn-secondary my-5" onClick={signupClick}>Sign Up</button>
      </div>
    </div>
  </div>
  );
};

export default Login;
