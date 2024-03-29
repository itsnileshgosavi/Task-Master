"use client";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/app/context/userContext";
import { toast } from "react-toastify";

const ShowTasks = () => {
  const context = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [taskToDelete, setTaskToDelete] = useState(null);

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

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
   // Function to handle filter change
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="flex-col md:flex-row -z-50">
      <div className="card z-0 ">
        <div className="flex justify-center text-3xl">
        <h2>Your Tasks</h2>

        </div>
      <div className="card-body z-0">
      <select
            value={filter}
            onChange={handleFilterChange}
            className="mb-4 rounded-lg border border-gray-300 p-2"
          >
            <option value="all">All Tasks</option>
            <option value="Pending">Pending Tasks</option>
            <option value="Completed">Completed Tasks</option>
          </select>
            {filteredTasks.length === 0 ? (
              <p>Looks like you don't have any tasks.</p>
            ) : (
              <ul className="">
                {filteredTasks.map((task) => (
                  <div
                    className={`card z-0 shrink-0 w-full max-w-sm shadow-2xl  my-5 ${
                      task.status === "Completed"
                        ? "bg-lime-900"
                        : "bg-slate-900"
                    }`}
                  >
                    <li key={task._id} className={`card-body z-0 w-auto m-7 p-5`}>
                      <button
                        type="button"
                        className="shadow-lg hover:bg-gray-600 bg-gray-950 rounded-full w-9 h-9 flex justify-center items-center cursor-pointer"
                        onClick={() =>{setTaskToDelete(task._id);
                            document.getElementById("my_modal_1").showModal();}}
                      >
                        X
                      </button>
                      <h2 className="text-3xl font-bold my-3 mx-auto">
                        {task.title}
                      </h2>
                      <p className="text-lg tarttext-gray-200 my-10 mx-auto">
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
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-600">Warning !!</h3>
          <p className="py-4">
            Are you sure you want to Delete this task?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}

              <button className="btn">NO</button>
              <button className="btn btn-warning" onClick={()=>handleDeleteTask(taskToDelete)}>YES</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ShowTasks;
