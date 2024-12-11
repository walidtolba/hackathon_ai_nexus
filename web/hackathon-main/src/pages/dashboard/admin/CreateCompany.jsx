import React, { useState } from "react";
import Select from "react-select";
import { useTheme } from "../../../context/ThemeContext";
import { FaBuilding } from "react-icons/fa";
import axios from "../../../axios"

const CreateCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [policyAmounts, setPolicyAmounts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const { darkMode } = useTheme();

  const policyOptions = {
    "imposable et cotisable": [
      "fixed_salary_part",
      "variable_part",
      "iep",
      "shift_work_allowance",
      "ifsp",
      "disruption_allowance",
      "night_work_allowance",
      "interim_allowance",
      "standby_bonus",
      "on_call_allowance",
      "overtime",
      "annual_leave_allowance",
      "inventory_bonus",
      "end_of_year_bonus",
      "pri",
      "prc",
      "annual_encouragement_bonus",
      "annual_profit_bonus",
    ],
    "imposable": [
      "innovation_bonus",
      "meal_allowance",
      "transport",
      "phone",
      "iuvp",
      "exceptional_bonus",
    ],
    "cotisable et non imposable": [],
    "no cotisable no imposable": [
      "career_retirement_end_allowance",
      "death_allowance",
      "family_allowances",
      "school_bonus",
      "unique_salary",
      "mission_expenses",
      "zone_bonus",
      "dismissal_allowance",
      "children_of_martyrs_bonus",
    ],
  };

  const formattedPolicyOptions = Object.entries(policyOptions).flatMap(
    ([category, policies]) =>
      policies.map((policy) => ({
        value: policy,
        label: `${policy.replace(/_/g, " ")} (${category})`,
      }))
  );

  const handlePolicyChange = (selected) => {
    setSelectedPolicies(selected);
    const updatedPolicyAmounts = { ...policyAmounts };

    // Remove amounts for deselected policies
    Object.keys(updatedPolicyAmounts).forEach((policy) => {
      if (!selected.some((item) => item.value === policy)) {
        delete updatedPolicyAmounts[policy];
      }
    });

    // Add empty amounts for newly selected policies
    selected.forEach((policy) => {
      if (!(policy.value in updatedPolicyAmounts)) {
        updatedPolicyAmounts[policy.value] = 0;
      }
    });

    setPolicyAmounts(updatedPolicyAmounts);
  };

  const handleAmountChange = (policy, amount) => {
    setPolicyAmounts((prev) => ({ ...prev, [policy]: parseFloat(amount) || 0 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });
  
    // Create data structure with selected policies and their amounts
    const data = {
      company: companyName,
      ...Object.fromEntries(
        Object.entries(policyAmounts).filter(([_, amount]) => amount > 0)
      ),
    };
  
    console.log(data);
  
    try {
      const response = await axios.post("/hr/create_company/", data, {
        headers: { "Content-Type": "application/json", 
          "Authorization": "Token "+ localStorage.getItem("authToken") 
         },
      });
  
      // If the request is successful (status 2xx), handle success
      if (response.status >= 200 && response.status < 300) {
        setMessage({ type: "success", text: "Company created successfully!" });
        setCompanyName("");
        setSelectedPolicies([]);
        setPolicyAmounts({});
      } else {
        throw new Error("Error creating company");
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Error creating company" });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className={`min-h-full p-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
      <div className="max-w-2xl mx-auto">
        <div className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center mb-6">
            <FaBuilding className="text-3xl mr-3 text-blue-500" />
            <h1 className="text-2xl font-bold">Create New Company</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="companyName"
                className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                required
                className={`w-full p-3 rounded-lg border ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label
                htmlFor="policies"
                className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
              >
                Select Policies
              </label>
              <Select
                id="policies"
                options={formattedPolicyOptions}
                isMulti
                value={selectedPolicies}
                onChange={handlePolicyChange}
                className="rounded-lg"
                classNamePrefix="react-select"
              />
            </div>

            {selectedPolicies.map((policy) => (
              <div key={policy.value} className="mb-4">
                <label
                  htmlFor={`amount-${policy.value}`}
                  className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                >
                  Enter Amount for {policy.label}
                </label>
                <input
                  type="number"
                  id={`amount-${policy.value}`}
                  value={policyAmounts[policy.value] || ""}
                  onChange={(e) => handleAmountChange(policy.value, e.target.value)}
                  placeholder="Enter amount"
                  className={`w-full p-3 rounded-lg border ${
                    darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            ))}

            {message.text && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium ${
                darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
              } text-white transition-colors duration-200 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Creating..." : "Create Company"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
