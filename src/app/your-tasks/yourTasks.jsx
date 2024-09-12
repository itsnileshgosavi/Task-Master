"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TaskList from "@/components/TaskList";

const YourTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filteredtasks, setFilteredTasks] = useState([]);
 

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

  // Function to filter tasks
  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      if (filter === "all") return true;
      return task.status === filter;
    });
    setFilteredTasks(filteredTasks);
  }, [filter, tasks]);
  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="flex flex-col items-center pt-10 min-h-screen bg-slate-100 dark:bg-base-200 -z-50">
        <div className="flex flex-col ">
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
        <TaskList filteredTasks={filteredtasks} getTasks={getTasks}  />
        
    </div>
  );
};

export default YourTasks;
