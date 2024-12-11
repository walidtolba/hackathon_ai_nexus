import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const SeeAbsences = () => {
  const navigate = useNavigate();

  const mockAbsences = [
    { id: 1, name: "John Doe", date: "2024-12-10", reason: "Sick" },
    { id: 2, name: "Jane Smith", date: "2024-12-11", reason: "Vacation" },
    { id: 3, name: "Mike Johnson", date: "2024-12-12", reason: "Remote Work" },
  ];

  const handleSeeDetails = (id) => {
    navigate(`/absences/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">All Absences</h1>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mockAbsences.map((absence) => (
              <tr
                key={absence.id}
                className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {absence.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {absence.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {absence.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleSeeDetails(absence.id)}
                    className="px-4 py-2 bg-blue-500 text-white text-xs font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300"
                  >
                    See Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Outlet for nested routes */}
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default SeeAbsences;
