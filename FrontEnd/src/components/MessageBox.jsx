import React from "react";

function MessageBox({ message, type }) {
  const baseClasses = "rounded-lg p-4 mb-4 font-medium";
  const typeClasses = {
    error: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
  };

  return <div className={`${baseClasses} ${typeClasses[type]}`}>{message}</div>;
}

export default MessageBox;
