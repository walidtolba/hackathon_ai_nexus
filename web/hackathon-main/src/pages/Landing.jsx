import React from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChartBar,
  FaFileContract,
  FaUserClock,
  FaBell,
  FaChartLine,
  FaFileSignature,
} from "react-icons/fa";
import { Link } from "react-router";

const LandingPage = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const features = [
    {
      icon: FaCalendarAlt,
      title: "Absence & Leave Management",
      description: "Streamline leave requests and track absences efficiently.",
    },
    {
      icon: FaMoneyBillWave,
      title: "Payroll Tracking",
      description: "Simplify payroll processing with automated calculations.",
    },
    {
      icon: FaChartBar,
      title: "Accounting Reports",
      description: "Generate comprehensive financial reports with ease.",
    },
    {
      icon: FaFileContract,
      title: "Contract & Document Management",
      description: "Securely store and manage all worker documents.",
    },
  ];

  const detailedFeatures = [
    {
      title: "Absence and Leave Management",
      description:
        "Efficiently manage worker absences and leave requests with our comprehensive system.",
      image: "../images/absence.jpg",
      icon: FaCalendarAlt,
      items: [
        "Portal to request and approve leave based on available balance",
        "Automatic notifications for unforeseen absences",
        "Dashboard displaying recurring absences or critical periods",
        "Integration with payroll for accurate leave calculations",
      ],
    },
    {
      title: "Payroll Tracking",
      description:
        "Simplify your payroll process with our advanced tracking and reporting tools.",
      image: "../images/payroll.jpg",
      icon: FaMoneyBillWave,
      items: [
        "Automatic generation of payslips according to local regulations",
        "Secure access to payslips via personal worker space",
        "Visualization of deductions and benefits (bonuses, allowances)",
        "Integration with accounting software for seamless financial management",
      ],
    },
    {
      title: "Accounting Reports",
      description:
        "Generate comprehensive financial reports to make data-driven decisions for your business.",
      image: "../images/manage.jpg",
      icon: FaChartBar,
      items: [
        "Export HR data directly to accounting software",
        "Generate reports to analyze overall cost of human resources",
        "Breakdown of expenses by department, project, or period",
        "Custom report generation for specific business needs",
      ],
    },
    {
      title: "Contract and HR Document Management",
      description:
        "Securely store and manage all your HR documents in one centralized location.",
      image: "../images/contract.jpg",
      icon: FaFileContract,
      items: [
        "Digital archiving of employment contracts and amendments",
        "Electronic signature integration for faster contract management",
        "Automatic reminders for contract renewals and important deadlines",
        "Secure document sharing and access control",
      ],
    },
  ];

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl shadow-lg ${
        darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
      } transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        {description}
      </p>
    </motion.div>
  );

  const FeatureSection = ({
    title,
    description,
    image,
    icon: Icon,
    items,
    reverse,
  }) => (
    <div className={`py-20 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
      <div className="container mx-auto px-6">
        <div
          className={`flex flex-col lg:flex-row items-center ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <motion.img
              initial={{ opacity: 0, x: reverse ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              src={image}
              alt={title}
              className="rounded-lg shadow-xl  w-full max-w-md mx-auto"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>
          <div className="lg:w-1/2 lg:pl-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <Icon className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold">{title}</h2>
              </div>
              <p
                className={`text-xl mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {description}
              </p>
              <ul className="space-y-4">
                {items.map((item, index) => {
                  let ItemIcon;
                  switch (index) {
                    case 0:
                      ItemIcon = FaUserClock;
                      break;
                    case 1:
                      ItemIcon = FaBell;
                      break;
                    case 2:
                      ItemIcon = FaChartLine;
                      break;
                    case 3:
                      ItemIcon = FaFileSignature;
                      break;
                    default:
                      ItemIcon = FaUserClock;
                  }
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0 }}
                      className="flex items-start"
                    >
                      <ItemIcon className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {item}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header className="bg-white py-4 shadow-md">
        <nav className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
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
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
            <Link to={"/login"} className="text-gray-600 hover:underline">
              <button className="px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                Login
              </button>
            </Link>
            <Link to={"/signup"} className="text-gray-600 hover:underline">
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Sign Up
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-20 landing-home">
        <div className="container mx-auto px-6 text-center ">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8"
          >
            Transform Your HR Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-12 text-gray-600"
          >
            Streamline your HR processes with our all-in-one solution
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button className="px-8 py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 rounded-lg bg-white text-lg font-semibold hover:bg-gray-100 transition-colors">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-16"
          >
            Powerful Features for Modern HR
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Feature Sections */}
      {detailedFeatures.map((feature, index) => (
        <FeatureSection
          key={feature.title}
          title={feature.title}
          description={feature.description}
          image={feature.image}
          icon={feature.icon}
          items={feature.items}
          reverse={index % 2 !== 0}
        />
      ))}

      {/* CTA Section */}
      <section className={`py-20 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-8"
          >
            Ready to Transform Your HR Management?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-xl mb-12 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Join thousands of companies already using BlueBird HR
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button className="px-8 py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Free Trial
            </button>
            <button
              className={`px-8 py-3 rounded-lg text-lg font-semibold ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-white hover:bg-gray-50"
              } transition-colors`}
            >
              Login
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="container mx-auto px-6 text-center">
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            © 2024 NexHR. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
