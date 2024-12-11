import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext"; // Assuming you have a ThemeContext
import { saveAs } from "file-saver";
import axios from "../../axios";

const PayrollTracking = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { darkMode } = useTheme(); // Accessing dark mode from context
  const [mockUsers, setMockUsers] = useState()
  const [downloadUrl, setDownloadUrl] = useState("")

  const mockRevenueData = [
    { month: "Jan", revenue: 50000 },
    { month: "Feb", revenue: 60000 },
    { month: "Mar", revenue: 55000 },
    { month: "Apr", revenue: 65000 },
    { month: "May", revenue: 70000 },
    { month: "Jun", revenue: 75000 },
    { month: "Jul", revenue: 80000 },
    { month: "Aug", revenue: 85000 },
    { month: "Sep", revenue: 90000 },
    { month: "Oct", revenue: 95000 },
    { month: "Nov", revenue: 100000 },
    { month: "Dec", revenue: 105000 },
  ];

  // const mockUsers = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     salary: "$3,000",
  //     position: "Software Engineer",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     salary: "$3,200",
  //     position: "Product Manager",
  //   },
  //   { id: 3, name: "Alice Johnson", salary: "$2,800", position: "UX Designer" },
  // ];


  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        const respond = await axios.get("/hr/worker", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("authToken")}`
        }})
        console.log(respond.data)
        setMockUsers(respond?.data)
        } catch (error) {
          console.error(error);
          }
          }
          fetchUsers()
  }, [])


  const handleUserClick = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleGeneratePayslip = async () => {
    try {
      const response = await axios.post(
        "/hr/create_payslip/",
        { id: selectedUser.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      );
  
      const pdfUrl = `http://10.40.5.231:8000/hr/get_payslip/${response.data.id}/`;
      const pdfResponse = await axios.get(pdfUrl, {
        responseType: "blob", // Important to fetch the PDF as a blob
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });
  
      const fileName = `${selectedUser.first_name}_${selectedUser.last_name}.pdf`;
      saveAs(pdfResponse.data, fileName);
      setModalOpen(false);
    } catch (error) {
      console.error("Error generating payslip:", error);
      alert("Failed to generate payslip. Please try again.");
    }
  };
  

  const handleExportUserData = () => {
    const userBlob = new Blob(
      [
        `Name: ${selectedUser.first_name}\nPosition: ${selectedUser.position}\nSalary: ${selectedUser.base_salary}`
      ],
      { type: "text/plain;charset=utf-8" }
    );
    saveAs(userBlob, `${selectedUser.first_name.replace(/\s+/g, "_")}_data.txt`);
  };

  const handleExportAllUsersData = () => {
    const userData = mockUsers
      .map(
        (user) =>
          `Name: ${user?.first_name}\nPosition: ${user.position}\nSalary: ${user.salary}\n`
      )
      .join("\n");
    const userBlob = new Blob([userData], { type: "text/plain;charset=utf-8" });
    saveAs(userBlob, "All_Users_Data.txt");
  };

  const openUserListModal = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`p-8 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1
        className={`text-3xl font-semibold text-center mb-8 ${
          darkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Payroll Tracking
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Payroll Summary Card */}
        <div
          className={`rounded-xl shadow-lg p-6 ${
            darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
          }`}
        >
          <h2 className="text-xl font-semibold mb-6">Payroll Summary</h2>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span>Total Payroll</span>
              <span className="font-semibold text-xl">$125,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Employees</span>
              <span className="font-semibold text-xl">45</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Average Salary</span>
              <span className="font-semibold text-xl">$2,777</span>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div
          className={`rounded-xl shadow-lg p-6 ${
            darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
          }`}
        >
          <h2 className="text-xl font-semibold mb-6">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={mockRevenueData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
          <button
            className={`mt-6 w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 ${
              darkMode ? "focus:ring-blue-400" : "focus:ring-blue-500"
            }`}
            onClick={openUserListModal}
          >
            See All Users
          </button>
        </div>
      </div>

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div
            className={`p-8 rounded-xl shadow-xl w-96 ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
            }`}
          >
            <h3 className="text-2xl font-semibold mb-4">User Details</h3>
            <div className="space-y-4">
              <p>
                <strong>Name:</strong> {selectedUser?.first_name} {selectedUser?.last_name}
              </p>
              <p>
                <strong>Position:</strong> {selectedUser?.position}
              </p>
              <p>
                <strong>Salary:</strong> {selectedUser?.base_salary}
              </p>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                className={`w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 ${
                  darkMode ? "focus:ring-green-400" : "focus:ring-green-500"
                }`}
                onClick={handleGeneratePayslip}
              >
                Generate Payslip
              </button>
              <button
                className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 ${
                  darkMode ? "focus:ring-blue-400" : "focus:ring-blue-500"
                }`}
                onClick={handleExportUserData}
              >
                Export Data
              </button>
            </div>
            
            <button
              className={`w-full mt-4 px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 ${
                darkMode ? "focus:ring-gray-400" : "focus:ring-gray-500"
              }`}
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* User List Modal */}
      {isModalOpen && !selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div
            className={`p-8 rounded-xl shadow-xl w-96 ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
            }`}
          >
            <h3 className="text-2xl font-semibold mb-4">User List</h3>
            <ul className="space-y-4">
              {mockUsers?.map((user) => (
                <li
                  key={user.id}
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() => handleUserClick(user)}
                >
                  {user?.first_name} {user?.last_name}
                </li>
              ))}
            </ul>
            <button
              className={`w-full mt-6 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 ${
                darkMode ? "focus:ring-blue-400" : "focus:ring-blue-500"
              }`}
              onClick={handleExportAllUsersData}
            >
              Export All Users
            </button>
            <button
              className={`w-full mt-4 px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 ${
                darkMode ? "focus:ring-gray-400" : "focus:ring-gray-500"
              }`}
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PayrollTracking;
