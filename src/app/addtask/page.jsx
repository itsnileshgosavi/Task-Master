"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "",
  });

  const handleClick = async (event) => {
    event.preventDefault();
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
    <div className="grid grid-cols-12 items-center justify-center p-8 space-y-4 bg-gray-500-300 border border-gray-100">
      <div className="col-span-4 col-start-5 border border-gray-300 p-5">
        <h1 className="text-3xl text-center">Add Your Task</h1>
        <form action="#!" onSubmit={handleClick}>
          <div className="mt-4 flex justify-center">
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
          </div>

          <div className="mt-4 flex justify-center">
            <input
              type="text"
              placeholder="Enter title"
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
              id="title"
              name="title"
              onChange={(event) => {
                setFormData({
                  ...formData,
                  title: event.target.value,
                });
              }}
            />
          </div>
          <div className="mt-4 flex justify-center">

            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content
            </label>

          </div>
          
          <div className="mt-4 flex justify-center">
            <textarea
              type="text"
              placeholder="Enter content"
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
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
          </div>
          <div className="mt-4 flex justify-center">
            <label htmlFor="status" className="block text-sm font-medium mb-2">
              Status
            </label>

          </div>
          <div className="mt-4 flex justify-center">
            <select
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
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
          </div>
          <div className="mt-4 flex justify-center">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
