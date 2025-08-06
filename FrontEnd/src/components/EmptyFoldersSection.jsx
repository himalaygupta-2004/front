import React from "react";

function EmptyFoldersSection({ folders }) {
  if (!folders || folders.length === 0) {
    return null;
  }
  return (
    <div className='bg-white rounded-lg shadow-md p-6 mt-8'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>Empty Folders</h2>
      <ul className='space-y-2'>
        {folders.map((folderPath, index) => (
          <li
            key={index}
            className='bg-gray-50 p-3 rounded-md border text-sm text-gray-800 break-all'
          >
            {folderPath}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmptyFoldersSection;
