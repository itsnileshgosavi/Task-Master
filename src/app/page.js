
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/auth";
import Link from "next/link";


export const metadata = {
  title: "Home : Task Manager",
  description: "View or add your tasks here",
};

const Home = async () => {
  const session =await getServerSession(options);
  
  return (
    <>
       <main className="h-screen">
      <section className="flex justify-center flex-col text-center items-center h-full">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-purple-500 p-5">Welcome to TaskMaster - Your Ultimate Productivity Companion!</h1>
        <p className="text-blue-700 p-5 md:text-2xl">Unlock the full potential of your day with TaskMaster, the innovative task manager designed to help you organize, prioritize, and achieve your goals effortlessly. Whether you’re managing work projects, personal errands, or planning your future aspirations, TaskMaster is here to streamline your to-do list and keep you on track.</p>
        <Link href="/signup"><button className="btn w-36 mx-auto bg-gradient-to-r from-primary to-secondary">Get Started Today!</button> </Link>
        <p className="p-1 mt-5 text-secondary md:text-xl">Join the community of productive individuals who are taking control of their time with TaskMaster. Sign up now and start your journey to a more organized and efficient life. With TaskMaster, your goals are within reach!</p>
      </section>
    </main>
  
    </>
    
  );
};

export default Home;
