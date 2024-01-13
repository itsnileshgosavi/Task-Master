"use client";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import { toast } from "react-toastify";

const YourTasks = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await fetch("/api/users/tasks", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
        console.log("Task deleted successfully");
        toast.success("Task deleted successfully");
      } else {
        console.log("Failed to delete task");
        toast.error("Failed to delete");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-12 mt-3">
      <div className="col-span-6 col-start-4">
        <div className="m-5">
          <h1 className="text-3xl flex justify-center font-bold mb-4">
            Your Tasks  ({tasks.length})
          </h1>
        </div>

        {tasks.length === 0 ? (
          <p>Looks like you dont have any tasks.</p>
        ) : (
          <div className="  ">
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li key={task._id} className="bg-gray-600 p-4 rounded">
                  <h2 className="text-lg font-bold">{task.title}</h2>
                  <p className="text-gray-200">{task.content}</p>
                  <p className="text-sm text-gray-100">Status: {task.status}</p>
                  <p className="text-sm text-gray-100">
                    Added on: {task.addedDate}
                  </p>
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourTasks;
