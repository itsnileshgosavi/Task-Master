"use client";

import React, { useContext } from "react";
import UserContext from "@/app/context/userContext";


export default function UserPage() {
  const context = useContext(UserContext);
  const userName = context.user?.name || "Unknown";
  const userAbout = context.user?.about;
  const user_id = context.user?._id;
  const regDate = context.user?.createDate;
  const email = context.user?.email;
  const picture_url = context.user?.profile_picture;

  return (
    <div className=" max-w-screen-md mx-auto p-6 border rounded shadow-lg h-screen">
      {/* <div className="flex justify-center">
        <img
          className="flex justify-center mt-4 max-w-full h-auto rounded"
          src={
            picture_url
              ? picture_url
              : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="profile"
        />
      </div> */}
      
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold mb-4">Name: {userName}</h1>
      </div>
      <div className="flex justify-center">
        <h2>Email: {email}</h2>
      </div>
      <div className="flex justify-center">
        <h2>Registered On: {regDate}</h2>
      </div>
      <div className="flex justify-center">
        <h2>About: {userAbout}</h2>
      </div>
      <div className="flex justify-center">
        <h2>ID: {user_id}</h2>
      </div>
    </div>
  );
}
