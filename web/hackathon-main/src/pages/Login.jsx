import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FaGoogle, FaMoon, FaSun, FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    await axios
      .post("/users/login/", formData)
      .then((res) => {
        const { role, token, companyName } = res.data;
        console.log("Login response:", res.data);

        // Save role and token to localStorage
        localStorage.setItem("userRole", role.toLowerCase());
        localStorage.setItem("companyName", companyName);
        localStorage.setItem("authToken", token);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Login error:", err.response.data.non_field_errors[0]);
        alert(err.response.data.non_field_errors[0]);
      });
  };

  const InputField = ({ icon: Icon, ...props }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon
          className={`h-4 w-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        />
      </div>
      <input
        {...props}
        className={`pl-10 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      />
    </div>
  );

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
          <h2 className="text-3xl font-extrabold">Welcome Back</h2>
          <p
            className={`mt-2 text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Please sign in to your account
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
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser
                  className={`h-5 w-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email "
                value={formData.email}
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
                  className={`h-5 w-5 ${
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
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
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
              Sign in with Google
            </motion.button>
          </div>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-center text-sm"
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign Up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
