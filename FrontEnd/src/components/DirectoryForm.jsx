import React, { useState } from "react";

function DirectoryForm({ onScan, isLoading, scanType, setScanType }) {
  const [path, setPath] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (path) {
      onScan(path);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col sm:flex-row items-center gap-4'>
          <input
            type='text'
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder='Enter directory path to scan (e.g., C:/Users/Docs)'
            className='flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500'
            required
          />
          <button
            type='submit'
            className='bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300'
            disabled={isLoading}
          >
            {isLoading ? "Scanning..." : "Scan"}
          </button>
        </div>
      </form>
      <div className='mt-4 flex flex-col sm:flex-row items-center gap-4'>
        <label className='flex items-center space-x-2'>
          <input
            type='radio'
            name='scanType'
            value='EXACT'
            checked={scanType === "EXACT"}
            onChange={(e) => setScanType(e.target.value)}
            className='form-radio text-blue-600'
          />
          <span>Exact Scan (SHA-256)</span>
        </label>
        <label className='flex items-center space-x-2'>
          <input
            type='radio'
            name='scanType'
            value='FUZZY'
            checked={scanType === "FUZZY"}
            onChange={(e) => setScanType(e.target.value)}
            className='form-radio text-blue-600'
          />
          <span>Fuzzy Scan (Size-based)</span>
        </label>
      </div>
    </div>
  );
}

export default DirectoryForm;
