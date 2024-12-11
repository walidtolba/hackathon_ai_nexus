import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCamera, FaCheck, FaTimes } from "react-icons/fa";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "../../axios";
import { useTheme } from "../../context/ThemeContext"; // Assuming you have this hook

const AttendanceTracking = () => {
  const { darkMode } = useTheme(); // Get darkMode state from the context
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    let scanner;

    if (scanning) {
      scanner = new Html5QrcodeScanner("reader", {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      });

      scanner.render(onScanSuccess, onScanError);
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  }, [scanning]);

  const onScanSuccess = async (decodedText, decodedResult) => {
    try {
      setScanning(false);
      setScanResult(decodedText);

      // Replace with your actual API endpoint
      const response = await axios.delete("/hr/accept_qr/", {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': "Token "+ localStorage.getItem('authToken')
        }
      });

      console.log(response.data)

      setScanned(true);
      setError(null);
    } catch (err) {
      setError("Failed to mark attendance. Please try again.");
      console.error("Attendance marking failed:", err);
    }
  };

  const onScanError = (errorMessage) => {
    // setError(
    //   "Error accessing camera. Please make sure you have granted camera permissions."
    // );
    // console.error(errorMessage);
  };

  const startScanning = () => {
    setScanning(true);
    setError(null);
    setScanResult(null);
    setScanned(false);
  };

  const stopScanning = () => {
    setScanning(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`p-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-md mx-auto">
        <h1
          className={`text-3xl font-bold mb-8 text-center ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Scan QR Code for Attendance
        </h1>

        <div
          className={`rounded-xl shadow-lg p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {!scanning && !scanned && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startScanning}
              className={`w-full py-4 px-6 rounded-lg font-semibold mb-4 flex items-center justify-center space-x-2 ${
                darkMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white"
              }`}
            >
              <FaCamera className="text-xl" />
              <span>Start Scanning</span>
            </motion.button>
          )}

          {scanning && (
            <div className="relative">
              <div id="reader" className="w-full"></div>
              <button
                onClick={stopScanning}
                className={`mt-4 w-full py-2 px-4 rounded-lg ${
                  darkMode ? "bg-gray-600 text-white" : "bg-gray-600 text-white"
                }`}
              >
                Cancel Scanning
              </button>
            </div>
          )}

          {error && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                darkMode ? "bg-red-900" : "bg-red-100"
              }`}
            >
              <p className={`${darkMode ? "text-red-300" : "text-red-700"}`}>
                {error}
              </p>
            </div>
          )}

          {scanned && (
            <div
              className={`text-center p-4 rounded-lg ${
                darkMode ? "bg-green-900" : "bg-green-100"
              }`}
            >
              <FaCheck className="text-green-500 text-3xl mx-auto mb-2" />
              <p
                className={`text-green-300 ${
                  darkMode ? "text-green-300" : "text-green-700"
                } font-medium`}
              >
                Attendance marked successfully!
              </p>
              <button
                onClick={startScanning}
                className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg"
              >
                Scan Again
              </button>
            </div>
          )}

          {scanResult && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <h3
                className={`font-semibold mb-2 ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Scan Result
              </h3>
              <p
                className={`break-all ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {scanResult}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AttendanceTracking;
