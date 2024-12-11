import axios from "../../../axios";
import React, { useEffect, useState } from "react";

const LeaveRequests = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);

  const handleNameClick = (request) => {
    setSelectedRequest(request);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedRequest(null);
  };

  const handleApprove = async () => {
    try {
      await axios.put(
        "/hr/approve/",
        { id: selectedRequest.id },
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("authToken"),
          },
        }
      );
      alert(`Approved request for ${selectedRequest.first_name}`);
      setLeaveRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== selectedRequest.id)
      );
      closePopup();
    } catch (error) {
      console.error("Error approving leave request:", error);
      alert("Failed to approve the leave request.");
    }
  };

  const handleReject = async () => {
    try {
      await axios.delete(
        "/hr/approve/",
        {
          data: { id: selectedRequest.id },
          headers: {
            Authorization: "Token " + localStorage.getItem("authToken"),
          },
        }
      );
      alert(`Rejected request for ${selectedRequest.first_name}`);
      setLeaveRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== selectedRequest.id)
      );
      closePopup();
    } catch (error) {
      console.error("Error rejecting leave request:", error);
      alert("Failed to reject the leave request.");
    }
  };

  useEffect(() => {
    axios
      .get("/hr/list_others_leave/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("authToken"),
        },
      })
      .then((response) => setLeaveRequests(response.data || []))
      .catch((error) => console.error("Error fetching leave requests:", error));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Leave Requests</h2>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Leave Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, i) => (
              <tr
                key={request.id}
                className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer"
                  onClick={() => handleNameClick(request)}
                >
                  {request.first_name} {request.last_name || `User ${i}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {request.leaveType || "sick"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {request.start_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {request.end_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200">
                    {request.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              Review Request
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Do you want to approve the leave request for <strong>{selectedRequest.first_name}</strong> from <strong>{selectedRequest.start_date}</strong> to <strong>{selectedRequest.end_date}</strong>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-300"
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-300"
              >
                Reject
              </button>
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequests;