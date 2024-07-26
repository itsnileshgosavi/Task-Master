
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/auth";
import Link from "next/link";


export const metadata = {
  title: "Task Master : Home",
  description: "View or add your tasks here",
};

const Home = async () => {
  const session =await getServerSession(options);
  
  return (
    <>
    
    <main className="min-h-screen bg-white flex md:flex-row flex-col items-center">
      <section className="flex justify-center flex-col text-center items-start h-full w-1/2 pl-0 md:pl-20 order-2">
         <h1 className="text-2xl md:text-3xl lg:text-4xl text-black font-extrabold font-roboto">Make Organising Fun!</h1>
         <h2 className="text-sm md:text-md lg:text-lg text-start text-black mt-10">Unlock the full potential of your day with Task Master, the innovative task manager designed to help you organize, prioritize, and achieve your goals effortlessly. Whether you’re managing work projects, personal errands, or planning your future aspirations, Task Master is here to streamline your to-do list and keep you on track.</h2>
         <Link href="/signup"><button className="btn shadow-lg hover:scale-110 w-36 mx-auto mb-10 btn-primary mt-10">Get Started!</button> </Link>
      </section>
      <div className="flex justify-center items-center w-1/2 order-1">
        <img className="md:w-[500px] md:h-[500px] w-60 h-60" src="/hero.png" alt="hero image" border="0" />
      </div>
    </main>
  
    </>
    
  );
};

export default Home;


