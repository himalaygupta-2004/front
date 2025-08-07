// src/components/PreviewModal.jsx

import React from "react";

function PreviewModal({ content, onClose }) {
  if (!content) {
    return null;
  }

  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6 relative'>
        <h3 className='text-xl font-bold text-gray-800 mb-4'>File Preview</h3>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-800'
        >
          &times;
        </button>
        <div className='bg-gray-100 p-4 rounded-md overflow-auto max-h-96 whitespace-pre-wrap text-gray-800'>
          {content}
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;
