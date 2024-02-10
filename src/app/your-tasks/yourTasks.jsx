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

  const handleDeleteTask = async (taskId, taskname) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${taskname} task?`
    );

    if (isConfirmed) {
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
    }
  };

  const markCompleted = async (taskId) => {
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
  };

  const markPending = async (taskId) => {
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
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="hero min-h-screen bg-base-200 -z-50">
      <div className="flex-col flex flex-wrap md:flex-row ">
        <div className="m-5">
          <h1 className="text-3xl font-bold">Your Tasks ({tasks.length})</h1>

          <div className="flex flex-wrap">
            {tasks.length === 0 ? (
              <p>Looks like you don't have any tasks.</p>
            ) : (
              <ul className="flex flex-wrap container overflow-auto">
                {tasks.map((task) => (
                  <div
                    className={`container rounded-xl shrink-0 w-full max-w-sm shadow-2xl flex flex-wrap my-5 break-words mx-auto ${
                      task.status === "Completed"
                        ? "bg-lime-900"
                        : "bg-slate-900"
                    }`}
                  >
                    <li key={task._id} className={`card-body flex break-words flex-wrap w-auto m-7 p-5`}>
                      <button
                        type="button"
                        className="shadow-lg hover:bg-gray-600 bg-gray-950 rounded-full w-9 h-9 flex justify-center items-center cursor-pointer"
                        onClick={() => handleDeleteTask(task._id, task.title)}
                      >
                        X
                      </button>
                      <h2 className="text-3xl font-bold my-3 mx-auto flex-wrap">
                        {task.title}
                      </h2>
                      <p className="text-lg text-gray-200 my-10 h-auto whitespace-normal">
                        {task.content}
                      </p>
                      <p className="text-xs text-gray-300 text-center">
                        Status: {task.status}
                      </p>
                      <p className="text-xs text-gray-300 text-center mb-5">
                        Added on: {formatDate(task.addedDate)}
                      </p>

                      {task.status == "Completed" ? (
                        <div className="card-actions justify-center">
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900"
                            onClick={() => markPending(task._id)}
                          >
                            Mark as Pending
                          </button>
                        </div>
                      ) : (
                        <div className="card-actions justify-center">
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 w- focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                            onClick={() => markCompleted(task._id)}
                          >
                            Mark as Completed
                          </button>
                        </div>
                      )}
                    </li>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourTasks;
