// UserContext.js
import { createContext, useContext, useState } from "react";

// Create the context
const UserContext = createContext();

// UserProvider component to wrap around children components
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // State to hold current user

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  
  // Ensure context is used within the provider
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
