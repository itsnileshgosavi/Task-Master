"use client";
import React, { useEffect, useState } from "react";
import UserContext from "./userContext";

import { currentUser } from "../services/userServices";

function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    async function load() {
      try {
        const tempUser = await currentUser();
        console.log(tempUser);
        setUser({ ...tempUser });
      } catch (error) {
        console.log(error);

        setUser(undefined);
      }
    }

    setTimeout(() => {
         load();
       }, 0);
    
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
