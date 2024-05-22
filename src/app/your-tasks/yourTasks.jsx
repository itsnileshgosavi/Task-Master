"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

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
        getTasks();
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
        getTasks();
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
        getTasks();
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
    <div className="hero min-h-screen bg-slate-100 dark:bg-base-200 -z-50">
      <div className="flex-col flex flex-wrap justify-center">
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-3xl font-bold">Your Tasks ({tasks.length})</h1>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="my-4 rounded-lg border border-gray-300 p-2 bg-slate-500"
          >
            <option value="all">All Tasks</option>
            <option value="Pending">Pending Tasks</option>
            <option value="Completed">Completed Tasks</option>
          </select>
        </div>
        <div className="flex flex-wrap">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center space-y-5">
              <p>Looks like you don't have any tasks.</p>
              <Link className="btn btn-accent" href="/addtask">Add Task Here</Link>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-full">
              {filteredTasks.map((task) => (
                <div key={task._id}
                  className={`rounded-xl shrink-0  max-w-full shadow-2xl flex flex-wrap items-center justify-center w-full my-5 break-words mx-1 ${
                    task.status === "Completed" ? "bg-lime-900" : "dark:bg-slate-900 bg-slate-500"
                  }`}
                >
                  <li
                    key={task._id}
                    className={`flex flex-col items-center justify-center break-words flex-wrap max-w-full m-3 p-2`}
                  >
                    <div className="flex justify-between w-full max-w-full mx-1">
                    <button
                      type="button"
                      className="shadow-lg hover:bg-gray-600 text-white bg-gray-950 rounded-full w-9 h-9 flex justify-center items-center cursor-pointer"
                      onClick={() =>{setTaskToDelete(task._id);
                        document.getElementById("my_modal_1").showModal();}
                      }
                    >
                      X
                    </button>
                    <button
                      type="button"
                      className="shadow-lg hover:bg-gray-600  rounded-full w-9 h-9 flex justify-center items-center cursor-pointer"
                      onClick={() =>{handleEditTask(task);
                        document.getElementById("edit-modal").showModal();}
                      }
                    >
                     <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzUiIGhlaWdodD0iMzUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KPHBhdGggZmlsbD0iIzc4YTBjZiIgZD0iTTEzIDI3QTIgMiAwIDEgMCAxMyAzMUEyIDIgMCAxIDAgMTMgMjdaIj48L3BhdGg+PHBhdGggZmlsbD0iI2YxYmMxOSIgZD0iTTc3IDEyQTEgMSAwIDEgMCA3NyAxNEExIDEgMCAxIDAgNzcgMTJaIj48L3BhdGg+PHBhdGggZmlsbD0iI2NlZTFmNCIgZD0iTTUwIDEzQTM3IDM3IDAgMSAwIDUwIDg3QTM3IDM3IDAgMSAwIDUwIDEzWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmMWJjMTkiIGQ9Ik04MyAxMUE0IDQgMCAxIDAgODMgMTlBNCA0IDAgMSAwIDgzIDExWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM3OGEwY2YiIGQ9Ik04NyAyMkEyIDIgMCAxIDAgODcgMjZBMiAyIDAgMSAwIDg3IDIyWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmYmNkNTkiIGQ9Ik04MSA3NEEyIDIgMCAxIDAgODEgNzggMiAyIDAgMSAwIDgxIDc0ek0xNSA1OUE0IDQgMCAxIDAgMTUgNjcgNCA0IDAgMSAwIDE1IDU5eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM3OGEwY2YiIGQ9Ik0yNSA4NUEyIDIgMCAxIDAgMjUgODlBMiAyIDAgMSAwIDI1IDg1WiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xOC41IDUxQTIuNSAyLjUgMCAxIDAgMTguNSA1NkEyLjUgMi41IDAgMSAwIDE4LjUgNTFaIj48L3BhdGg+PHBhdGggZmlsbD0iI2YxYmMxOSIgZD0iTTIxIDY2QTEgMSAwIDEgMCAyMSA2OEExIDEgMCAxIDAgMjEgNjZaIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTgwIDMzQTEgMSAwIDEgMCA4MCAzNUExIDEgMCAxIDAgODAgMzNaIj48L3BhdGg+PGc+PHBhdGggZmlsbD0iI2YxYmMxOSIgZD0iTTY1LDI4YzMuODYsMCw3LDMuMTQsNyw3djMwYzAsMy44Ni0zLjE0LDctNyw3SDM1Yy0zLjg2LDAtNy0zLjE0LTctN1YzNWMwLTMuODYsMy4xNC03LDctN0g2NSI+PC9wYXRoPjxwYXRoIGZpbGw9IiM0NzJiMjkiIGQ9Ik02NSwyOC40YzMuNjM5LDAsNi42LDIuOTYxLDYuNiw2LjZ2MzBjMCwzLjYzOS0yLjk2MSw2LjYtNi42LDYuNkgzNWMtMy42MzksMC02LjYtMi45NjEtNi42LTYuNlYzNSBjMC0zLjYzOSwyLjk2MS02LjYsNi42LTYuNkg2NSBNNjUsMjdIMzVjLTQuNDE4LDAtOCwzLjU4Mi04LDh2MzBjMCw0LjQxOCwzLjU4Miw4LDgsOGgzMGM0LjQxOCwwLDgtMy41ODIsOC04VjM1IEM3MywzMC41ODIsNjkuNDE4LDI3LDY1LDI3TDY1LDI3eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZGZjZWUiIGQ9Ik02Myw2OUgzN2MtMy4zMDksMC02LTIuNjkxLTYtNlYzN2MwLTMuMzA5LDIuNjkxLTYsNi02aDI2YzMuMzA5LDAsNiwyLjY5MSw2LDZ2MjYgQzY5LDY2LjMwOSw2Ni4zMDksNjksNjMsNjl6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzQ3MmIyOSIgZD0iTTYzIDY5SDM3Yy0zLjMwOSAwLTYtMi42OTEtNi02VjM3YzAtMy4zMDkgMi42OTEtNiA2LTZoMjQuNjI1QzYxLjgzMiAzMSA2MiAzMS4xNjggNjIgMzEuMzc1cy0uMTY4LjM3NS0uMzc1LjM3NUgzN2MtMi44OTUgMC01LjI1IDIuMzU1LTUuMjUgNS4yNXYyNmMwIDIuODk1IDIuMzU1IDUuMjUgNS4yNSA1LjI1aDI2YzIuODk1IDAgNS4yNS0yLjM1NSA1LjI1LTUuMjVWNDguMzc1YzAtLjIwNy4xNjgtLjM3NS4zNzUtLjM3NVM2OSA0OC4xNjggNjkgNDguMzc1VjYzQzY5IDY2LjMwOSA2Ni4zMDkgNjkgNjMgNjl6TTY4LjYyNSA0MmMtLjIwNyAwLS4zNzUtLjE2OC0uMzc1LS4zNzV2LTEuMjc4YzAtLjIwNy4xNjgtLjM3NS4zNzUtLjM3NVM2OSA0MC4xNCA2OSA0MC4zNDd2MS4yNzhDNjkgNDEuODMyIDY4LjgzMiA0MiA2OC42MjUgNDJ6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzQ3MmIyOSIgZD0iTTY4LjYyNSw0N2MtMC4yMDcsMC0wLjM3NS0wLjE2OC0wLjM3NS0wLjM3NXYtMy4yNWMwLTAuMjA3LDAuMTY4LTAuMzc1LDAuMzc1LTAuMzc1IFM2OSw0My4xNjgsNjksNDMuMzc1djMuMjVDNjksNDYuODMyLDY4LjgzMiw0Nyw2OC42MjUsNDd6Ij48L3BhdGg+PC9nPjxnPjxwYXRoIGZpbGw9IiNmMWJjMTkiIGQ9Ik01Ny42ODcsMzkuMzc2Yy0wLjQwMSwwLTAuNzUsMC4xMTktMSwwLjM2OEw0Mi4zMTEsNTQuMTMyYy0wLjQ2MywwLjQ2NS0xLjQzOCwzLjA0Mi0yLjE0OSw0LjkyMiBjLTAuMzIyLDAuODUxLTAuNTk3LDEuNTc0LTAuNzU3LDEuOTMzYy0wLjA1NiwwLjEyNS0wLjAzLDAuMjYxLDAuMDY2LDAuMzU4bDAuMTU1LDAuMTU1YzAuMTIyLDAuMTIzLDAuMzA1LDAuMTU5LDAuNDY4LDAuMDg2IGMwLjQxNy0wLjE4OCwxLjE4OC0wLjQ4MSwyLjA4My0wLjgyYzEuOTA3LTAuNzI0LDQuMjU2LTEuNjE1LDQuNzAyLTIuMDYxbDE0LjM3Ny0xNC4zOWMwLjc0My0wLjc0NCwwLjMyMy0yLjM3Ni0wLjkzNi0zLjYzNyBDNTkuNDgzLDM5Ljg0Miw1OC40ODIsMzkuMzc2LDU3LjY4NywzOS4zNzZ6Ij48L3BhdGg+PHBhdGggZmlsbD0iI2ZkZmNlZSIgZD0iTTQyLjMxMSw1NC4xMzJjLTAuNDYzLDAuNDY1LTEuNDM4LDMuMDQyLTIuMTQ5LDQuOTIyYy0wLjMyMiwwLjg1MS0wLjU5NywxLjU3NC0wLjc1NywxLjkzMyBjLTAuMDU2LDAuMTI1LTAuMDMsMC4yNjEsMC4wNjYsMC4zNThsMC4xNTUsMC4xNTVjMC4xMjIsMC4xMjMsMC4zMDUsMC4xNTksMC40NjgsMC4wODZjMC40MTctMC4xODgsMS4xODgtMC40ODEsMi4wODMtMC44MiBjMS45MDctMC43MjQsNC4yNTYtMS42MTUsNC43MDItMi4wNjFsMC4wMDMtMC4wMDNMNDIuMzExLDU0LjEzMnoiPjwvcGF0aD48cGF0aCBmaWxsPSIjNGE1Mzk3IiBkPSJNNDAuMTgxLDU5LjAwM2MtMC4wMDYsMC4wMTctMC4wMTMsMC4wMzUtMC4wMiwwLjA1MmMtMC4zMjIsMC44NTEtMC41OTcsMS41NzQtMC43NTcsMS45MzMgYy0wLjA1NiwwLjEyNS0wLjAzLDAuMjYxLDAuMDY2LDAuMzU4bDAuMTU1LDAuMTU1YzAuMTIyLDAuMTIzLDAuMzA1LDAuMTU5LDAuNDY4LDAuMDg2YzAuMzktMC4xNzYsMS4wOTUtMC40NDUsMS45MTYtMC43NTYgTDQwLjE4MSw1OS4wMDN6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzc3ODJhYyIgZD0iTTU1LjM4NSA0MS4wNDhINTguMTkzVjQ3LjVINTUuMzg1eiIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1LjAwMSA1Ni43ODggNDQuMjc1KSI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmY2I5YjkiIGQ9Ik02MC4wMzYsNDUuNTM2bDEuMjE5LTEuMjJjMC43NDMtMC43NDQsMC4zMjMtMi4zNzYtMC45MzYtMy42MzcgYy0wLjgzNi0wLjgzNy0xLjgzNy0xLjMwMy0yLjYzMi0xLjMwM2MtMC40MDEsMC0wLjc1LDAuMTE5LTEsMC4zNjhsLTEuMjIxLDEuMjIyTDYwLjAzNiw0NS41MzZ6Ij48L3BhdGg+PC9nPjxnPjxwYXRoIGZpbGw9IiM0NzJiMjkiIGQ9Ik01Ny42OSwzOS43NUw1Ny42OSwzOS43NWMwLjcyMiwwLDEuNjI4LDAuNDU4LDIuMzY0LDEuMTk0YzEuMjA4LDEuMjEsMS40NTksMi41ODMsMC45MzYsMy4xMDcgTDQ2LjYxMiw1OC40NDFjLTAuMzg5LDAuMzg5LTIuODkzLDEuMzM5LTQuNTUsMS45NjhsLTAuMDc1LDAuMDI4Yy0wLjg3NSwwLjMzMi0xLjYzLDAuNjE5LTIuMDk3LDAuNzk4bC0wLjEyOS0wLjEyOSBjMC4xNzMtMC4zOTQsMC40NTQtMS4xMzYsMC43NTEtMS45MmMwLjYyLTEuNjM5LDEuNjU4LTQuMzgyLDIuMDY0LTQuNzg5TDU2Ljk1Miw0MC4wMUM1Ny4xMjUsMzkuODM3LDU3LjM3MywzOS43NSw1Ny42OSwzOS43NSBNNTcuNjksMzljLTAuNTAxLDAtMC45NDQsMC4xNTUtMS4yNjgsMC40NzlMNDIuMDQ2LDUzLjg2N2MtMC40ODEsMC40ODItMS4yNjQsMi40ODYtMi4yMzUsNS4wNTQgYy0wLjMxOSwwLjg0Mi0wLjU5LDEuNTU4LTAuNzQ5LDEuOTEzYy0wLjExOSwwLjI2NS0wLjA2MywwLjU2OSwwLjE0MiwwLjc3NWwwLjE1NiwwLjE1NkMzOS41MTMsNjEuOTE5LDM5LjcxNSw2MiwzOS45MjEsNjIgYzAuMTEsMCwwLjIyMi0wLjAyNCwwLjMyNy0wLjA3MWMwLjQwOC0wLjE4NSwxLjE4My0wLjQ3OCwyLjA4LTAuODE5YzIuNTI1LTAuOTU4LDQuMzUtMS42NzMsNC44MTUtMi4xMzlsMTQuMzc4LTE0LjM4OSBjMC45MDUtMC45MDYsMC40OTQtMi43MzYtMC45MzYtNC4xNjdDNTkuNjY4LDM5LjQ5Nyw1OC41ODYsMzksNTcuNjksMzlMNTcuNjksMzl6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzQ3MmIyOSIgZD0iTTQ0LjM0NiA1My4xODZINDQuODQ2VjU5LjY1SDQ0LjM0NnoiIHRyYW5zZm9ybT0icm90YXRlKC00NS4wMDEgNDQuNTkgNTYuNDE2KSI+PC9wYXRoPjxwYXRoIGZpbGw9IiM0NzJiMjkiIGQ9Ik00MC44MzkgNTguNDk3SDQxLjMzOVY2MS4zMjVINDAuODM5eiIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1LjAwMSA0MS4wODggNTkuOTEyKSI+PC9wYXRoPjxwYXRoIGZpbGw9IiM0NzJiMjkiIGQ9Ik01NS41NDYgNDIuMDRINTYuMDQ2VjQ4LjQ5Mkg1NS41NDZ6IiB0cmFuc2Zvcm09InJvdGF0ZSgtNDUuMDAxIDU1Ljc5NiA0NS4yNjcpIj48L3BhdGg+PHBhdGggZmlsbD0iIzQ3MmIyOSIgZD0iTTU3LjUzMSA0MC4wNTVINTguMDMxVjQ2LjUwN0g1Ny41MzF6IiB0cmFuc2Zvcm09InJvdGF0ZSgtNDUuMDAxIDU3Ljc4MSA0My4yODIpIj48L3BhdGg+PHBhdGggZmlsbD0iIzQ3MmIyOSIgZD0iTTU0LjYxNSA0NC4wNDlMNTQuMzg1IDQzLjk1MSA1NS41MSA0MS4zMjYgNTUuNzQgNDEuNDI0ek01NS40OSA0NC43OTlMNTUuMjYgNDQuNzAxIDU2LjM4NSA0Mi4wNzYgNTYuNjE1IDQyLjE3NHpNNTYuMzY1IDQ1LjU0OUw1Ni4xMzUgNDUuNDUxIDU3LjI2IDQyLjgyNiA1Ny40OSA0Mi45MjR6TTU3LjE0NCA0Ni41MjJMNTYuOTE1IDQ2LjQyNCA1OC4xMzUgNDMuNTc2IDU4LjM2NSA0My42NzR6TTU3Ljk4MSA0Ny4zNjFMNTcuNzUxIDQ3LjI2MyA1OS4wMSA0NC4zMjYgNTkuMjQgNDQuNDI0eiI+PC9wYXRoPjwvZz4KPC9zdmc+"/>
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
          <p className="py-4 text-white">
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
              <label htmlFor="title" className="block text-sm font-medium mt-9 text-white">
                Title
              </label>
            <input className="w-full p-3 text-white rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
            <label
                htmlFor="content"
                className="block text-sm text-white font-medium mb-2"
              >
                Content
              </label>
            <textarea 
            value={editedContent} 
            onChange={(e) => setEditedContent(e.target.value)} 
            className="w-full p-3 text-white rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800" />
            <select value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} className="w-1/2 p-3 text-white rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800">
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
