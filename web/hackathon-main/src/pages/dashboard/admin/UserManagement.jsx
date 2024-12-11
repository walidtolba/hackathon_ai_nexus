import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaTrash, FaUserTag, FaSearch } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext"; // Assuming you have this hook
import axios from "../../../axios";

const UserManagement = () => {
  const { darkMode } = useTheme(); // Get darkMode state from the context
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const roles = [
    { value: "", label: "All Roles" },
    { value: "HR", label: "HR Manager" },
    { value: "accountant", label: "Accountant" },
    { value: "worker", label: "Worker" },
  ];
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("/hr/worker/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("authToken"),
        },
      });
      setUsers(response?.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  fetchData();
}, []);

const handleDelete = async (userId) => {
  try {
    await axios.post(
      "/hr/fire_user/",
      { id: userId },
      {
        headers: {
          Authorization: "Token " + localStorage.getItem("authToken"),
        },
      }
    );

    setUsers(users.filter((user) => user.id !== userId));
    setDeleteConfirm(null);
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};


  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "hr":
        return `bg-purple-100 text-purple-800 ${
          darkMode ? "dark:bg-purple-900 dark:text-purple-200" : ""
        }`;
      case "accountant":
        return `bg-blue-100 text-blue-800 ${
          darkMode ? "dark:bg-blue-900 dark:text-blue-200" : ""
        }`;
      default:
        return `bg-green-100 text-green-800 ${
          darkMode ? "dark:bg-green-900 dark:text-green-200" : ""
        }`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className={`text-3xl font-bold mb-8 flex items-center ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          <FaUsers className="mr-2" /> User Management
        </h1>

        {/* Filters */}
        <div
          className={`rounded-xl shadow-lg p-6 mb-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border ${
                  darkMode
                    ? " border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>

            {/* Role Filter */}
            <div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className={`w-full px-3 py-2 border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div
          className={`rounded-xl shadow-lg overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="overflow-x-auto">
            <table
              className={`min-w-full divide-y ${
                darkMode ? "divide-gray-700" : "divide-gray-200"
              }`}
            >
              <thead>
                <tr
                  className={`bg-gray-50 ${darkMode ? "dark:bg-gray-900" : ""}`}
                >
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "bg-gray-900 text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Email
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "bg-gray-900 text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Role
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "bg-gray-900 text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Status
                  </th>
                  <th
                    className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                      darkMode ? "bg-gray-900 text-gray-400" : " text-gray-500"
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
                {filteredUsers?.map((user) => (
                  <tr key={user?.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(
                          user?.role
                        )}`}
                      >
                        {user?.role?.charAt(0)?.toUpperCase() +
                          user?.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user?.status === "active"
                            ? `${
                                darkMode
                                  ? "bg-green-900 text-green-200"
                                  : "bg-green-100 text-green-800"
                              }`
                            : `${
                                darkMode
                                  ? "bg-yellow-900 text-yellow-200"
                                  : "bg-yellow-100 text-yellow-800"
                              }`
                        }`}
                      >
                        {user?.status?.charAt(0)?.toUpperCase() +
                          user?.status?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {deleteConfirm === user.id ? (
                        <div className="flex justify-end items-center space-x-2">
                          <button
                            onClick={() => handleDelete(user.id)}
                            className={`hover:text-red-900 ${
                              darkMode
                                ? "text-red-400 hover:text-red-300"
                                : "text-red-600"
                            }`}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className={`hover:text-gray-900 ${
                              darkMode
                                ? "text-gray-400 hover:text-gray-300"
                                : "text-gray-600"
                            }`}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(user.id)}
                          className={`hover:text-red-900 ${
                            darkMode
                              ? "text-red-400 hover:text-red-300"
                              : "text-red-600"
                          }`}
                        >
                          <FaTrash />
                        </button>
                      )}
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

export default UserManagement;
