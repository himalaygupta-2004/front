// import './App.css'

// import React, { useState } from 'react';
// import axios from 'axios';

// // --- Helper Components ---
// const Spinner = () => (
//     <div className="flex justify-center items-center my-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//     </div>
// );

// const MessageBox = ({ message, type }) => {
//     const baseClasses = "p-4 my-4 rounded-md text-white";
//     const typeClasses = type === 'error' ? 'bg-red-500' : 'bg-green-500';
//     return <div className={`${baseClasses} ${typeClasses}`}>{message}</div>;
// };

// // --- Main Components ---
// const DirectoryForm = ({ onScan, isLoading }) => {
//     const [path, setPath] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (path) {
//             onScan(path);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4 text-gray-700">Scan Directory</h2>
//             <div className="flex flex-col sm:flex-row gap-4">
//                 <input
//                     type="text"
//                     value={path}
//                     onChange={(e) => setPath(e.target.value)}
//                     placeholder="Enter absolute directory path (e.g., C:\Program Files)"
//                     className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     disabled={isLoading}
//                 />
//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
//                     disabled={isLoading}
//                 >
//                     {isLoading ? 'Scanning...' : 'Scan for Duplicates'}
//                 </button>
//             </div>
//         </form>
//     );
// };

// const DuplicatesSection = ({ duplicates, onFileSelect, selectedFiles, onDelete, isLoading }) => {
//     if (!duplicates.length) return null;

//     return (
//         <div className="p-6 bg-white rounded-lg shadow-md mb-8">
//             <h2 className="text-2xl font-bold mb-4 text-gray-700">Duplicate Files Found</h2>
//             {duplicates.map((group, index) => (
//                 <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
//                     <h3 className="font-semibold text-lg mb-2 text-gray-600">
//                         Group {index + 1} ({group.length} duplicates of size {(group[0].size / 1024).toFixed(2)} KB)
//                     </h3>
//                     <ul className="space-y-2">
//                         {group.map(file => (
//                             <li key={file.path} className="flex items-center p-2 bg-gray-50 rounded-md">
//                                 <input
//                                     type="checkbox"
//                                     id={file.path}
//                                     className="h-4 w-4 mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                                     onChange={() => onFileSelect(file.path)}
//                                     checked={selectedFiles.includes(file.path)}
//                                 />
//                                 <label htmlFor={file.path} className="text-sm text-gray-800 break-all">{file.path}</label>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//             <button
//                 onClick={onDelete}
//                 className="mt-4 bg-red-600 text-white font-bold py-3 px-6 rounded-md hover:bg-red-700 transition duration-300 disabled:bg-gray-400"
//                 disabled={selectedFiles.length === 0 || isLoading}
//             >
//                 {isLoading ? 'Deleting...' : `Delete Selected (${selectedFiles.length})`}
//             </button>
//         </div>
//     );
// };

// const CategoriesSection = ({ categories }) => {
//     if (Object.keys(categories).length === 0) return null;

//     return (
//         <div className="p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4 text-gray-700">Categorized Applications</h2>
//             {Object.entries(categories).map(([category, files]) => (
//                 <div key={category} className="mb-4">
//                     <h3 className="font-semibold text-lg text-blue-700">{category} ({files.length})</h3>
//                     <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
//                         {files.map(file => (
//                             <li key={file.path} className="text-sm text-gray-600 break-all">{file.path}</li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//         </div>
//     );
// };

// // --- App Component ---
// function App() {
//     const [isLoading, setIsLoading] = useState(false);
//     const [scanData, setScanData] = useState({ duplicates: [], categorizedApps: [] });
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleScan = async (path) => {
//         setIsLoading(true);
//         setError('');
//         setSuccess('');
//         setScanData({ duplicates: [], categorizedApps: [] });
//         setSelectedFiles([]);
//         try {
//             const response = await axios.post('http://localhost:8080/api/scan', { path });
//             setScanData(response.data);
//             if(response.data.duplicates.length === 0) {
//                 setSuccess("Scan complete. No duplicate files were found!");
//             } else {
//                 setSuccess("Scan complete. Duplicates found!");
//             }
//         } catch (err) {
//             setError(err.response?.data || 'An unexpected error occurred.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleFileSelect = (path) => {
//         setSelectedFiles(prev =>
//             prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
//         );
//     };

//     const handleDelete = async () => {
//         if (window.confirm(`Are you sure you want to delete ${selectedFiles.length} file(s)? This action cannot be undone.`)) {
//             setIsLoading(true);
//             setError('');
//             setSuccess('');
//             try {
//                 const response = await axios.post('http://localhost:8080/api/delete-files', selectedFiles);
//                 setSuccess(`Successfully deleted ${response.data.deleted.length} files.`);
//                 // Rescan to refresh the data
//                 // For a better UX, we could just remove the deleted files from the state.
//                 // For simplicity here, we just clear the results.
//                 setScanData({ duplicates: [], categorizedApps: [] });
//                 setSelectedFiles([]);
//             } catch (err) {
//                 setError(err.response?.data.message || 'Failed to delete files.');
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//     };

//     const categorizedMap = scanData.categorizedApps.reduce((acc, app) => {
//         acc[app.category] = acc[app.category] || [];
//         acc[app.category].push(app);
//         return acc;
//     }, {});

//     return (
//         <div className="bg-gray-100 min-h-screen font-sans">
//             <header className="bg-gray-800 text-white p-4 shadow-lg">
//                 <h1 className="text-3xl font-bold text-center">Intelligent Application Manager</h1>
//             </header>
//             <main className="container mx-auto p-4 sm:p-8">
//                 <DirectoryForm onScan={handleScan} isLoading={isLoading} />
//                 {error && <MessageBox message={error} type="error" />}
//                 {success && <MessageBox message={success} type="success" />}
//                 {isLoading && !scanData.duplicates.length && <Spinner />}

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     <DuplicatesSection
//                         duplicates={scanData.duplicates}
//                         onFileSelect={handleFileSelect}
//                         selectedFiles={selectedFiles}
//                         onDelete={handleDelete}
//                         isLoading={isLoading}
//                     />
//                     <CategoriesSection categories={categorizedMap} />
//                 </div>
//             </main>
//         </div>
//     );
// }

// export default App;
// import React, { useState, useCallback } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import Spinner from "./components/Spinner";
// import PreviewModal from "./components/PreviewModal";
// import DirectoryForm from "./components/DirectoryForm";
// import DuplicatesTable from "./components/DuplicatesSection";
// import EmptyFoldersSection from "./components/EmptyFoldersSection";

// function App() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [scanData, setScanData] = useState({
//     duplicates: [],
//     categorizedApps: {},
//     emptyFolders: [],
//   });
//   const [selectedFiles, setSelectedFiles] = useState({});
//   const [scanType, setScanType] = useState("EXACT");
//   const [previewContent, setPreviewContent] = useState(null);
//   const [basePath, setBasePath] = useState(""); // <-- New state for the base path

//   const handleScan = useCallback(
//     async (path) => {
//       setIsLoading(true);
//       setBasePath(path); // <-- Store the base path here
//       setSelectedFiles({});
//       try {
//         const payload = { path, scanType };
//         if (scanType === "FUZZY") {
//           payload.threshold = 50;
//         }
//         const response = await axios.post(
//           "http://localhost:8080/api/scan",
//           payload
//         );
//         setScanData(response.data);
//         toast.success(
//           `Scan complete. Found ${response.data.duplicates.length} group(s) and ${response.data.emptyFolders.length} empty folder(s).`
//         );
//       } catch (err) {
//         const errorMessage =
//           err.response?.data?.message || "An unexpected error occurred.";
//         toast.error(errorMessage);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [scanType]
//   );

//   const handlePreview = useCallback(async (filePath) => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/preview", {
//         params: { filePath },
//       });
//       setPreviewContent(response.data);
//     } catch (err) {
//       toast.error(`Error: Could not load file preview: ${err.message}`);
//     }
//   }, []);

//   const handleFileSelect = useCallback((filePath, isSelected) => {
//     setSelectedFiles((prev) => {
//       const newSelected = { ...prev };
//       if (isSelected) {
//         newSelected[filePath] = true;
//       } else {
//         delete newSelected[filePath];
//       }
//       return newSelected;
//     });
//   }, []);

//   const handleBulkDelete = useCallback(async () => {
//     const filesToDelete = Object.keys(selectedFiles);
//     if (filesToDelete.length === 0) return;

//     if (
//       !window.confirm(
//         `Are you sure you want to delete ${filesToDelete.length} file(s)? This action cannot be undone.`
//       )
//     ) {
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Corrected: Send the base path and files to delete in the payload
//       const payload = {
//         basePath: basePath,
//         filesToDelete: filesToDelete,
//       };

//       const response = await axios.post(
//         "http://localhost:8080/api/delete-files",
//         payload
//       );
//       toast.success(
//         `Successfully deleted ${response.data.deleted.length} files.`
//       );

//       setScanData((prev) => {
//         const filteredDuplicates = prev.duplicates
//           .map((group) => group.filter((file) => !filesToDelete.includes(file)))
//           .filter((group) => group.length > 1);
//         return { ...prev, duplicates: filteredDuplicates };
//       });
//       setSelectedFiles({});
//     } catch (err) {
//       const errorMessage =
//         err.response?.data?.message || "Failed to delete files.";
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [selectedFiles, basePath]);

//   const handleDeleteIndividual = useCallback(
//     async (filePath) => {
//       if (
//         !window.confirm(
//           `Are you sure you want to delete this file? This action cannot be undone.`
//         )
//       ) {
//         return;
//       }
//       setIsLoading(true);
//       try {
//         // Corrected: Send a single file to delete in the correct format
//         const payload = {
//           basePath: basePath,
//           filesToDelete: [filePath],
//         };

//         const response = await axios.post(
//           "http://localhost:8080/api/delete-files",
//           payload
//         );
//         toast.success(`Successfully deleted file: ${response.data.deleted[0]}`);

//         setScanData((prev) => {
//           const filteredDuplicates = prev.duplicates
//             .map((group) => group.filter((file) => file !== filePath))
//             .filter((group) => group.length > 1);
//           return { ...prev, duplicates: filteredDuplicates };
//         });
//       } catch (err) {
//         const errorMessage =
//           err.response?.data?.message || "Failed to delete file.";
//         toast.error(errorMessage);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [basePath]
//   );
//   return (
//     <div className='bg-gray-100 min-h-screen font-sans'>
//       <ToastContainer position='bottom-right' />
//       <PreviewModal
//         content={previewContent}
//         onClose={() => setPreviewContent(null)}
//       />
//       <header className='bg-gray-800 text-white p-4 shadow-lg'>
//         <h1 className='text-3xl font-bold text-center'>
//           Intelligent Application Manager
//         </h1>
//       </header>
//       <main className='container mx-auto p-4 sm:p-8'>
//         <DirectoryForm
//           onScan={handleScan}
//           isLoading={isLoading}
//           scanType={scanType}
//           setScanType={setScanType}
//         />

//         {isLoading && <Spinner />}

//         {!isLoading &&
//           (scanData.duplicates.length > 0 ||
//             Object.keys(scanData.categorizedApps).length > 0 ||
//             scanData.emptyFolders.length > 0) && (
//             <div className='grid grid-cols-1 gap-8'>
//               <DuplicatesTable
//                 duplicates={scanData.duplicates}
//                 onFileSelect={handleFileSelect}
//                 selectedFiles={selectedFiles}
//                 onBulkDelete={handleBulkDelete}
//                 onDeleteIndividual={handleDeleteIndividual}
//                 onPreview={handlePreview}
//                 isLoading={isLoading}
//               />
//               <EmptyFoldersSection folders={scanData.emptyFolders} />
//             </div>
//           )}
//       </main>
//     </div>
//   );
// }

// export default App;

import React, { useState, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "./components/Spinner";
import PreviewModal from "./components/PreviewModal";
import DirectoryForm from "./components/DirectoryForm";
import DuplicatesTable from "./components/DuplicatesSection";
import EmptyFoldersSection from "./components/EmptyFoldersSection";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [scanData, setScanData] = useState({
    duplicates: [],
    categorizedApps: {},
    emptyFolders: [],
  });
  const [selectedFiles, setSelectedFiles] = useState({});
  const [scanType, setScanType] = useState("EXACT");
  const [previewContent, setPreviewContent] = useState(null);
  const [basePath, setBasePath] = useState("");

  const handleScan = useCallback(
    async (path) => {
      setIsLoading(true);
      setBasePath(path);
      setSelectedFiles({});
      try {
        const payload = { path, scanType };
        if (scanType === "FUZZY") {
          payload.threshold = 50;
        }
        const response = await axios.post(
          "http://localhost:8080/api/scan",
          payload
        );
        setScanData(response.data);
        toast.success(
          `Scan complete. Found ${response.data.duplicates.length} group(s) and ${response.data.emptyFolders.length} empty folder(s).`
        );
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [scanType]
  );

  const handlePreview = useCallback(async (filePath) => {
    try {
      const response = await axios.get("http://localhost:8080/api/preview", {
        params: { filePath },
      });
      setPreviewContent(response.data);
    } catch (err) {
      toast.error(`Error: Could not load file preview: ${err.message}`);
    }
  }, []);

  const handleFileSelect = useCallback((filePath, isSelected) => {
    setSelectedFiles((prev) => {
      const newSelected = { ...prev };
      if (isSelected) {
        newSelected[filePath] = true;
      } else {
        delete newSelected[filePath];
      }
      return newSelected;
    });
  }, []);

  const handleBulkDelete = useCallback(async () => {
    const filesToDelete = Object.keys(selectedFiles);
    if (filesToDelete.length === 0) return;

    if (
      !window.confirm(
        `Are you sure you want to delete ${filesToDelete.length} file(s)? This action cannot be undone.`
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        basePath: basePath,
        filesToDelete: filesToDelete,
      };

      const response = await axios.post(
        "http://localhost:8080/api/delete-files",
        payload
      );

      toast.success(
        `Successfully deleted ${response.data.deleted.length} files.`
      );

      // Re-scan the directory to get the latest file list
      await handleScan(basePath);

      setSelectedFiles({});
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete files.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFiles, basePath, handleScan]); // Add handleScan to dependencies

  const handleDeleteIndividual = useCallback(
    async (filePath) => {
      if (
        !window.confirm(
          `Are you sure you want to delete this file? This action cannot be undone.`
        )
      ) {
        return;
      }
      setIsLoading(true);
      try {
        const payload = {
          basePath: basePath,
          filesToDelete: [filePath],
        };

        const response = await axios.post(
          "http://localhost:8080/api/delete-files",
          payload
        );

        toast.success(`Successfully deleted file: ${response.data.deleted[0]}`);

        // Re-scan the directory to get the latest file list
        await handleScan(basePath);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Failed to delete file.";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [basePath, handleScan]
  ); // Add handleScan to dependencies

  return (
    <div className='bg-gray-100 min-h-screen font-sans'>
      <ToastContainer position='bottom-right' />
      <PreviewModal
        content={previewContent}
        onClose={() => setPreviewContent(null)}
      />
      <header className='bg-gray-800 text-white p-4 shadow-lg'>
        <h1 className='text-3xl font-bold text-center'>
          Intelligent Application Manager
        </h1>
      </header>
      <main className='container mx-auto p-4 sm:p-8'>
        <DirectoryForm
          onScan={handleScan}
          isLoading={isLoading}
          scanType={scanType}
          setScanType={setScanType}
        />
        {isLoading && <Spinner />}
        {!isLoading &&
          (scanData.duplicates.length > 0 ||
            Object.keys(scanData.categorizedApps).length > 0 ||
            scanData.emptyFolders.length > 0) && (
            <div className='grid grid-cols-1 gap-8'>
              <DuplicatesTable
                duplicates={scanData.duplicates}
                onFileSelect={handleFileSelect}
                selectedFiles={selectedFiles}
                onBulkDelete={handleBulkDelete}
                onDeleteIndividual={handleDeleteIndividual}
                onPreview={handlePreview}
                isLoading={isLoading}
              />
              <EmptyFoldersSection folders={scanData.emptyFolders} />
            </div>
          )}
      </main>
    </div>
  );
}

export default App;
