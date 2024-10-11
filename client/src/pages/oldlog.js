import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isSuperAdmin, setIsSuperAdmin] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignUpComplete, setIsSignUpComplete] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  
  const handleSwitch = (role) => {
    setIsSignUpComplete(false); // Reset sign-up success state
    setIsSignUp(false); // Reset sign-up mode when switching roles
    if (role === 'superadmin') {
      setIsSuperAdmin(true);
      setIsUser(false);
    } else if (role === 'admin') {
      setIsSuperAdmin(false);
      setIsUser(false);
    } else if (role === 'user') {
      setIsSuperAdmin(false);
      setIsUser(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = isSignUp ? e.target.confirmPassword?.value : null;
    const email = isSignUp ? e.target.email?.value : null;

    console.log("1");
    
    const endpoint = isSignUp ? 'signup' : 'login';

    console.log("2"); 
    
    const requestBody = {
      username,
      password,
      ...(isSignUp && { email, confirmPassword }), // Only include email and confirmPassword if it's a signup
    };

    // console.log("3");

    const response = await fetch(`http://localhost:3002/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    
    // const response = await fetch(`http://localhost:3002/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(requestBody),
    // });
    

    console.log("4");

    if (response.ok) {
      const data = await response.json();
      if (isSignUp) {
        setIsSignUpComplete(true); // Sign-up success
        setIsSignUp(false); // Switch back to login mode after signup
      } else {
        if (data.role === 'superadmin') {
          navigate('/superadmin-dashboard');
        } else if (data.role === 'admin') {
          navigate('/dashboard');
        } else if (data.role === 'user') {
          navigate('/products');
        }
      }
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/assets/images/backgrounds/b (14).webp"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center w-full lg:w-1/2 px-6 py-12 bg-beige">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-4">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h2>
          <p className="text-center mb-6 text-gray-600">
            {isSignUp
              ? 'Create your account'
              : isSignUpComplete
              ? 'Sign-Up Complete! Please Sign In.'
              : "Welcome Back! Let's Get Started"}
          </p>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 mx-2 text-white rounded ${isSuperAdmin ? 'bg-burgundy' : 'bg-gray-500'}`}
              onClick={() => handleSwitch('superadmin')}
            >
              Super Admin
            </button>
            <button
              className={`px-4 py-2 mx-2 text-white rounded ${!isSuperAdmin && !isUser ? 'bg-burgundy' : 'bg-gray-500'}`}
              onClick={() => handleSwitch('admin')}
            >
              Admin
            </button>
            <button
              className={`px-4 py-2 mx-2 text-white rounded ${isUser ? 'bg-burgundy' : 'bg-gray-500'}`}
              onClick={() => handleSwitch('user')}
            >
              User
            </button>
          </div>

          {/* Login/Signup Form */}
          {!isSignUpComplete ? (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
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
                  {isSignUp ? 'Sign Up as User' : `Sign in as ${isSuperAdmin ? 'Super Admin' : isUser ? 'User' : 'Admin'}`}
                </button>
              </div>

              {isUser && !isSignUp && (
                <p className="text-center text-sm text-gray-600 mt-6">
                  New User?{' '}
                  <span className="text-burgundy cursor-pointer" onClick={() => setIsSignUp(true)}>
                    Sign up here
                  </span>
                </p>
              )}
            </form>
          ) : (
            <div className="text-center">
              <p className="text-gray-600">
                Sign-up complete! You can now{' '}
                <span className="text-burgundy cursor-pointer" onClick={() => setIsSignUp(false)}>
                  Sign in here
                </span>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
