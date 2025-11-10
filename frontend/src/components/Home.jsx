import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadData } from "./store/auth";

function Home() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      loginInfo,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      navigate("/dashboard");
      dispatch(loadData(response.data.user))
    } else {
      alert("Invalid Credentials");
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-200 to-blue-500">
      <div className="flex flex-1 justify-center items-center p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white/80 backdrop-blur-md shadow-2xl rounded-xl w-full max-w-md p-6 space-y-4"
        >
          <h1 className="text-2xl font-bold text-center text-blue-700">
            Employee Login
          </h1>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={loginInfo.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Password"
              value={loginInfo.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-sm text-blue-600 hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
