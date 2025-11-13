import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ApplicationForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { leave_id } = location.state || {};
  const [leaveDetails, setLeaveDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      if (!leave_id) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/leaves/${leave_id}`,
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setLeaveDetails(response.data.leave);
        }
      } catch (error) {
        console.error("Error fetching leave details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveDetails();
  }, [leave_id]);

  const approveLeave = async (id) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/admin/leaves/${id}/approve`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Leave approved successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error approving leave:", error);
      alert("An error occurred while approving leave.");
    } finally {
      setLoading(false);
    }
  };

  const rejectLeave = async (id) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/admin/leaves/${id}/reject`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Leave rejected successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error rejecting leave:", error);
      alert("An error occurred while rejecting leave.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!leaveDetails) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        No leave details found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 transition-transform hover:scale-[1.01]">
        <h1 className="text-2xl font-semibold text-center text-blue-700 border-b pb-2">
          📝 Leave Application
        </h1>

        {/* Employee Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-medium">Employee Name:</p>
            <p className="text-gray-600">{leaveDetails.employee_name}</p>
          </div>
          <div>
            <p className="font-medium">Employee Email:</p>
            <p className="text-gray-600">{leaveDetails.employee_email}</p>
          </div>
          <div>
            <p className="font-medium">Leave Starts From:</p>
            <p className="text-gray-600">{leaveDetails.start_date}</p>
          </div>
          <div>
            <p className="font-medium">Ends On:</p>
            <p className="text-gray-600">{leaveDetails.end_date}</p>
          </div>
        </div>

        {/* Reason */}
        <div>
          <p className="font-medium text-gray-700">Leave Type:</p>
          <p className="text-gray-600 italic">{leaveDetails.leave_type}</p>
        </div>

        {/* Description */}
        <div>
          <p className="font-medium text-gray-700 mb-1">Application:</p>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-gray-700">
            {leaveDetails.description}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            className="px-5 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md"
            onClick={() => approveLeave(leaveDetails.id)}
          >
            Approve
          </button>
          <button
            className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
            onClick={() => rejectLeave(leaveDetails.id)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationForm;
