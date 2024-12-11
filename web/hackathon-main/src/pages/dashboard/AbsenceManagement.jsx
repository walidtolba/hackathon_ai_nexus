import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useOutlet } from "react-router";
import { Outlet, useLocation } from "react-router-dom";
import { FaCheck, FaEye, FaTimes } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext"; // Assuming you have a ThemeContext
import PathBar from "../../components/PathBar";
import axios from "../../axios";
import { header } from "framer-motion/client";

const AbsenceManagement = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const { darkMode } = useTheme(); // Accessing dark mode from context

  // State for attendance data
  const [attendanceData, setAttendanceData] = useState(null);

  // State for minimum workers
  const [minWorkers, setMinWorkers] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const checkAttendance = async() => {
    await axios.post("/hr/check_absance/", {},{
      headers: {
        Authorization: "Token " + localStorage.getItem("authToken"),
      },
    }).then(e=> setAttendanceData(e.data))
    // Simulate server request
    console.log(localStorage.getItem("authToken"))
    
  };

  const viewAbsences = async () => {
    await axios.post("/hr/view_absance/", {},{
      headers: {
        Authorization: "Token " + localStorage.getItem("authToken"),
      },
    }).then(e=> setAttendanceData(e.data)) 

    setShowPopup(true);
  };

  const handleSave = () => {
    axios.post(
      "/hr/set_min/",
      { min: minWorkers },
      {
        headers: {
          Authorization: "Token " + localStorage.getItem("authToken"),
        },
      }
    );
    // make the input field uneditable
    document.getElementById("min-workers").readOnly = true;
  };
  // make that one input field editable
  const editNumberMinWorkers = () => {
    document.getElementById("min-workers").readOnly = false;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`p-6 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-bold">{"Absence & Leave Management"}</h1>
      {outlet ? (
        <div className="mt-8">
          <Outlet />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Leave Request Card */}
            <div
              className={`rounded-lg shadow p-6 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <Link to={"/dashboard/absence/leaverequests"}>
                <h2
                  className={`text-lg font-semibold mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Leave Requests
                </h2>
              </Link>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p
                    className={`font-medium ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    John Doe
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Vacation Leave
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Dec 20 - Dec 25
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics Card */}
            <div
              className={`rounded-lg shadow p-6 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Leave Statistics
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Vacation Days Left
                  </span>
                  <span
                    className={`font-bold ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    15 days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Sick Leave Left
                  </span>
                  <span
                    className={`font-bold ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    7 days
                  </span>
                </div>
              </div>
            </div>

            {/* Calendar Card */}
            <div
              className={`rounded-lg shadow p-6 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                See Todays Absences
              </h2>
              <div className="space-y-2">
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Current Team Absences
                </p>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-900"
                  }`}
                >
                  <p className="py-1">Sarah - Out until Dec 15</p>
                  <p className="py-1">Mike - Remote on Dec 16</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`rounded-lg shadow mt-6 p-6 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <label
              htmlFor="min-workers"
              className={`block text-lg font-bold mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
              value={minWorkers}
            >
              Min number of workers
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                id="min-workers"
                // make it uneditable
                readOnly
                value={minWorkers}
                onChange={(e) => setMinWorkers(e.target.value)}
                className={`flex-grow p-2 text-base rounded-md border ${
                  darkMode
                    ? "border-gray-700 bg-gray-900 text-gray-300"
                    : "border-gray-300 bg-white text-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                placeholder="Enter minimum workers"
              />
              <button
                onClick={editNumberMinWorkers}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 "
              >
                Edit
              </button>
              <button
                className={`px-4 py-2 text-sm font-semibold rounded-md ${
                  darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400"
                } focus:outline-none focus:ring-2 transition duration-200`}
                onClick={() => {
                  handleSave();
                }}
              >
                Save
              </button>
            </div>
          </div>
          {/* Check Attendance Button */}
          <div className="mt-8 flex flex-col items-center space-y-4">
            <button
              onClick={checkAttendance}
              className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
            >
              <FaCheck className="inline mr-2" />
              Check Attendance
            </button>

            {attendanceData && attendanceData.length > 0 && (
              <button
                onClick={viewAbsences}
                className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              >
                <FaEye className="inline mr-2" />
                View Absences
              </button>
            )}
          </div>
        </>
      )}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`w-full max-w-md p-6 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Absent Users</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              {attendanceData?.map((user, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-3 rounded ${
                    darkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <span>{user?.user}</span>
                  <span className="text-sm text-gray-500">{user.date}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AbsenceManagement;
