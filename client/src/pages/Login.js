import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Import the useUser hook

function Login() {
  const { setCurrentUser } = useUser(); // Access setCurrentUser from UserContext
  const [isSuperAdmin, setIsSuperAdmin] = useState(true); // Default role
  const [isUser, setIsUser] = useState(false); // Set false for non-user roles
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign-up and login
  const [isSignUpComplete, setIsSignUpComplete] = useState(false); // Track sign-up success
  const navigate = useNavigate();

  const handleSwitch = (role) => {
    setIsSignUpComplete(false); // Reset sign-up success state
    setIsSignUp(false); // Reset sign-up mode when switching roles
    if (role === "superadmin") {
      setIsSuperAdmin(true);
      setIsUser(false);
    } else if (role === "admin") {
      setIsSuperAdmin(false);
      setIsUser(false);
    } else if (role === "user") {
      setIsSuperAdmin(false);
      setIsUser(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const requestBody = {
      username: e.target.username.value,
      password: e.target.password.value,
      role: isSuperAdmin ? "superadmin" : isUser ? "user" : "admin",
    };

    if (isSignUp) {
      requestBody.email = e.target.email?.value;
      requestBody.confirmPassword = e.target["confirmPassword"].value;
    }

    const endpoint = isSignUp ? "signup" : "login";
    const response = await fetch(`http://localhost:3002/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      if (isSignUp) {
        setIsSignUpComplete(true);
        setIsSignUp(false);
      } else {
        setCurrentUser(requestBody.username);
        navigate(data.redirectUrl);
      }
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/assets/images/backgrounds/b (14).webp"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>

      <div className="flex items-center justify-center w-full lg:w-1/2 px-6 py-12 bg-beige">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-4">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>
          <p className="text-center mb-6 text-gray-600">
            {isSignUp
              ? "Create your account"
              : isSignUpComplete
              ? "Sign-Up Complete! Please Sign In."
              : "Welcome Back! Let's Get Started"}
          </p>

          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 mx-2 text-white rounded ${
                isSuperAdmin ? "bg-burgundy" : "bg-gray-500"
              }`}
              onClick={() => handleSwitch("superadmin")}
            >
              Super Admin
            </button>
            <button
              className={`px-4 py-2 mx-2 text-white rounded ${
                !isSuperAdmin && !isUser ? "bg-burgundy" : "bg-gray-500"
              }`}
              onClick={() => handleSwitch("admin")}
            >
              Admin
            </button>
            <button
              className={`px-4 py-2 mx-2 text-white rounded ${
                isUser ? "bg-burgundy" : "bg-gray-500"
              }`}
              onClick={() => handleSwitch("user")}
            >
              User
            </button>
          </div>

          {!isSignUpComplete ? (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-burgundy focus:border-burgundy"
                  placeholder="Enter username"
                  required
                />
              </div>

              {isUser && isSignUp && (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-burgundy focus:border-burgundy"
                    placeholder="Enter email"
                    required
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-burgundy focus:border-burgundy"
                  placeholder="Enter password"
                  required
                />
              </div>

              {isSignUp && (
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirmPassword"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-burgundy focus:border-burgundy"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-burgundy text-white text-sm font-medium rounded-md hover:bg-opacity-90"
                >
                  {isSignUp
                    ? "Sign Up as User"
                    : `Sign in as ${
                        isSuperAdmin ? "Super Admin" : isUser ? "User" : "Admin"
                      }`}
                </button>
              </div>

              {isUser && !isSignUp && (
                <p className="text-center text-sm text-gray-600 mt-6">
                  New User?{" "}
                  <span
                    className="text-burgundy cursor-pointer"
                    onClick={() => setIsSignUp(true)}
                  >
                    Sign up here
                  </span>
                </p>
              )}

              <p className="text-center text-sm text-gray-600 mt-4">
                Forgot your password?{" "}
                <span
                  className="text-burgundy cursor-pointer"
                  onClick={() => navigate("/reset")}
                >
                  Reset it here
                </span>
              </p>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-gray-600">
                Sign-up complete! You can now{" "}
                <span
                  className="text-burgundy cursor-pointer"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign in here
                </span>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
