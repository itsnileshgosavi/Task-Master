"use client";
import React, { useContext, useEffect, useState } from "react";
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

  const markCompleted =async(taskId)=>{
    try {
      // Fetch the existing task data
      const existingTaskResponse = await fetch(`/api/tasks/${taskId}`);
      const existingTaskData = await existingTaskResponse.json();
  
    
      const updatedTaskData = {
        ...existingTaskData,
        status: "Completed",
      };
  
      
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTaskData),
      });
  
      if (response.ok) {
        console.log("Task Marked Completed");
        toast.success("Task Marked Completed");
        window.location.reload();
      } else {
        console.log("Failed to Mark Completed");
        toast.error("Failed Mark Completed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const markPending =async(taskId)=>{
    try {
      // Fetch the existing task data
      const existingTaskResponse = await fetch(`/api/tasks/${taskId}`);
      const existingTaskData = await existingTaskResponse.json();
  
    
      const updatedTaskData = {
        ...existingTaskData,
        status: "Pending",
      };
  
      
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTaskData),
      });
  
      if (response.ok) {
        console.log("Task Marked Pending");
        toast.success("Task Marked Pending");
        window.location.reload();
      } else {
        console.log("Failed to Mark Pending");
        toast.error("Failed Mark Pending");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="grid grid-cols-12 mt-3">
      <div className="col-span-6 col-start-4">
        <div className="m-5">
          <h1 className="text-3xl flex justify-center font-bold mb-4">
            Your Tasks ({tasks.length})
          </h1>
        </div>

        {tasks.length === 0 ? (
          <p>Looks like you don't have any tasks.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task._id} className="bg-gray-600 p-4 rounded">
                <h2 className="text-3xl font-bold mb-3">
                  Tittle: {task.title}
                </h2>
                <p className="text-gray-200 my-5">Content :{task.content}</p>
                <p
                  className={`text-sm ${
                    task.status === "Completed"
                      ? "text-green-500"
                      : "text-orange-500"
                  }`}
                >
                  Status: {task.status}
                </p>
                <p className="text-sm text-gray-100">
                  Added on: {formatDate(task.addedDate)}
                </p>
                <button
                  type="button"
                  className="focus:outline-none text-white bg-orange-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                  onClick={() => markCompleted(task._id)}
                >
                  Mark as Completed
                </button>
                <button
                  type="button"
                  className="focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900"
                  onClick={() => markPending(task._id)}
                >
                  Mark as Pending
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default YourTasks;
