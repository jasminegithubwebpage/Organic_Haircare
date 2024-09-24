import React from "react";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-full w-full bg-beige-100">
      <div className="flex w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-1/2 h-full p-10 rounded-2xl">
          <img
            src="/assets/images/backgrounds/b (14).webp"
            alt="background"
            className="rounded-2xl h-full"
          />
          <div
            className="w-1/2 bg-cover absolute top-14 left-14 bg-center"
            style={{ backgroundImage: "url(/path-to-your-image)" }}
          >
            <button className="bg-m100 flex flex-row px-3 py-1 rounded-2xl">
              <img src="/assets/images/specials/arrow-left.png" alt="back" />
              <p className="text-m500">Back to Website</p>
            </button>
          </div>
        </div>

        {/* Login Section */}

        <div className="bg-m500 w-1/2 m-10 p-10 flex flex-col align-center justify-center rounded-2xl">
          <h1 className="text-3xl font-semibold text-white mb-6 text-center">
            Login
          </h1>
          <p className="text-sm text-white mb-6 text-center">
            Welcome Back! Let's Get Started
          </p>

          <form className="bg-white rounded-2xl p-10">
            <div className="mb-4">
              <label
                className="block text-m500 text-sm font-medium mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-2 border border-n300 rounded-xl focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter username"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-m500 text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border border-n300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter password"
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <label className="inline-flex items-center text-n400">
                <input type="checkbox" className="form-checkbox border border-n100" />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-sm text-n400 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-m500 text-white font-semibold py-2 rounded-lg hover:bg-maroon-800 transition-colors"
            >
              Login
            </button>

            <div className="my-4 text-n400 text-center">Or Login Using</div>

            <div className="flex justify-between mb-4 gap-4">
              <button className="flex items-center justify-center w-1/3 bg-white text-n400 rounded-2xl py-2 border border-n300 gap-2">
                <img
                  src="/assets/images/specials/google.png"
                  alt="Google"
                  className="w-6 h-6"
                />
                <p>Google</p>
              </button>
              <button className="flex items-center justify-center w-1/3 bg-white text-n400 rounded-2xl py-2 border border-n300 gap-2">
                <img
                  src="/assets/images/specials/apple.png"
                  alt="Apple"
                  className="w-6 h-6"
                />
                <p>Apple</p>
              </button>
              <button className="flex items-center justify-center w-1/3 bg-white text-n400 rounded-2xl py-2 border border-n300 gap-2">
                <img
                  src="/assets/images/specials/facebook.png"
                  alt="Facebook"
                  className="w-6 h-6"
                />
                <p>Facebook</p>
              </button>
            </div>

            <p className="text-center text-white">
              New Admin?{" "}
              <a href="#" className="underline">
                Sign up here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
