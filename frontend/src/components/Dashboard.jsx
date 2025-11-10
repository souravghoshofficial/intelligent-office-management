import React, { useState, useEffect } from "react";
import { FaHome, FaUsers } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authInfo);
  const [current, setCurrent] = useState("Home");
  const [showSidebar, setShowSidebar] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const employees = [
    { id: "EMP123", name: "Subhra Shaw", email: "shawsubhra073@gmail.com" },
    { id: "EMP124", name: "Sourav Ghosh", email: "souravghose213@gmail.com" },
    { id: "EMP125", name: "Tapobrata Sardar", email: "tapobrata123@gmail.com" },
  ];

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setIsLoading(true);
        let response;
        if (user.role === "admin") {
          response = await axios.get("http://localhost:5000/api/admin/leaves", {
            withCredentials: true,
          });
        } else {
          response = await axios.get(
            "http://localhost:5000/api/employee/get-my-leaves",
            { withCredentials: true }
          );
        }
        if (response.status === 200) {
          console.log(response.data.leaves);
          
          setLeaves(response.data.leaves || []);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user?.role) fetchLeaves();
  }, [user]);

  const renderContent = () => {
    switch (current) {
      case "Home":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-blue-700">
              🏠 Dashboard Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md hover:scale-[1.03] transition cursor-pointer">
                <h3 className="text-lg font-semibold">Total Employees</h3>
                <p className="text-3xl font-bold">10</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-md hover:scale-[1.03] transition cursor-pointer">
                <h3 className="text-lg font-semibold">Departments</h3>
                <p className="text-3xl font-bold">2</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                🗓 Leave Summary
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-white shadow-md border-l-4 border-blue-500">
                  <p className="text-gray-600">Leave Applied</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
                <div className="p-4 rounded-lg bg-white shadow-md border-l-4 border-green-500">
                  <p className="text-gray-600">Leave Approved</p>
                  <h3 className="text-2xl font-bold">8</h3>
                </div>
                <div className="p-4 rounded-lg bg-white shadow-md border-l-4 border-yellow-500">
                  <p className="text-gray-600">Leave Pending</p>
                  <h3 className="text-2xl font-bold">3</h3>
                </div>
                <div className="p-4 rounded-lg bg-white shadow-md border-l-4 border-red-500">
                  <p className="text-gray-600">Leave Rejected</p>
                  <h3 className="text-2xl font-bold">1</h3>
                </div>
              </div>
            </div>
          </div>
        );

      case "Employees":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-blue-700">
              👥 Employee Management
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition font-medium"
                onClick={() => navigate("/createEmployee")}
              >
                ➕ Add Employee
              </button>
            </div>
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3 text-center">#</th>
                    <th className="p-3 text-center">Employee ID</th>
                    <th className="p-3 text-center">Employee Name</th>
                    <th className="p-3 text-center">Email</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, idx) => (
                    <tr
                      key={idx}
                      className="border-b hover:bg-blue-50 transition"
                    >
                      <td className="p-3 text-center">{idx + 1}</td>
                      <td className="p-3 text-center font-semibold text-gray-700">
                        {employee.id}
                      </td>
                      <td className="p-3 text-center">{employee.name}</td>
                      <td className="p-3 text-center">{employee.email}</td>
                      <td className="p-3 text-center">
                        <button className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-100 transition">
                          <MdDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-4">
              {employees.map((employee, idx) => (
                <div
                  key={idx}
                  className="border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition text-center"
                >
                  <p className="font-bold text-lg">{employee.name}</p>
                  <p className="text-sm text-gray-500">{employee.email}</p>
                  <p className="text-sm text-gray-700 font-medium">
                    ID: {employee.id}
                  </p>
                  <button className="mt-3 bg-red-500 text-white px-4 py-1 rounded-md inline-flex items-center gap-2 justify-center hover:bg-red-600">
                    <MdDelete /> Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "Leave":
        return (
          <div className="space-y-6 p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <h2 className="text-3xl font-bold text-center md:text-left text-blue-700">
                🗓 Leave Management
              </h2>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-300 w-full md:w-auto"
                onClick={() => navigate("/applyLeave")}
              >
                ➕ Apply for Leave
              </button>
            </div>
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3 text-center">#</th>
                    <th className="p-3 text-center">Leave Type</th>
                    <th className="p-3 text-center">Start Date</th>
                    <th className="p-3 text-center">End Date</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-center">Application</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave, idx) => (
                    <tr
                      key={idx}
                      className="border-b hover:bg-blue-50 transition-all duration-200"
                    >
                      <td className="p-3 text-center">{idx + 1}</td>
                      <td className="p-3 text-center">{leave.leave_type}</td>
                      <td className="p-3 text-center font-medium text-gray-700">
                        {leave.start_date}
                      </td>
                      <td className="p-3 text-center text-gray-600">
                        {leave.end_date}
                      </td>
                      <td
                        className={`p-3 text-center font-semibold ${
                          leave.status === "Approved"
                            ? "text-green-600"
                            : leave.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {leave.status}
                      </td>
                      
                      <td className="p-3 text-center">
                        <button
                          className="bg-blue-600 text-white px-4 py-1 rounded-md shadow-md hover:bg-blue-700 transition"
                          onClick={() => navigate("/applicationForm")}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-4">
              {leaves.map((leave, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg text-blue-700">
                      {leave.name}
                    </h3>
                    <span
                      className={`text-sm font-semibold ${
                        leave.status === "Approved"
                          ? "text-green-600"
                          : leave.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{leave.email}</p>
                  <p className="mt-2 text-gray-700 font-medium">
                    Type: {leave.leave_type}
                  </p>
                  <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    View Application
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "Settings":
        return (
          <div className="flex flex-col items-center justify-center space-y-8 p-6">
            <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
              ⚙️ System Settings
            </h2>
            <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-200 transition-all hover:shadow-2xl">
              <div className="space-y-4 text-gray-800">
                <div className="flex flex-col sm:flex-row justify-between border-b pb-2">
                  <span className="font-semibold text-gray-600">
                    Employee ID:
                  </span>
                  <span className="text-gray-900">{employees[0].id}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between border-b pb-2">
                  <span className="font-semibold text-gray-600">
                    Employee Name:
                  </span>
                  <span className="text-gray-900">{employees[0].name}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between border-b pb-2">
                  <span className="font-semibold text-gray-600">Email:</span>
                  <span className="text-gray-900">{employees[0].email}</span>
                </div>
              </div>
              <div className="text-center mt-6">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300"
                  onClick={() => navigate("/updatePass")}
                >
                  🔒 Update Password
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <h2 className="text-2xl">Page Not Found</h2>;
    }
  };

  const menuItems = [
    { id: "Home", icon: <FaHome /> },
    { id: "Employees", icon: <FaUsers /> },
    { id: "Leave", icon: <CgNotes /> },
    { id: "Settings", icon: <IoMdSettings /> },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-12 bg-gradient-to-br from-blue-100 to-blue-300">
      <button
        className="md:hidden absolute top-4 left-4 bg-white p-2 rounded-md shadow-lg z-50"
        onClick={toggleSidebar}
      >
        {showSidebar ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>
      <aside
        className={`fixed md:static ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out col-span-3 md:col-span-2 bg-white/60 backdrop-blur-md shadow-xl border-r border-gray-300 p-4 space-y-4 w-56 md:w-full h-auto md:h-screen mt-16 md:mt-0 rounded-r-xl md:rounded-none z-20`}
      >
        <div className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrent(item.id);
                setShowSidebar(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-lg text-left font-medium transition-all duration-200 ${
                current === item.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "hover:bg-blue-200"
              }`}
            >
              {item.icon} {item.id}
            </button>
          ))}
        </div>
      </aside>
      <main className="col-span-12 md:col-span-10 p-6">
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-6 min-h-[95vh]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
