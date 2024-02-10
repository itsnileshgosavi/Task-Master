import React from "react";
import AddTask from "@/components/sidebarAddTask";
import ShowTasks from "@/components/showTask";

export const metadata = {
  title: "Home : Task Manager",
  description: "View or add your tasks here",
};

const Home = () => {
  return (
    <>
    <div className="hero min-h-screen">
    <div className="max-w-full grid grid-rows-2 md:grid-cols-2">
      <div className="h-full">
        <AddTask />
      </div>
      <div className="h-full">
        <ShowTasks />
      </div>
    </div>
    
  </div>
  
    </>
    
  );
};

export default Home;
