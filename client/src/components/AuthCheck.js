// src/components/AuthCheck.js
import React from "react";
import { useNavigate } from "react-router-dom";

const AuthCheck = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn"); // Adjust based on how you store auth status

  React.useEffect(() => {
    if (isLoggedIn !== "true") {
      alert("Please log in to access this page.");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return null; // This component does not render anything
};

export default AuthCheck;
