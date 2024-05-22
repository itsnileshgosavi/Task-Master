"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "../loading/loading";

const RegisterUser = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_picture: "",
  });

  const handleRegister = async () => {

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
            router.push("/api/auth/signin");
          }else if(response.status==403){
                toast.error("Provided email is already registered please login");
                return;
          } else {
            console.error("Failed to register user:", response.statusText);
            toast.error("Failed to register");
          }
        } catch (error) {
          
          toast.error(`Failed to registered`);
        }finally{
          setLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
    }
  };

  const loginClick = () => {
    router.push("/api/auth/signin");
  };

  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-slate-800 mx-auto h-full my-10">
      <div className="card-body">
        <h2 className="text-3xl mx-auto text-primary">Sign Up</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
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
          <button className="btn btn-primary" onClick={() => handleRegister()} disabled={loading}>
          {loading ? <Loading /> : 'Sign Up'}
          </button>
          <button
            className="btn btn-secondary my-5"
            onClick={() => loginClick()}
          >
            <span>Already Member?</span>Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
