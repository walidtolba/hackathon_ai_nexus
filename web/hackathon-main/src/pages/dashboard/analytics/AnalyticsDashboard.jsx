import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
  FaUserClock,
  FaCalendarCheck,
} from 'react-icons/fa';

const AnalyticsDashboard = () => {
  const { darkMode } = useTheme();
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-800';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';

  // Mock data - Replace with actual API calls
  const attendanceData = [
    { month: 'Jan', present: 95, absent: 5, late: 2 },
    { month: 'Feb', present: 92, absent: 8, late: 3 },
    { month: 'Mar', present: 88, absent: 12, late: 5 },
    { month: 'Apr', present: 90, absent: 10, late: 4 },
    { month: 'May', present: 93, absent: 7, late: 3 },
    { month: 'Jun', present: 91, absent: 9, late: 4 },
  ];

  const salaryData = [
    { name: 'Engineering', value: 40 },
    { name: 'Marketing', value: 20 },
    { name: 'Sales', value: 25 },
    { name: 'HR', value: 15 },
  ];

  const performanceData = [
    { month: 'Jan', performance: 85 },
    { month: 'Feb', performance: 88 },
    { month: 'Mar', performance: 92 },
    { month: 'Apr', performance: 90 },
    { month: 'May', performance: 95 },
    { month: 'Jun', performance: 93 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const stats = [
    {
      title: 'Total Employees',
      value: '156',
      change: '+12%',
      icon: FaUsers,
      color: 'text-blue-500',
    },
    {
      title: 'Average Salary',
      value: '$5,234',
      change: '+5%',
      icon: FaMoneyBillWave,
      color: 'text-green-500',
    },
    {
      title: 'Performance',
      value: '92%',
      change: '+3%',
      icon: FaChartLine,
      color: 'text-purple-500',
    },
    {
      title: 'Attendance Rate',
      value: '95%',
      change: '+1%',
      icon: FaUserClock,
      color: 'text-yellow-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`${cardBg} rounded-lg shadow-lg p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${textColor} opacity-70`}>{stat.title}</p>
                <h3 className={`text-2xl font-bold ${textColor} mt-1`}>
                  {stat.value}
                </h3>
                <span className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change} from last month
                </span>
              </div>
              <div className={`${stat.color} p-3 rounded-full bg-opacity-20`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`${cardBg} rounded-lg shadow-lg p-6`}
        >
          <h2 className={`text-xl font-bold ${textColor} mb-4`}>
            <FaUserClock className="inline mr-2" />
            Attendance Overview
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#0088FE" />
                <Bar dataKey="absent" fill="#FF8042" />
                <Bar dataKey="late" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Salary Distribution */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`${cardBg} rounded-lg shadow-lg p-6`}
        >
          <h2 className={`text-xl font-bold ${textColor} mb-4`}>
            <FaMoneyBillWave className="inline mr-2" />
            Salary Distribution by Department
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salaryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salaryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Performance Trend */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`${cardBg} rounded-lg shadow-lg p-6`}
        >
          <h2 className={`text-xl font-bold ${textColor} mb-4`}>
            <FaChartLine className="inline mr-2" />
            Performance Trend
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`${cardBg} rounded-lg shadow-lg p-6`}
        >
          <h2 className={`text-xl font-bold ${textColor} mb-4`}>
            <FaCalendarCheck className="inline mr-2" />
            Recent Activities
          </h2>
          <div className="space-y-4">
            {[
              {
                title: 'New Employee Onboarded',
                time: '2 hours ago',
                description: 'Sarah Johnson joined the Engineering team',
              },
              {
                title: 'Performance Review Completed',
                time: '5 hours ago',
                description: 'Q2 performance reviews for Marketing department',
              },
              {
                title: 'Salary Updates',
                time: '1 day ago',
                description: 'Annual salary adjustments processed',
              },
              {
                title: 'Training Session',
                time: '2 days ago',
                description: 'Leadership training for senior managers',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className={`border-l-4 border-blue-500 pl-4 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                } p-4 rounded`}
              >
                <h3 className={`font-semibold ${textColor}`}>
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-500">{activity.time}</p>
                <p className={`mt-1 ${textColor} opacity-80`}>
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalyticsDashboard;
