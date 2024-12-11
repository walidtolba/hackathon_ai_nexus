import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaMoneyBillWave, FaClock, FaCalendarAlt } from 'react-icons/fa';

const WorkerProfile = () => {
  // Mock data - replace with actual API call
  const workerData = {
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1234567890",
    position: "Software Engineer",
    department: "Engineering",
    joinDate: "2023-01-15",
    baseSalary: "60,000",
    bonuses: "5,000",
    leaveBalance: {
      annual: 15,
      sick: 7,
      casual: 5
    },
    workingHours: "40 hours/week"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaUser className="mr-2" /> Personal Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaUser className="text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium">{workerData.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium">{workerData.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="font-medium">{workerData.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Employment Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaMoneyBillWave className="mr-2" /> Employment Details
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Position</p>
              <p className="font-medium">{workerData.position}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
              <p className="font-medium">{workerData.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Join Date</p>
              <p className="font-medium">{workerData.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Salary Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaMoneyBillWave className="mr-2" /> Salary Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Base Salary (Annual)</p>
              <p className="font-medium">${workerData.baseSalary}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Bonuses (Year to Date)</p>
              <p className="font-medium">${workerData.bonuses}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Working Hours</p>
              <p className="font-medium">{workerData.workingHours}</p>
            </div>
          </div>
        </div>

        {/* Leave Balance Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaCalendarAlt className="mr-2" /> Leave Balance
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Annual Leave</p>
              <p className="font-medium">{workerData.leaveBalance.annual} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sick Leave</p>
              <p className="font-medium">{workerData.leaveBalance.sick} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Casual Leave</p>
              <p className="font-medium">{workerData.leaveBalance.casual} days</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkerProfile;
