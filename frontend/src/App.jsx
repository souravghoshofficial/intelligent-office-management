import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loadData } from "./components/store/auth";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });

        if (response.status === 200 && response.data?.user) {
          dispatch(loadData(response.data.user));
        } else {
          alert("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("An error occurred while fetching user data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrentUser();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
