import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function CreateEmployee() {
  const [showPass, setShowPass] = useState(false);
  const [empDetail, setEmpDetail] = useState({
    name: "",
    email: "",
    phone: "",
    joining_date: "",
    role: "",
    position: "",
    status: true,
    leave_date: null,
    department_id: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEmpDetail({ ...empDetail, [id]: value });
  };

  // Validation
  const validateForm = () => {
    const { name, email, phone, joining_date, role, position, department_id, password } = empDetail;

    if (!name || !email || !phone || !joining_date || !role || !position || !department_id || !password) {
      alert("All fields are required!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/employees",
        empDetail,
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert("Employee created successfully!");
      } else {
        alert("Unsuccessful creation!");
      }
    } catch (error) {
      alert("⚠️ Error occurred while creating employee!");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-6">
          👨‍💼 Create New Employee
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Full Name"
              value={empDetail.name}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={empDetail.email}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="font-semibold text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter Phone No"
              value={empDetail.phone}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="joining_date" className="font-semibold text-gray-700 mb-1">
              Joining Date
            </label>
            <input
              type="date"
              id="joining_date"
              value={empDetail.joining_date}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Role Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="role" className="font-semibold text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              value={empDetail.role}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="" selected disabled>Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="position" className="font-semibold text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              id="position"
              placeholder="Enter Position"
              value={empDetail.position}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="department_id" className="font-semibold text-gray-700 mb-1">
              Department
            </label>
            <select
              id="department_id"
              value={empDetail.department_id}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="" disabled>Select Department</option>
              <option value="5cfcbf7a-9789-4798-832d-bb99a255ce9c">IT</option>
              <option value="999c3cf8-c945-41d1-87d4-fabfe7a32556">Marketing</option>
              <option value="d8c1cd92-6d90-4445-b838-48cb3e7d768b">Sales</option>
              <option value="6b744d73-30e8-4f7e-b48f-5fdfcb1c4616">Analyst</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-400">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                value={empDetail.password}
                onChange={handleInputChange}
                required
                className="flex-1 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-gray-500 hover:text-blue-500"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="px-6 py-2 text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
