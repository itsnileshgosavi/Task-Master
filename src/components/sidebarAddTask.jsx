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
    <div className="card  z-10">
      <div className=" card shrink-0 w-full shadow-2xl p-8 h-10">
        <div className="flex flex-col">
        <h1 className="text-3xl mb-4 text-white mx-auto">Add Task</h1>

        <form action="#!" onSubmit={handleClick} className="card-body">
          <div className="mt-4 flex justify-center">
            <label
              htmlFor="title"
              className="block text-sm font-medium mb-2"
              required
            >
              Title
            </label>
          </div>

          <div className="mt-4 flex justify-center">
            <input
              type="text"
              placeholder="Enter title"
              className=" p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
              id="title"
              name="title"
              required
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
              className="p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
              rows={5}
              id="content"
              name="content"
              required
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
              className="btn px-6 py-3 bg-sky-600 text-white rounded-3xl hover:bg-cyan-800 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200"
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
    </div>
  );
};

export default AddTask;
