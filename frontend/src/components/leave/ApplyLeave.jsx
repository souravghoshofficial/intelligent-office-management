import React, { useState } from "react";

function ApplyLeave() {
  const [form, setForm] = useState({
    startDate: "",
    duration: "",
    reason: "",
    application: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Leave Application Submitted Successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8 transition-transform hover:scale-[1.01]">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          📝 Leave Application
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {/* Leave Dates & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="startDate"
                className="font-semibold text-gray-700 mb-1"
              >
                Leave Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="duration"
                className="font-semibold text-gray-700 mb-1"
              >
                Duration (in days)
              </label>
              <input
                type="number"
                id="duration"
                value={form.duration}
                onChange={handleChange}
                onWheel={(e) => e.target.blur()}
                placeholder="Enter Duration"
                min="1"
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
          </div>

          {/* Reason */}
          <div className="flex flex-col">
            <label
              htmlFor="reason"
              className="font-semibold text-gray-700 mb-1"
            >
              Reason for Leave
            </label>
            <input
              type="text"
              id="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Enter reason for leave"
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Application Text */}
          <div className="flex flex-col">
            <label
              htmlFor="application"
              className="font-semibold text-gray-700 mb-1"
            >
              Application Letter
            </label>
            <textarea
              id="application"
              value={form.application}
              onChange={handleChange}
              placeholder="Write your leave application here..."
              rows="5"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            >
              Apply Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyLeave;
