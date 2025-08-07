import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function RuleManager() {
  const [rules, setRules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/rules");
      setRules(response.data);
    } catch (err) {
      toast.error("Failed to fetch rules.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRuleChange = (index, field, value) => {
    const newRules = [...rules];
    if (field === "keywords") {
      newRules[index][field] = value.split(",").map((k) => k.trim());
    } else {
      newRules[index][field] = value;
    }
    setRules(newRules);
  };

  const handleAddRule = () => {
    setRules([...rules, { category: "", keywords: [] }]);
  };

  const handleDeleteRule = (index) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  const handleSaveRules = async () => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8080/api/rules", rules);
      toast.success("Rules saved successfully!");
    } catch (err) {
      toast.error("Failed to save rules.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading rules...</p>;
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6 mt-8'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>
        Manage Categorization Rules
      </h2>
      <div className='space-y-4'>
        {rules.map((rule, index) => (
          <div
            key={index}
            className='flex flex-col sm:flex-row items-center gap-4 border p-4 rounded-md'
          >
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700'>
                Category Name
              </label>
              <input
                type='text'
                value={rule.category}
                onChange={(e) =>
                  handleRuleChange(index, "category", e.target.value)
                }
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
              />
            </div>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700'>
                Keywords (comma-separated)
              </label>
              <input
                type='text'
                value={rule.keywords.join(", ")}
                onChange={(e) =>
                  handleRuleChange(index, "keywords", e.target.value)
                }
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
              />
            </div>
            <button
              onClick={() => handleDeleteRule(index)}
              className='bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors mt-auto'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className='mt-6 flex gap-4'>
        <button
          onClick={handleAddRule}
          className='bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors'
        >
          Add Rule
        </button>
        <button
          onClick={handleSaveRules}
          className='bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors'
        >
          Save Rules
        </button>
      </div>
    </div>
  );
}

export default RuleManager;
