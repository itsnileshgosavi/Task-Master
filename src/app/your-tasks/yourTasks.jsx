"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const YourTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
 

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
        toast.success("Task deleted !!");
      } else {
        console.log("Failed to Delete Task");
        toast.error("Failed to Delete");
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

  //edit task function

  const handleEditTask = (task) => {
    setEditTask(task);
    setEditedTitle(task.title);
    setEditedContent(task.content);
    setEditedStatus(task.status);
    setTaskToEdit(task._id);
  };

  // function to save changes in db 

  const handleSaveEdit =async (taskId) => {
    try {
      const updatedTaskData =  { ...editTask, title: editedTitle, content: editedContent, status: editedStatus };
      console.log(updatedTaskData);
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTaskData),
      });
      if (response.ok) {
        console.log("Task Edited..");
        toast.success("Task has been edited");
        window.location.reload();
      } else {
        console.log("Failed to save edit");
        toast.error("Something went wrong");
      }
      
    } catch (error) {
      console.error(error);
    }
    
    // Clear edit state
    setEditTask(null);
    setEditedTitle("");
    setEditedContent("");
    setEditedStatus("");
  };

  return (
    <div className="hero min-h-screen bg-base-200 -z-50">
      <div className="flex-col flex flex-wrap justify-center">
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-3xl font-bold">Your Tasks ({tasks.length})</h1>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="my-4 rounded-lg border border-gray-300 p-2"
          >
            <option value="all">All Tasks</option>
            <option value="Pending">Pending Tasks</option>
            <option value="Completed">Completed Tasks</option>
          </select>
        </div>
        <div className="flex flex-wrap">
          {filteredTasks.length === 0 ? (
            <p>Looks like you don't have any tasks.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-full">
              {filteredTasks.map((task) => (
                <div
                  className={`rounded-xl shrink-0  max-w-full shadow-2xl flex flex-wrap items-center justify-center w-full my-5 break-words mx-1 ${
                    task.status === "Completed" ? "bg-lime-900" : "bg-slate-900"
                  }`}
                >
                  <li
                    key={task._id}
                    className={`flex flex-col items-center justify-center break-words flex-wrap max-w-full m-3 p-2`}
                  >
                    <div className="flex justify-between w-full max-w-full mx-1">
                    <button
                      type="button"
                      className="shadow-lg hover:bg-gray-600 bg-gray-950 rounded-full w-9 h-9 flex justify-center items-center cursor-pointer"
                      onClick={() =>{setTaskToDelete(task._id);
                        document.getElementById("my_modal_1").showModal();}
                      }
                    >
                      X
                    </button>
                    <button
                      type="button"
                      className="shadow-lg hover:bg-gray-600 bg-gray-950 rounded-full w-9 h-9 flex justify-center items-center cursor-pointer"
                      onClick={() =>{handleEditTask(task);
                        document.getElementById("edit-modal").showModal();}
                      }
                    >
                     edit
                    </button>
                    </div>
                    <h2 className="text-3xl font-bold my-3 mx-auto flex-wrap max-w-full">
                      {task.title}
                    </h2>
                    <p className="text-lg text-gray-200 my-10 h-auto whitespace-normal max-w-full">
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
      {/* edit task modal */}
      <dialog id="edit-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-green-600"> Edit Task</h3>
          <div className="flex flex-col space-y-4 items-center justify-center">
              <label htmlFor="title" className="block text-sm font-medium mt-9">
                Title
              </label>
            <input className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
            <label
                htmlFor="content"
                className="block text-sm font-medium mb-2"
              >
                Content
              </label>
            <textarea 
            value={editedContent} 
            onChange={(e) => setEditedContent(e.target.value)} 
            className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800" />
            <select value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} className="w-1/2 p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800">
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          
        </div>
          <div className="modal-action">
            <form method="dialog">
              

              <button className="btn">Cancel</button>
              <button className="btn btn-info" onClick={()=>handleSaveEdit(taskToEdit)}>Save Changes</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default YourTasks;
