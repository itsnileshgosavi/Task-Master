"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

  if (name === 'status') {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  console.log(formData);
  };

  const handleClear = () => {
    setFormData({
      title: '',
      content: '',
      status: '',
    });
    window.location.reload();
    
  };

  const handleClick = async () => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Task added");
        console.log("Task added successfully");
      } else {
        console.error("Failed to add task:", response.statusText);
        alert("Failed");
      }
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  return (
    
    <div className="flex h-10 bg-inherit-300">
    <div className="w-72 p-8 bg-inherit-700 h-10">
      <h1 className="text-3xl mb-4 text-white">Add Your Task</h1>

      <label htmlFor="title" className="block text-white-800 mb-2">
        Title
      </label>
      <input
        type="text"
        placeholder="Enter title"
        className="w-full py-2 px-3 border border-gray-300 mb-4 text-black"
        id="title"
        name="title"
        onChange={handleChange}
      />

      <label htmlFor="content" className="block text-white-800 mb-2">
        Content
      </label>
      <textarea
        type="text"
        placeholder="Enter content"
        className="textarea textarea-bordered textarea-lg w-full max-w-xs max-h-96 py-2 px-3 border border-gray-300 mb-4 text-black"
        id="content"
        name="content"
        onChange={handleChange}
      />

      <label htmlFor="status" className="block text-white-800 mb-2">
        Status
      </label>
      <select
        className="px-4 py-2 bg-gray-50 text-black rounded-md"
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        
      >
        <option value="none" onChange={handleChange} disabled>
          --Select Status--
        </option>
        <option value="Pending" onChange={handleChange}>
          Pending
        </option>
        <option value="Completed" onChange={handleChange}>
          Completed
        </option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
        onClick={handleClick}
      >
        Submit
      </button>
      <button
       className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 justify-center'
      onClick={handleClear}
      >
        Clear
      </button>
    </div>
  </div>
);
};

export default AddTask;
