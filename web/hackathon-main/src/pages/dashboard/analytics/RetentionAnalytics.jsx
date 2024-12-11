import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import {
  FaUserMinus,
  FaUserPlus,
  FaExclamationTriangle,
  FaChartPie,
  FaSearch,
  FaFilter,
  FaDownload,
} from 'react-icons/fa';
import axios from '../../../axios';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const RetentionAnalytics = () => {
  const { darkMode } = useTheme();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({
    totalEmployees: 0,
    retentionRisk: 0,
    stableEmployees: 0,
  });

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/hr/predict_left/', {}, {
        headers: {
          'Authorization': "Token " + localStorage.getItem("authToken")
        }
      });
      
      // Transform the response data to match the component's expected structure
      const transformedEmployees = response.data.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        retention_prediction: employee.prediction,
        department: 'N/A' // You might want to add department data if available
      }));

      setEmployees(transformedEmployees);
      calculateStats(transformedEmployees);
    } catch (err) {
      setError('Failed to fetch employee data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const atRisk = data.filter(emp => emp.retention_prediction === 1).length;
    setStats({
      totalEmployees: total,
      retentionRisk: atRisk,
      stableEmployees: total - atRisk,
    });
  };

  const pieData = [
    { name: 'At Risk', value: stats.retentionRisk },
    { name: 'Stable', value: stats.stableEmployees },
  ];

  const COLORS = ['#ff4d4d', '#4CAF50'];

  const filteredEmployees = employees
    .filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' 
        || (filterStatus === 'risk' && emp.retention_prediction === 1)
        || (filterStatus === 'stable' && emp.retention_prediction === 0);
      return matchesSearch && matchesFilter;
    });

  const getStatusColor = (prediction) => {
    return prediction === 1 ? 'text-red-500' : 'text-green-500';
  };

  const getStatusBg = (prediction) => {
    return prediction === 1 
      ? 'bg-red-100 dark:bg-red-900/20' 
      : 'bg-green-100 dark:bg-green-900/20';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`p-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <FaChartPie className="mr-2" />
          Employee Retention Analytics
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Monitor and analyze employee retention predictions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Employees</p>
              <h3 className="text-2xl font-bold">{stats.totalEmployees}</h3>
            </div>
            <div className={`p-3 rounded-full ${darkMode ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
              <FaUserPlus className="text-blue-500" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">At Risk</p>
              <h3 className="text-2xl font-bold text-red-500">{stats.retentionRisk}</h3>
            </div>
            <div className={`p-3 rounded-full ${darkMode ? 'bg-red-900/20' : 'bg-red-100'}`}>
              <FaUserMinus className="text-red-500" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Stable</p>
              <h3 className="text-2xl font-bold text-green-500">{stats.stableEmployees}</h3>
            </div>
            <div className={`p-3 rounded-full ${darkMode ? 'bg-green-900/20' : 'bg-green-100'}`}>
              <FaUserPlus className="text-green-500" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Pie Chart */}
        <div
          className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">Retention Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters and Search */}
        <div
          className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="relative w-full md:w-64 mb-4 md:mb-0">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>
            <div className="flex space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300'
                }`}
              >
                <option value="all">All Employees</option>
                <option value="risk">At Risk</option>
                <option value="stable">Stable</option>
              </select>
              <button
                className={`px-4 py-2 rounded-lg flex items-center ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                <FaDownload className="mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Employee List */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 text-left">Employee</th>
                  <th className="py-3 text-left">Department</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                          {employee.name.charAt(0)}
                        </div>
                        <span>{employee.name}</span>
                      </div>
                    </td>
                    <td className="py-3">{employee.department}</td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                          employee.retention_prediction
                        )} ${getStatusBg(employee.retention_prediction)}`}
                      >
                        {employee.retention_prediction === 1 ? 'At Risk' : 'Stable'}
                      </span>
                    </td>
                    <td className="py-3">
                      <button
                        className={`px-3 py-1 rounded-lg text-sm ${
                          darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 flex items-center justify-center py-8">
          <FaExclamationTriangle className="mr-2" />
          {error}
        </div>
      )}
    </motion.div>
  );
};

export default RetentionAnalytics;