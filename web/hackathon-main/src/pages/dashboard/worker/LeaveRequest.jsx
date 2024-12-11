import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import {
  FaCalendarPlus,
  FaCalendarCheck,
  FaClock,
  FaComment,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import axios from "../../../axios";

const LeaveRequest = () => {
  const { darkMode } = useTheme();
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  // Fetch leave history when component mounts
  useEffect(() => {
    fetchLeaveHistory();
  }, []);

  const fetchLeaveHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/hr/my_leave/', {
        headers:{
          'Authorization': "Token "+ localStorage.getItem("authToken")
        }
      });
      setLeaveHistory(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch leave history. Please try again later.');
      console.error('Error fetching leave history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/hr/my_leave/', formData, {
        headers:{
          'Authorization': "Token "+ localStorage.getItem("authToken")
        }
      });
      
      // Add the new request to the history
      setLeaveHistory(prev => [response.data, ...prev]);
      
      // Reset form
      setFormData({
        type: "",
        start_date: "",
        end_date: "",
        reason: "",
      });
      
      setError(null);
      alert('Leave request submitted successfully!');
    } catch (err) {
      setError('Failed to submit leave request. Please try again.');
      console.error('Error submitting leave request:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <FaCheckCircle className="text-green-500" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaHourglassHalf className="text-yellow-500" />;
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
        <FaCalendarPlus className="mr-2" /> Request Leave
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Leave Request Form */}
        <div
          className={`rounded-xl shadow-lg p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-6 flex items-center ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <FaCalendarPlus className="mr-2" /> New Leave Request
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Leave Type */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Leave Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 rounded-md border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Type</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Personal Leave">Personal Leave</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 rounded-md border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  End Date
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 rounded-md border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Reason
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                rows="4"
                className={`w-full px-3 py-2 rounded-md border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-blue-500`}
                placeholder="Please provide a reason for your leave request..."
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md font-medium ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } transition-colors duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>

        {/* Leave History */}
        <div
          className={`rounded-xl shadow-lg p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-6 flex items-center ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <FaCalendarCheck className="mr-2" /> Leave History
          </h2>

          {loading && <p>Loading leave history...</p>}
          
          {!loading && leaveHistory.length === 0 && (
            <p className={`text-center py-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              No leave requests found.
            </p>
          )}

          <div className="space-y-4">
            {leaveHistory.map((leave) => (
              <div
                key={leave.id}
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-750" : "bg-gray-100"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-semibold ${
                      darkMode ? "text-white" : "text-black"
                    }`}>
                      {leave.type}
                    </h3>
                    <div className="flex items-center mt-1 space-x-4">
                      <span className="text-sm text-gray-500 flex items-center">
                        <FaClock className="mr-1" />
                        {leave.start_date} - {leave.end_date}
                      </span>
                    </div>
                    {leave.reason && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex items-start">
                        <FaComment className="mr-2 mt-1" />
                        {leave.reason}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(leave.status)}
                    <span className={`ml-2 text-sm font-medium ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeaveRequest;
