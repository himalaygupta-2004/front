import React from "react";

function CategorizedAppsTable({ categorizedApps }) {
  if (!categorizedApps || Object.keys(categorizedApps).length === 0) {
    return null;
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6 mt-8'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>
        Categorized Applications
      </h2>
      {Object.entries(categorizedApps).map(([category, files], index) => (
        <div key={index} className='mb-6 border-b pb-4 last:border-b-0'>
          <h3 className='text-lg font-semibold text-gray-700 mb-2'>
            {category}
          </h3>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    File Path
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {Array.isArray(files) &&
                  files.map((filePath, fileIndex) => (
                    <tr key={fileIndex}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 break-all'>
                        {filePath}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategorizedAppsTable;
