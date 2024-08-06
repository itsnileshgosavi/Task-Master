"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Loading from "@/app/loading/loading";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Profile() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({});
  const router = useRouter();  
  const userName = session?.user.name || user.name;
  const email = session?.user.email;
  const [profilePicture, setProfilePicture] = useState('../profile.png');
  const [newName, setNewName] = useState(userName);
  const [about, setNewAbout] = useState("");
  const [newEmail, setNewEmail] = useState(email);
 
  useEffect(() => {
    setProfilePicture(session?.user.image);
  }, [session, status]);

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
  
  }, []);
 

  const saveEditedUserData = async (e) => {
    try {
      e.preventDefault();
      const stringified = JSON.stringify({
        name: newName,
        email: newEmail,
        about: about,
        profile_picture: profilePicture,
      });
      console.log(stringified);
      const response = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: stringified,
      });
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }finally{
      document.getElementById("editUserModal").close();
    }
  };
  const handleDelete =async() => {
    const res = await fetch(`/api/users/${user._id}`, {
      method: "DELETE",
    })
    if(res.ok){
      toast.success("user account deleted permanently")
      await signOut();
    }else{
      toast.error("failed to delete user")
    }
  }

  const handleVerifyClick=async() => {
    try {
      const res = await fetch('/api/resend/send-welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      })
      if (res.status === 200) {
        toast.success('Verification code sent!')
        router.push("/verify")
      }else if(res.status === 400){
        router.push("/verify")
      }  else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }



  return (
    <div className="h-screen w-screen bg-white">
         <div className="mx-auto rounded-md bg-white text-black overflow-hidden shadow-lg h-[400px] flex flex-col items-center justify-center my-20 w-fit">
      <div className="transition-all h-full duration-500 hover:shadow-sm hover:cursor-pointer hover:bg-accent hover:rounded-lg group">
          <div className="h-full w-full transition-all p-10  duration-500 opacity-100 rounded-lg flex justify-center items-center flex-col group-hover:opacity-0 group-hover:h-0">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                  <img src={profilePicture} alt="Profile" />
                </div>
              </div>
              <div className="flex justify-center">
                <h1 className="text-2xl font-bold mb-4 my-5">{userName}</h1>
              </div>
              <div className="flex justify-center">
                <h2>{email} {session?.user.isVerified ? <span className="badge badge-success">✔</span> : <span className="badge badge-error">Not Verified</span>}</h2>
              </div>
          </div>
          <div className="h-0 w-full opacity-0 p-10 rounded-lg transition-all duration-500 text-[0px] rotate-[90] scale-[-1] flex flex-col justify-start space-y-2 group-hover:opacity-100 group-hover:h-full group-hover:rotate-180 group-hover:text-3xl">
            {!session?.user.isVerified && <button className="p-3 btn btn-outline rounded-md mt-5" onClick={() =>{handleVerifyClick()}}>Verify Email</button>}
            <button className="p-3 btn btn-outline rounded-md mt-5" onClick={() => document.getElementById('editUserModal').showModal()}>Edit Profile</button>
            <button className="btn btn-neutral my-3" onClick={()=>{router.push("/reset-password")}}>Change Password</button>
            <button className="btn btn-warning mx-3"onClick={()=>document.getElementById('deleteusermodal').showModal()}>Delete Profile</button>
          </div>
      </div>
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
            <button onClick={(e)=>{e.preventDefault(); document.getElementById('editUserModal').close()}} className="btn">Cancel</button>
            <button className="btn btn-info m-2" onClick={saveEditedUserData}>Save Changes</button>
          </form>
        </div>
      </dialog>
      <dialog id="deleteusermodal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-600">Warning !!</h3>
          <p className="py-4 text-white">
            This action cannot be undone. Are you sure you want to Delete this account?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mx-4">NO</button>
              <button className="btn btn-warning" onClick={()=>handleDelete()}>YES</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
    </div>
  );
}
