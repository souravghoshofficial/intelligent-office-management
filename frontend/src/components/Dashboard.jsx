import React, { useState } from "react";

function Dashboard() {
  const [current, setCurrent] = useState("Home");

  const renderContent = () => {
    switch (current) {
      case "Home":
        return <h2 className="text-xl font-semibold">Welcome Home</h2>;
      case "Employees":
        return <h2 className="text-xl font-semibold">Employee Details Page</h2>;
      case "Leave":
        return <h2 className="text-xl font-semibold">Leave Management Page</h2>;
      case "Settings":
        return <h2 className="text-xl font-semibold">System Settings Page</h2>;
      default:
        return <h2 className="text-xl font-semibold">Page Not Found</h2>;
    }
  };

  return (
    <div className="grid grid-cols-12 min-h-screen">
      {/* Sidebar */}
      <div className="col-span-3 bg-gray-100 p-4 space-y-3 shadow-md">
        <button onClick={() => setCurrent("Home")} className="btn">
          Home
        </button>
        <button onClick={() => setCurrent("Employees")} className="btn">
          Employees
        </button>
        <button onClick={() => setCurrent("Leave")} className="btn">
          Leave
        </button>
        <button onClick={() => setCurrent("Settings")} className="btn">
          Settings
        </button>
      </div>

      {/* Main Content */}
      <div className="col-span-9 p-5">{renderContent()}</div>
    </div>
  );
}

export default Dashboard;
