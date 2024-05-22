"use client";

import React from "react";
import { useSession } from "next-auth/react";

export default async function UserPage() {
  const { data: session, status } = useSession(); 
  const userName = session?.user.name || "guest";
  const email = session?.user.email;
  const picture_url = session?.user?.image || 'https://pixabay.com/get/g2aadaf8af0a4fa0574310815022ca95275b255289a8ac823f8dd29ab3d9b0265c1341de79d757ff114988a8aadbdd1de1e7b4048cf16b1fb77fa630e8a3d7aa96ce89506fe437fb67c4f8511de745fe5_640.png';


  return (
    <div className="mx-auto p-6 rounded-md bg-slate-500 shadow-lg h-fit flex flex-col items-center justify-center py-16 px-10 m-5 w-fit">
      
      
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
          <img src={picture_url} />
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold mb-4 my-5">{userName}</h1>
      </div>
      <div className="flex justify-center">
        <h2> {email}</h2>
      </div>
      <button className="p-3 btn btn-accent rounded-md mt-5">Edit Profile</button>
    </div>
  );
}
