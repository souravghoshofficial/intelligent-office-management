import React from "react";

function UpdatePassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-8 transition-transform hover:scale-[1.01] space-y-6">
        <h1 className="text-2xl font-semibold text-center text-blue-700 border-b pb-2">
          🔒 Update Password
        </h1>

        <div className="flex flex-col space-y-4">
          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-700 font-medium mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label
              htmlFor="cpassword"
              className="text-gray-700 font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              placeholder="Confirm password"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
