import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCog,
  FaUser,
  FaLock,
  FaBell,
  FaPalette,
  FaGlobe,
  FaSave,
  FaCamera,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const UserSettings = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [settings, setSettings] = useState({
    profile: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@company.com",
      phone: "+1234567890",
      avatar: null,
    },
    password: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      leaveUpdates: true,
      payrollAlerts: true,
      systemUpdates: false,
    },
    appearance: {
      language: "en",
      timezone: "UTC",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h",
    },
  });

  const handleInputChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange("profile", "avatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (section) => {
    try {
      setLoading(true);
      setErrorMessage("");
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (section === "password") {
        if (settings.password.newPassword !== settings.password.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (settings.password.newPassword.length < 8) {
          throw new Error("Password must be at least 8 characters long");
        }
      }

      setSuccessMessage(`${section.charAt(0).toUpperCase() + section.slice(1)} settings updated successfully!`);
      
      // Clear passwords after successful update
      if (section === "password") {
        handleInputChange("password", "currentPassword", "");
        handleInputChange("password", "newPassword", "");
        handleInputChange("password", "confirmPassword", "");
      }
    } catch (error) {
      setErrorMessage(error.message || "Failed to update settings");
    } finally {
      setLoading(false);
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const tabs = [
    { id: "profile", icon: FaUser, label: "Profile" },
    { id: "password", icon: FaLock, label: "Password" },
    { id: "notifications", icon: FaBell, label: "Notifications" },
    { id: "appearance", icon: FaPalette, label: "Appearance" },
  ];

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={settings.profile.avatar || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
            <FaCamera className="text-white" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            First Name
          </label>
          <input
            type="text"
            value={settings.profile.firstName}
            onChange={(e) => handleInputChange("profile", "firstName", e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300"
            } focus:border-blue-500 focus:ring-blue-500`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Last Name
          </label>
          <input
            type="text"
            value={settings.profile.lastName}
            onChange={(e) => handleInputChange("profile", "lastName", e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300"
            } focus:border-blue-500 focus:ring-blue-500`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Email
          </label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => handleInputChange("profile", "email", e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300"
            } focus:border-blue-500 focus:ring-blue-500`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Phone
          </label>
          <input
            type="tel"
            value={settings.profile.phone}
            onChange={(e) => handleInputChange("profile", "phone", e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300"
            } focus:border-blue-500 focus:ring-blue-500`}
          />
        </div>
      </div>
    </div>
  );

  const renderPasswordSettings = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Current Password
        </label>
        <input
          type="password"
          value={settings.password.currentPassword}
          onChange={(e) => handleInputChange("password", "currentPassword", e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "border-gray-300"
          } focus:border-blue-500 focus:ring-blue-500`}
        />
      </div>
      <div>
        <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          New Password
        </label>
        <input
          type="password"
          value={settings.password.newPassword}
          onChange={(e) => handleInputChange("password", "newPassword", e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "border-gray-300"
          } focus:border-blue-500 focus:ring-blue-500`}
        />
      </div>
      <div>
        <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Confirm New Password
        </label>
        <input
          type="password"
          value={settings.password.confirmPassword}
          onChange={(e) => handleInputChange("password", "confirmPassword", e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "border-gray-300"
          } focus:border-blue-500 focus:ring-blue-500`}
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {Object.entries(settings.notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {key.split(/(?=[A-Z])/).join(" ")}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleInputChange("notifications", key, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      ))}
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Language
        </label>
        <select
          value={settings.appearance.language}
          onChange={(e) => handleInputChange("appearance", "language", e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "border-gray-300"
          } focus:border-blue-500 focus:ring-blue-500`}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
      <div>
        <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Time Zone
        </label>
        <select
          value={settings.appearance.timezone}
          onChange={(e) => handleInputChange("appearance", "timezone", e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "border-gray-300"
          } focus:border-blue-500 focus:ring-blue-500`}
        >
          <option value="UTC">UTC</option>
          <option value="EST">EST</option>
          <option value="PST">PST</option>
        </select>
      </div>
      <div>
        <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Date Format
        </label>
        <select
          value={settings.appearance.dateFormat}
          onChange={(e) => handleInputChange("appearance", "dateFormat", e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "border-gray-300"
          } focus:border-blue-500 focus:ring-blue-500`}
        >
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
        </select>
      </div>
      <div>
        <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Time Format
        </label>
        <select
          value={settings.appearance.timeFormat}
          onChange={(e) => handleInputChange("appearance", "timeFormat", e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "border-gray-300"
          } focus:border-blue-500 focus:ring-blue-500`}
        >
          <option value="12h">12 Hour</option>
          <option value="24h">24 Hour</option>
        </select>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileSettings();
      case "password":
        return renderPasswordSettings();
      case "notifications":
        return renderNotificationSettings();
      case "appearance":
        return renderAppearanceSettings();
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 flex items-center ${darkMode ? "text-white" : "text-black"}`}>
          <FaCog className="mr-2" /> Settings
        </h1>

        {/* Settings Container */}
        <div className={`rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          {/* Tabs */}
          <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium ${
                  activeTab === tab.id
                    ? `${darkMode ? "text-blue-500" : "text-blue-600"} border-b-2 border-blue-500`
                    : `${darkMode ? "text-gray-400" : "text-gray-500"} hover:text-gray-700 dark:hover:text-gray-300`
                }`}
              >
                <tab.icon className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            {renderContent()}

            {/* Messages */}
            {errorMessage && (
              <div className={`mt-4 p-4 rounded-md ${darkMode ? "bg-red-900 text-red-200" : "bg-red-100 text-red-700"}`}>
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className={`mt-4 p-4 rounded-md ${darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-700"}`}>
                {successMessage}
              </div>
            )}

            {/* Save Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSubmit(activeTab)}
              disabled={loading}
              className={`mt-6 w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Save Changes
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserSettings;
