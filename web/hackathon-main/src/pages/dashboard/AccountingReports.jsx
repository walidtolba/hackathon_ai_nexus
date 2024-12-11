import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext"; // Assuming you have this hook

const AccountingReports = () => {
  const { darkMode } = useTheme(); // Get darkMode state from the context

  const handleGenerateReport = async () => {
    try {
      // Simulate an API call to generate the report
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reportType: "business" }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      // Assuming the API returns a Blob (PDF file)
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Business_Report.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate the report. Please try again later.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1
        className={`text-2xl font-bold mb-6 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Accounting Reports
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Financial Summary Card */}
        <div
          className={`rounded-lg shadow p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Financial Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Revenue</span>
              <span className="font-bold text-green-500">$500,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Expenses</span>
              <span className="font-bold text-red-500">$350,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Net Profit</span>
              <span className="font-bold">$150,000</span>
            </div>
          </div>
        </div>

        {/* Expense Breakdown Card */}
        <div
          className={`rounded-lg shadow p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Expense Breakdown
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Payroll</span>
              <span className="font-bold">70%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Operations</span>
              <span className="font-bold">20%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Marketing</span>
              <span className="font-bold">10%</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions Card */}
        <div
          className={`rounded-lg shadow p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Recent Transactions
          </h2>
          <div className="space-y-4">
            {/* Sample transactions */}
            <div className="border-l-4 border-blue-500 pl-4">
              <p
                className={`font-medium ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Payroll Payment
              </p>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Dec 1, 2024
              </p>
              <p className="text-sm text-red-500">-$125,000</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p
                className={`font-medium ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Client Payment
              </p>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Dec 5, 2024
              </p>
              <p className="text-sm text-green-500">+$50,000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Report Button */}
      <button
        className={`mt-6 w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 ${
          darkMode ? "focus:ring-blue-400" : "focus:ring-blue-500"
        }`}
        onClick={handleGenerateReport}
      >
        Generate and Download Full Business Report
      </button>
    </motion.div>
  );
};

export default AccountingReports;
