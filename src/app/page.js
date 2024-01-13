import React from "react";
import AddTask from "@/components/sidebarAddTask";
import ShowTasks from "@/components/showTask";

export const metadata = {
  title: 'Home : Task Manager',
  description: 'View or add your tasks here',
}

const Home = () => {
  return (
    <div className="flex">
      <div className="flex">
        <AddTask />
      </div>

      <div className="flex-grow max-w-screen-md mx-auto p-6 shadow-lg">
        <ShowTasks />
      </div>
    </div>
  );
};

export default Home;
