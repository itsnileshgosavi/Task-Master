"use client";

import { connectDb } from "@/helper/db";
import { useState } from "react";
import { toast } from "react-toastify";
connectDb();

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "Pending",
  });

 

  const handleClick = async (event) => {
    event.preventDefault();
    if(formData.title.trim()==="" || formData.content.trim()===""){
      toast.info("Title or content cannot be empty");
      return;
    }
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("task added");
        // Reset the form fields
        setFormData({
          title: "",
          content: "",
          status: "",
        });
        event.target.reset();
      } else {
        console.error("Failed to add task:", response.statusText);
        toast.error("failed");
      }
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  return (
<div className="flex min-h-screen items-center justify-start bg-white px-10">
  <div className="mx-auto w-full max-w-lg text-black">
    <h1 className="text-4xl font-medium">Add Task</h1>
    <p className="mt-3">Please fill the form with your task details</p>

    <form onSubmit={handleClick} className="mt-10">
      <div className="grid gap-6 sm:grid-cols-1">
        <div className="relative z-0">
          <input type="text" name="name" onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Enter Title</label>
        </div>
        
        <div className="relative z-0">
          <textarea name="message" rows="5" onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" "></textarea>
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Enter Content</label>
        </div>
        <div className="relative z-0">
        <select defaultValue={"Pending"} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="select select-bordered select-sm w-full max-w-xs bg-transparent">
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
        </select>
      </div>
      </div>
      
      <button type="submit" className="mt-5 rounded-md btn btn-primary px-10 py-2 text-white">Add</button>
      <button type="reset" className="mt-5 mx-5 rounded-md btn hover:bg-red-500 bg-red-600 px-10 py-2 text-white">Reset</button>
    </form>
  </div>
</div> 
  );
};

export default AddTask;
