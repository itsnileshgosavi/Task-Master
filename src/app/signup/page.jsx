"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RegisterUser = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_picture: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("User registered successfully");
        router.push("/login");
      } else {
        console.error("Failed to register user:", response.statusText);
        toast.error("Failed to register", error.message);
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
      toast.error("failed", error.message);
    }
  };

  const loginClick=()=>{
    router.push("/login");
  }

  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-slate-800 mx-auto h-full my-10">
      <div className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="Name"
            placeholder="Enter your name"
            className="input input-bordered"
            onChange={(event) => {
              setFormData({
                ...formData,
                name: event.target.value,
              });
            }}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            onChange={(event) => {
              setFormData({
                ...formData,
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
            placeholder="password"
            className="input input-bordered"
            onChange={(event) => {
              setFormData({
                ...formData,
                password: event.target.value,
              });
            }}
            required
          />
         
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={()=>handleRegister()}>Sign UP</button>
          <button className="btn btn-secondary my-5" onClick={()=>loginClick()}>Login Instead?</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
