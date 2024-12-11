import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaEnvelope, FaDollarSign, FaUserTag, FaCheck } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext"; // Assuming you have this hook

const AddUser = () => {
  const { darkMode } = useTheme(); // Get darkMode state from the context
  const [formData, setFormData] = useState({
    email: "",
    baseSalary: "",
    role: "",
    roleDescription: "",
    sendInvite: true,
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const handleGenerateDescription = async () => {
    try {
      // API call to generate role description
      const response = await fetch("/api/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: formData.role }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate description");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, roleDescription: data.description }));
    } catch (error) {
      console.error("Error generating description:", error);
      alert("Failed to generate role description. Please try again.");
    }
  };

  const handleSaveWorker = async (e) => {
    e.preventDefault();
    try {
      // API call to save worker
      const response = await fetch("/api/save-worker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save worker");
      }

      setStatus({ type: "success", message: "Worker successfully added." });

      // Reset form
      setFormData({
        email: "",
        baseSalary: "",
        role: "",
        roleDescription: "",
        sendInvite: true,
      });
    } catch (error) {
      setStatus({ type: "error", message: "Failed to add worker. Please try again." });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <div className="max-w-2xl mx-auto">
        <h1
          className={`text-3xl font-bold mb-8 flex items-center ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          <FaUserPlus className="mr-2" /> Add New Worker
        </h1>

        <form onSubmit={handleSaveWorker} className="space-y-6">
          <div
            className={`rounded-xl shadow-lg p-6 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Email Input */}
            <div className="mb-6">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
              >
                <FaEnvelope className="inline mr-2" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                placeholder="user@company.com"
              />
            </div>

            {/* Base Salary Input */}
            <div className="mb-6">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
              >
                <FaDollarSign className="inline mr-2" /> Base Salary
              </label>
              <input
                type="number"
                name="baseSalary"
                value={formData.baseSalary}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                placeholder="50000"
              />
            </div>

            {/* Role Input */}
            <div className="mb-6">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
              >
                <FaUserTag className="inline mr-2" /> Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Software Engineer"
              />
            </div>

            {/* Role Description */}
            <div className="mb-6">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
              >
                Role Description
              </label>
              <textarea
                name="roleDescription"
                value={formData.roleDescription}
                onChange={handleChange}
                rows="4"
                className={`w-full px-3 py-2 border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter role description or generate automatically."
              />
              <button
                type="button"
                onClick={handleGenerateDescription}
                className="mt-2 text-sm text-blue-500 hover:underline"
              >
                Generate Description
              </button>
            </div>

            {/* Send Invite Checkbox */}
            <div className="mb-6">
              <label
                className={`flex items-center ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <input
                  type="checkbox"
                  name="sendInvite"
                  checked={formData.sendInvite}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm">Send invitation email</span>
              </label>
            </div>

            {/* Status Message */}
            {status.message && (
              <div
                className={`
                  mb-6 p-4 rounded-md 
                  ${
                    status.type === "success"
                      ? darkMode
                        ? "bg-green-800 text-green-100"
                        : "bg-green-100 text-green-700"
                      : darkMode
                      ? "bg-red-800 text-red-100"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {status.message}
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaUserPlus className="mr-2" />
              Save Worker
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddUser;
