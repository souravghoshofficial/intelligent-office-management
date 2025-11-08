import React from 'react';

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-200 to-blue-500">
      {/* Navbar */}
      <nav className="w-full p-4 bg-blue-700 text-white shadow-md sticky top-0">
        <h1 className="text-xl font-semibold">XYZ Company</h1>
      </nav>

      {/* Centered Login Card */}
      <div className="flex flex-1 justify-center items-center p-4">
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-xl w-full max-w-md p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center text-blue-700">Employee Login</h1>

          <div className="flex flex-col">
            <label htmlFor="empId" className="text-sm font-medium">Employee ID</label>
            <input 
              type="text" 
              id="empId" 
              placeholder="Enter ID"
              className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="empPass" className="text-sm font-medium">Password</label>
            <input 
              type="password" 
              id="empPass" 
              placeholder="Enter Password"
              className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-all duration-200">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
