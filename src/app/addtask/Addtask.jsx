"use client";

import { connectDb } from "@/helper/db";
import { useState } from "react";
import { toast } from "react-toastify";
connectDb();

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "",
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
        console.log("Task added successfully");
      } else {
        console.error("Failed to add task:", response.statusText);
        toast.error("failed");
      }
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  return (
    <div className="dark:bg-slate-600 bg-slate-300 w-80 max-w-full flex justify-center flex-col items-center md:w-2/3 mx-auto my-5 py-10">
      <figure className="flex justify-center">
        <img
          className="h-20 w-16"
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/add-task-3912847-3242334.png"
          alt="image"
        />
      </figure>
      <h1 className="text-3xl text-center font-bold">Add Your Task</h1>

      <form action="#!" onSubmit={handleClick} className="flex flex-col items-center p-2 pt-10 space-y-5">
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>

        <input
          type="text"
          placeholder="Enter title"
          className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800 text-neutral-content"
          id="title"
          name="title"
          onChange={(event) => {
            setFormData({
              ...formData,
              title: event.target.value,
            });
          }}
        />

        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Content
        </label>

        <textarea
          placeholder="Enter content"
          className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800 text-neutral-content"
          rows={5}
          id="content"
          name="content"
          onChange={(event) => {
            setFormData({
              ...formData,
              content: event.target.value,
            });
          }}
        />

        <label htmlFor="status" className="block text-sm font-medium mb-2">
          Status
        </label>

        <select
          className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800 text-neutral-content"
          id="status"
          name="status"
          value={formData.status}
          onChange={(event) => {
            setFormData({
              ...formData,
              status: event.target.value,
            });
          }}
        >
          <option>--Select Status--</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          type="submit"
          className="px-6 py-3 bg-sky-600 text-white rounded-3xl hover:bg-cyan-800 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200"
        >
          Submit
        </button>
        <button
          className="ms-3 px-6 py-3 bg-red-700 text-white rounded-3xl hover:bg-red-500 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200"
          type="reset"
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default AddTask;
