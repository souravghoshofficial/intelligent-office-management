import React from "react";

function ApplicationForm() {
  const leave = {
    id: "EMP123",
    name: "Subhra Shaw",
    start: "10/02/2026",
    duration: 4,
    reason: "Illness",
    description: "I am ill so I cannot go to the office for 2 days.",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 transition-transform hover:scale-[1.01]">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-center text-blue-700 border-b pb-2">
          📝 Leave Application
        </h1>

        {/* Employee Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-medium">Employee ID:</p>
            <p className="text-gray-600">{leave.id}</p>
          </div>
          <div>
            <p className="font-medium">Employee Name:</p>
            <p className="text-gray-600">{leave.name}</p>
          </div>
          <div>
            <p className="font-medium">Leave Starts From:</p>
            <p className="text-gray-600">{leave.start}</p>
          </div>
          <div>
            <p className="font-medium">Duration (Days):</p>
            <p className="text-gray-600">{leave.duration}</p>
          </div>
        </div>

        {/* Reason */}
        <div>
          <p className="font-medium text-gray-700">Reason for Leave:</p>
          <p className="text-gray-600 italic">{leave.reason}</p>
        </div>

        {/* Application Description */}
        <div>
          <p className="font-medium text-gray-700 mb-1">Application:</p>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-gray-700">
            {leave.description}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <button className="px-5 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md">
            Approve
          </button>
          <button className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationForm;
