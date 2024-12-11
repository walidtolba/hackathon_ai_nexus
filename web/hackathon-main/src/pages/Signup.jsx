import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  FaGoogle,
  FaMoon,
  FaSun,
  FaUser,
  FaEnvelope,
  FaLock,
  FaIdCard,
  FaUserAstronaut,
  FaPhone,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";

const Signup = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    social_security_number: "",
    role: "",
    phone: "",
    terms: true,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Signup attempt:", formData);
    await axios.post("/users/signup/", formData).then(
      (res) => {
        console.log("Signup response:", res.data);
        // Redirect to login page
        navigate("/login");
      },
      (err) => {
        console.error("Signup error:", err);
        alert(err.response.data.non_field_errors[0]);
      }
    );
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-2xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? (
              <>
                <motion.img
                  initial={{ rotate: -180 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  src="./assets/nexhrd.png"
                  alt="BlueBird HR"
                  className="h-8 w-auto"
                />
              </>
            ) : (
              <>
                <motion.img
                  initial={{ rotate: -180 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  src="./assets/nexhrl.png"
                  alt="BlueBird HR"
                  className="h-8 w-auto"
                />
              </>
            )}
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-600" />
            )}
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold">Create Account</h2>
          <p
            className={`mt-2 text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Join our community today!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div className="flex space-x-4">
              {/* First Name Input */}
              <div className="relative w-1/2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser
                    className={`h-4 w-4 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </div>
                <input
                  id="firstName"
                  name="first_name"
                  type="text"
                  required
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`pl-10 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              {/* Last Name Input */}
              <div className="relative w-1/2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser
                    className={`h-4 w-4 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </div>
                <input
                  id="lastName"
                  name="last_name"
                  type="text"
                  required
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`pl-10 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope
                  className={`h-4 w-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={`pl-10 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                } appearance-none`}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhone
                  className={`h-4 w-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={`pl-10 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock
                  className={`h-4 w-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`pl-10 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                } appearance-none`}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock
                  className={`h-4 w-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`pl-10 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                } appearance-none`}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaIdCard
                  className={`h-4 w-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
              <input
                id="socialSecurityNumber"
                name="social_security_number"
                type="number"
                required
                placeholder="Social Security Number"
                value={formData.socialSecurityNumber}
                onChange={handleChange}
                className={`pl-10 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                } appearance-none`}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUserAstronaut
                  className={`h-4 w-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className={`pl-10 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                } appearance-none bg-transparent`}
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                }}
              >
                <option
                  value=""
                  className={darkMode ? "bg-gray-700" : "bg-white"}
                >
                  Select a Role
                </option>
                <option
                  value="CEO"
                  className={darkMode ? "bg-gray-700" : "bg-white"}
                >
                  CEO
                </option>
                <option
                  value="HR"
                  className={darkMode ? "bg-gray-700" : "bg-white"}
                >
                  HR
                </option>
                <option
                  value="Comptabiliter"
                  className={darkMode ? "bg-gray-700" : "bg-white"}
                >
                  Comptabiliter
                </option>
                <option
                  value="worker"
                  className={darkMode ? "bg-gray-700" : "bg-white"}
                >
                  worker
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className={`h-4 w-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm">
                I agree to the Terms and Conditions
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className={`group relative w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md ${
                darkMode
                  ? "border-gray-600 hover:bg-gray-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <FaGoogle className="mr-2 h-5 w-5 text-red-500" />
              Sign up with Google
            </motion.button>
          </div>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-center text-sm"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signup;
