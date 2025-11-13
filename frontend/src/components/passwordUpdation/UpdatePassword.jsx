import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UpdatePassword() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authInfo);
  const [passDetails, setPassDetails] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    const { oldPassword, newPassword } = passDetails;

    if (!oldPassword || !newPassword || !confirmPass) {
      setMessage({ text: "Please fill all fields.", type: "error" });
      return;
    }
    if (newPassword !== confirmPass) {
      setMessage({
        text: "New and confirm passwords do not match.",
        type: "error",
      });
      return;
    }
    if (oldPassword === newPassword) {
      setMessage({
        text: "New password cannot be the same as old password.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/employee/${user.id}/change-password`,
        passDetails,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setMessage({
          text: response.data.message || "Password updated successfully!",
          type: "success",
        });
        setPassDetails({ oldPassword: "", newPassword: "" });
        setConfirmPass("");
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Failed to update password. Try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-8 transition-transform hover:scale-[1.01] space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center text-blue-700 border-b pb-2">
          🔒 Update Password
        </h1>

        <div className="flex flex-col relative">
          <label htmlFor="opassword" className="text-gray-700 font-medium mb-1">
            Old Password
          </label>
          <input
            type={showPass.old ? "text" : "password"}
            id="opassword"
            value={passDetails.oldPassword}
            required
            onChange={(e) =>
              setPassDetails({ ...passDetails, oldPassword: e.target.value })
            }
            placeholder="Enter old password"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all pr-10"
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={() => setShowPass({ ...showPass, old: !showPass.old })}
          >
            {showPass.old ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="password" className="text-gray-700 font-medium mb-1">
            New Password
          </label>
          <input
            type={showPass.new ? "text" : "password"}
            id="password"
            value={passDetails.newPassword}
            required
            onChange={(e) =>
              setPassDetails({ ...passDetails, newPassword: e.target.value })
            }
            placeholder="Enter new password"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all pr-10"
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={() => setShowPass({ ...showPass, new: !showPass.new })}
          >
            {showPass.new ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="cpassword" className="text-gray-700 font-medium mb-1">
            Confirm Password
          </label>
          <input
            type={showPass.confirm ? "text" : "password"}
            id="cpassword"
            value={confirmPass}
            required
            placeholder="Confirm password"
            onChange={(e) => setConfirmPass(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all pr-10"
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={() =>
              setShowPass({ ...showPass, confirm: !showPass.confirm })
            }
          >
            {showPass.confirm ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        {message.text && (
          <p
            className={`text-center text-sm font-medium ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;
