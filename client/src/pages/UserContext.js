// UserContext.js
import React, { createContext, useContext, useState } from "react";

// Create a context for the user
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Default is no user

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
