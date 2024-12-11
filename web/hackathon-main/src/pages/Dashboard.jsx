import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import AbsenceManagement from "./dashboard/AbsenceManagement";
import PayrollTracking from "./dashboard/PayrollTracking";
import AccountingReports from "./dashboard/AccountingReports";
import ContractManagement from "./dashboard/ContractManagement";
import LeaveRequests from "./dashboard/dashboard-absence/LeaveRequests";
import AttendanceTracking from "./dashboard/AttendanceTracking";
import WorkerProfile from "./dashboard/worker/WorkerProfile";
import LeaveRequest from "./dashboard/worker/LeaveRequest";
import WorkerHistory from "./dashboard/worker/WorkerHistory";
import WorkerTraining from "./dashboard/worker/WorkerTraining";
import AddUser from "./dashboard/admin/AddUser";
import UserManagement from "./dashboard/admin/UserManagement";
import CreateCompany from "./dashboard/admin/CreateCompany";
import UserSettings from "./dashboard/UserSettings";
import Chatbot from "../components/Chatbot";
import AnalyticsDashboard from "./dashboard/analytics/AnalyticsDashboard";
import RetentionAnalytics from "./dashboard/analytics/RetentionAnalytics";

const Dashboard = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  // This would typically come from your authentication context
  const companyName = localStorage.getItem("companyName");
  const userRole = localStorage.getItem("userRole");
  console.log(!Boolean(companyName) && userRole !== "worker")
  if (!Boolean(companyName) && userRole !== "worker") {
    navigate("/login");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
  }

  console.log(localStorage.getItem('authToken'), localStorage.getItem('userRole'))

  const getDefaultRoute = (role) => {
    switch (role) {
      case "worker":
        return "/dashboard/worker/profile";
      case "hr":
        return "/dashboard/analytics";
      case "ceo":
        return "/dashboard/analytics";
      default:
        return "/dashboard/attendance";
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar role={userRole} />
      <div className="ml-64 p-8">
        <Routes>
          {/* Analytics Dashboard for HR and CEO */}
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/retention" element={<RetentionAnalytics />} />

          {/* Admin Routes */}
          <Route path="/admin/add-user" element={<AddUser />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/create-company" element={<CreateCompany />} />

          {/* Worker Routes */}
          <Route path="/worker/profile" element={<WorkerProfile />} />
          <Route path="/worker/leave-request" element={<LeaveRequest />} />
          <Route path="/worker/history" element={<WorkerHistory />} />
          <Route path="/worker/training" element={<WorkerTraining />} />

          {/* Common Routes */}
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/attendance" element={<AttendanceTracking />} />
          <Route path="/absence/*" element={<AbsenceManagement />}>
            <Route path="leaverequests" element={<LeaveRequests />} />
          </Route>
          <Route path="/payroll" element={<PayrollTracking />} />
          <Route path="/accounting" element={<AccountingReports />} />
          <Route path="/contracts" element={<ContractManagement />} />

          {/* Default Route */}
          <Route
            path="/"
            element={<Navigate to={getDefaultRoute(userRole)} replace />}
          />
        </Routes>
      </div>
      <Chatbot />
    </div>
  );
};

export default Dashboard;
