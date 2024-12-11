import { useTheme } from "../../../context/ThemeContext"; // Assuming you have this hook
import React from "react";
import { motion } from "framer-motion";
import {
  FaHistory,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaClock,
  FaDownload,
} from "react-icons/fa";
import axios from "../../../axios";

const WorkerHistory = () => {
  const { darkMode } = useTheme(); // Use the darkMode context

  const history = {
    leaveHistory: [
      {
        id: 1,
        type: "Annual Leave",
        startDate: "2023-12-01",
        endDate: "2023-12-05",
        status: "Approved",
      },
      {
        id: 2,
        type: "Sick Leave",
        startDate: "2023-11-15",
        endDate: "2023-11-16",
        status: "Approved",
      },
      {
        id: 3,
        type: "Casual Leave",
        startDate: "2023-10-20",
        endDate: "2023-10-20",
        status: "Rejected",
      },
    ],
    paymentHistory: [
      { id: 1, date: "2023-12-01", amount: "5000", type: "Salary" },
      { id: 2, date: "2023-11-01", amount: "5000", type: "Salary" },
      { id: 3, date: "2023-12-15", amount: "1000", type: "Bonus" },
    ],
    attendanceHistory: [
      {
        id: 1,
        date: "2023-12-09",
        checkIn: "09:00",
        checkOut: "17:00",
        status: "Present",
      },
      {
        id: 2,
        date: "2023-12-08",
        checkIn: "08:55",
        checkOut: "17:05",
        status: "Present",
      },
      {
        id: 3,
        date: "2023-12-07",
        checkIn: "-",
        checkOut: "-",
        status: "Absent",
      },
    ],
  };

  const handleDownloadPayroll = async (paymentId) => {
    try {
      const response = await axios.get(`/payroll/download/${paymentId}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `payroll-${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading payroll:', error);
      alert('Failed to download payroll. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <h1
        className={`text-3xl font-bold mb-8 flex items-center ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        <FaHistory className="mr-2" /> My History
      </h1>

      <div className="grid grid-cols-1 gap-8">
        {/* Leave History */}
        <div
          className={`rounded-xl shadow-lg p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-4 flex items-center ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <FaCalendarCheck className="mr-2" /> Leave History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Type
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Start Date
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    End Date
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  darkMode ? "divide-gray-700" : "divide-gray-200"
                }`}
              >
                {history.leaveHistory.map((leave) => (
                  <tr key={leave.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {leave.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {leave.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {leave.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment History */}
        <div
          className={`rounded-xl shadow-lg p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-4 flex items-center ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <FaMoneyBillWave className="mr-2" /> Payment History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Date
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Type
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Amount
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  darkMode ? "divide-gray-700" : "divide-gray-200"
                }`}
              >
                {history.paymentHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {payment.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDownloadPayroll(payment.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                          darkMode
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                        } transition-colors duration-200`}
                      >
                        <FaDownload className="mr-1" /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Attendance History */}
        <div
          className={`rounded-xl shadow-lg p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-4 flex items-center ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <FaClock className="mr-2" /> Attendance History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Date
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Check In
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Check Out
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  darkMode ? "divide-gray-700" : "divide-gray-200"
                }`}
              >
                {history.attendanceHistory.map((attendance) => (
                  <tr key={attendance.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {attendance.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {attendance.checkIn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {attendance.checkOut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          attendance.status === "Present"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {attendance.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkerHistory;
