import axios from "axios";
import React, { useState } from "react";

function ApplyLeave() {
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    leave_type: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/apply-for-leave",
        form,
        { withCredentials: true }
      );
      if (response.status === 201) {
        alert("Leave applied successfully");
      } else {
        alert("Failed to apply for leave. Please try again.");
      }
    } catch (error) {
      console.error("Apply Leave Error:", error);
      alert(error.response?.data?.error || "An error occurred while applying for leave.");
    } finally {
      setIsLoading(false);
    }
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8 transition-transform hover:scale-[1.01]">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          📝 Leave Management
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="start_date"
                className="font-semibold text-gray-700 mb-1"
              >
                Leave Start Date
              </label>
              <input
                type="date"
                id="start_date"
                value={form.start_date}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="end_date"
                className="font-semibold text-gray-700 mb-1"
              >
                Leave End Date
              </label>
              <input
                type="date"
                id="end_date"
                value={form.end_date}
                onChange={handleChange}
                min={form.start_date}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="leave_type"
              className="font-semibold text-gray-700 mb-1"
            >
              Type of Leave
            </label>
            <input
              type="text"
              id="leave_type"
              value={form.leave_type}
              onChange={handleChange}
              placeholder="Enter type of leave (e.g. Sick Leave, Casual Leave)"
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="font-semibold text-gray-700 mb-1"
            >
              Application Letter
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write your leave application here..."
              rows="5"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              required
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 disabled:opacity-70"
            >
              {isLoading ? "Submitting..." : "Apply Leave"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyLeave;
