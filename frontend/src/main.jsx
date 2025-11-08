import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./components/Home.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CreateEmployee from "./components/Employee/CreateEmployee.jsx";
import ApplyLeave from "./components/leave/ApplyLeave.jsx";
import ApplicationForm from "./components/leave/ApplicationForm.jsx";
import UpdatePassword from "./components/passwordUpdation/UpdatePassword.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="createEmployee" element={<CreateEmployee />} />
      <Route path="applyLeave" element={<ApplyLeave />} />
      <Route path="applicationForm" element={<ApplicationForm />} />
      <Route path="updatePass" element={<UpdatePassword />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
