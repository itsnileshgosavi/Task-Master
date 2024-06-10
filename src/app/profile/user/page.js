"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Loading from "@/app/loading/loading";

export default function UserPage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({});
  
  const userName = session?.user.name || user.name;
  const email = session?.user.email;
  let picture_url;
  if (session) {
    picture_url = session?.user.image || `https://ui-avatars.com/api/?name=${userName}&background=random&bold=true`;
  }else{
    picture_url = "../profile.png"
  }
  
  const [newName, setNewName] = useState(userName);
  const [about, setNewAbout] = useState("");
  const [newEmail, setNewEmail] = useState(email);
  const [profilePicture, setProfilePicture] = useState(picture_url);
 

  useEffect(() => {
    const getCurrentUserData = async () => {
      try {
        const response = await fetch('/api/current-user');
        const data = await response.json();
        setUser(data);
        setNewAbout(data.about || "");
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    getCurrentUserData();
    console.log(user);
  }, []);

  const saveEditedUserData = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          about: about,
          profile_picture: profilePicture
        }),
      });
      if (response.ok) {
        toast.success("Profile updated successfully");
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };



  return (
    <div className="mx-auto p-6 rounded-md bg-slate-500 shadow-lg h-fit flex flex-col items-center justify-center py-16 px-10 m-5 w-fit">
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
          <img src={profilePicture} alt="Profile" />
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold mb-4 my-5">{userName}</h1>
      </div>
      <div className="flex justify-center">
        <h2>{email}</h2>
      </div>
      <button className="p-3 btn btn-accent rounded-md mt-5" onClick={() => document.getElementById('editUserModal').showModal()}>Edit Profile</button>
      <dialog id="editUserModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-green-600">Edit Profile</h3>
          <div className="flex flex-col space-y-4 items-center justify-center">
            <label htmlFor="name" className="block text-sm font-medium mt-9 text-white">Name</label>
            <input className="w-full p-3 text-white rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800" value={newName} onChange={(e) => setNewName(e.target.value)} />

            <label htmlFor="email" className="block text-sm text-white font-medium mb-2">Email</label>
            <input className="w-full p-3 text-white rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />

            <label htmlFor="about" className="block text-sm font-medium mt-9 text-white">About</label>
            <textarea className="w-full p-3 text-white rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800" value={about} onChange={(e) => setNewAbout(e.target.value)} />

            <label htmlFor="profilePicture" className="block text-sm text-white font-medium mb-2">Profile Picture URL</label>
            <input className="w-full p-3 text-white rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
          </div>
          <form className="modal-action">
            <button className="btn" >Cancel</button>
            <button className="btn btn-info m-2" onClick={saveEditedUserData}>Save Changes</button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
