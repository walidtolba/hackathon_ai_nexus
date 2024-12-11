import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import {
  FaGraduationCap,
  FaBook,
  FaCalendarAlt,
  FaTrophy,
  FaChartLine,
  FaCheckCircle,
  FaPlayCircle,
  FaCertificate,
  FaLock,
} from 'react-icons/fa';

const WorkerTraining = () => {
  const { darkMode } = useTheme();
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Mock data - Replace with API calls
  const courses = [
    {
      id: 1,
      title: 'Workplace Safety Fundamentals',
      progress: 80,
      duration: '2 hours',
      completed: true,
      description: 'Learn essential workplace safety protocols and best practices.',
      modules: ['Safety Basics', 'Emergency Procedures', 'Risk Assessment'],
    },
    {
      id: 2,
      title: 'Communication Skills',
      progress: 60,
      duration: '3 hours',
      completed: false,
      description: 'Enhance your professional communication abilities.',
      modules: ['Active Listening', 'Presentation Skills', 'Written Communication'],
    },
    {
      id: 3,
      title: 'Time Management',
      progress: 30,
      duration: '1.5 hours',
      completed: false,
      description: 'Master techniques for better time management and productivity.',
      modules: ['Priority Setting', 'Planning Tools', 'Productivity Tips'],
    },
  ];

  const upcomingTraining = [
    {
      id: 1,
      title: 'Leadership Workshop',
      date: '2024-12-20',
      time: '10:00 AM',
      instructor: 'Sarah Johnson',
      type: 'Virtual',
    },
    {
      id: 2,
      title: 'Project Management Basics',
      date: '2024-12-25',
      time: '2:00 PM',
      instructor: 'Michael Chen',
      type: 'In-Person',
    },
  ];

  const skills = [
    { name: 'Communication', level: 85 },
    { name: 'Technical Skills', level: 75 },
    { name: 'Leadership', level: 60 },
    { name: 'Problem Solving', level: 80 },
  ];

  const certifications = [
    {
      id: 1,
      name: 'Workplace Safety Certificate',
      issueDate: '2023-11-15',
      expiryDate: '2024-11-15',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Communication Excellence',
      issueDate: '2023-10-01',
      expiryDate: '2024-10-01',
      status: 'Active',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <h1
        className={`text-3xl font-bold mb-8 flex items-center ${
          darkMode ? 'text-white' : 'text-black'
        }`}
      >
        <FaGraduationCap className="mr-2" /> Training & Development
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Courses */}
          <div
            className={`rounded-xl shadow-lg p-6 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              <FaBook className="mr-2" /> My Courses
            </h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    darkMode
                      ? 'hover:bg-gray-700 bg-gray-750'
                      : 'hover:bg-gray-50 bg-gray-100'
                  }`}
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className={`font-semibold ${
                        darkMode ? 'text-white' : 'text-black'
                      }`}>
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Duration: {course.duration}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {course.completed ? (
                        <FaCheckCircle className="text-green-500 text-xl" />
                      ) : (
                        <div className="relative w-12 h-12">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {course.progress}%
                            </span>
                          </div>
                          <svg className="transform -rotate-90 w-12 h-12">
                            <circle
                              className="text-gray-300"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="transparent"
                              r="20"
                              cx="24"
                              cy="24"
                            />
                            <circle
                              className="text-blue-600"
                              strokeWidth="2"
                              strokeDasharray={125.6}
                              strokeDashoffset={125.6 * (1 - course.progress / 100)}
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r="20"
                              cx="24"
                              cy="24"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  {selectedCourse?.id === course.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {course.description}
                      </p>
                      <div className="space-y-2">
                        {course.modules.map((module, index) => (
                          <div
                            key={index}
                            className={`flex items-center p-2 rounded ${
                              darkMode ? 'bg-gray-700' : 'bg-gray-200'
                            }`}
                          >
                            <FaPlayCircle className="mr-2 text-blue-500" />
                            <span>{module}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Training */}
          <div
            className={`rounded-xl shadow-lg p-6 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              <FaCalendarAlt className="mr-2" /> Upcoming Training Sessions
            </h2>
            <div className="space-y-4">
              {upcomingTraining.map((training) => (
                <div
                  key={training.id}
                  className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-750' : 'bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className={`font-semibold ${
                        darkMode ? 'text-white' : 'text-black'
                      }`}>
                        {training.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {training.date} at {training.time}
                      </p>
                      <p className="text-sm text-gray-500">
                        Instructor: {training.instructor}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        training.type === 'Virtual'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {training.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills Progress */}
          <div
            className={`rounded-xl shadow-lg p-6 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              <FaChartLine className="mr-2" /> Skills Progress
            </h2>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className={darkMode ? 'text-white' : 'text-black'}>
                      {skill.name}
                    </span>
                    <span className="text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div
            className={`rounded-xl shadow-lg p-6 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              <FaCertificate className="mr-2" /> My Certifications
            </h2>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-750' : 'bg-gray-100'
                  }`}
                >
                  <h3 className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-black'
                  }`}>
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Issued: {cert.issueDate}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires: {cert.expiryDate}
                  </p>
                  <span
                    className={`inline-block mt-2 px-2 py-1 rounded text-sm ${
                      cert.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkerTraining;
