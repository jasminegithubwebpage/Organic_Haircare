import React, { useState } from 'react';

function Login(){
  const [isSuperAdmin, setIsSuperAdmin] = useState(true);

  const handleSwitch = (adminType) => {
    setIsSuperAdmin(adminType === 'superadmin');
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
          <h2 className="text-2xl font-semibold text-center mb-4">Sign in</h2>
          <p className="text-center mb-6 text-gray-600">Welcome Back! Let's Get Started</p>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 mx-2 text-white rounded ${
                isSuperAdmin ? 'bg-burgundy' : 'bg-gray-500'
              }`}
              onClick={() => handleSwitch('superadmin')}
            >
              Super Admin
            </button>
            <button
              className={`px-4 py-2 mx-2 text-white rounded ${
                !isSuperAdmin ? 'bg-burgundy' : 'bg-gray-500'
              }`}
              onClick={() => handleSwitch('admin')}
            >
              Admin
            </button>
          </div>

          {/* Login Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-burgundy focus:border-burgundy"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-burgundy focus:border-burgundy"
                placeholder="Enter password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-burgundy" />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              {/* <a href="#" className="text-sm text-burgundy hover:underline">
                Forgot Password?
              </a> */}
              <p>Forgot Password</p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-burgundy text-white text-sm font-medium rounded-md hover:bg-opacity-90"
              >
                Sign in as {isSuperAdmin ? 'Super Admin' : 'Admin'}
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              New Admin?{' '}
              {/* <a href="#" className="text-burgundy font-medium hover:underline">
                Sign up here
              </a> */}
              <p>Sign up here</p>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
