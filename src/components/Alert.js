import React from "react";

const Alert = ({ type = "info", message, onClose }) => {
  // Define alert styles based on type
  const alertStyles = {
    info: "bg-blue-100 border-blue-400 text-blue-700",
    success: "bg-green-100 border-green-400 text-green-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    error: "bg-red-100 border-red-400 text-red-700",
  };

  return (
    <div
      className={`flex justify-between items-center border px-4 py-3 rounded relative ${alertStyles[type]}`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <button
          className="text-lg font-bold ml-4"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;