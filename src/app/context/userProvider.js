"use client";
import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import { signIn, signOut } from 'next-auth/react';
import { SessionProvider } from "next-auth/react"


import { currentUser } from "../services/userServices";

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 
 

  useEffect(() => {

    async function load() {
      try {
        const tempUser = await currentUser();
        console.log(tempUser);
        setUser({ ...tempUser });
        setIsLoading(false);
      } catch (error) {
        console.log(error);

        setUser(undefined);
        setIsLoading(false);
      }
    }

         load();
      
    
  }, []);
  if (isLoading) {
    // You can return a loading indicator here
    return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
  }

  return (
    
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
   
  );
}

export default UserProvider;
