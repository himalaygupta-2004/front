import React from "react";

function DuplicatesTable({
  duplicates,
  onFileSelect,
  selectedFiles,
  onBulkDelete,
  onDeleteIndividual,
  onPreview,
  isLoading,
}) {
  const selectedCount = Object.keys(selectedFiles).length;

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold text-gray-800'>Duplicate Files</h2>
        {selectedCount > 0 && (
          <button
            onClick={onBulkDelete}
            className='bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition-colors disabled:bg-red-300'
            disabled={isLoading}
          >
            Delete Selected ({selectedCount})
          </button>
        )}
      </div>
      {duplicates.length > 0 ? (
        duplicates.map((group, groupIndex) => (
          <div key={groupIndex} className='mb-6 border-b pb-4 last:border-b-0'>
            <h3 className='text-lg font-semibold text-gray-700 mb-2'>
              Duplicate Group {groupIndex + 1}
            </h3>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Select
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      File Path
                    </th>
                    <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {group.map((fileInfo, fileIndex) => (
                    <tr key={fileIndex}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <input
                          type='checkbox'
                          checked={!!selectedFiles[fileInfo.path]}
                          onChange={(e) =>
                            onFileSelect(fileInfo.path, e.target.checked)
                          }
                          className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                        />
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 break-all'>
                        {fileInfo.path}{" "}
                        {/* This is the fix: access the 'path' property */}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        <div className='flex justify-end gap-2'>
                          <button
                            onClick={() => onPreview(fileInfo.path)}
                            className='text-blue-600 hover:text-blue-900'
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => onDeleteIndividual(fileInfo.path)}
                            className='text-red-600 hover:text-red-900'
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <p className='text-gray-500'>No duplicate files found.</p>
      )}
    </div>
  );
}

export default DuplicatesTable;
