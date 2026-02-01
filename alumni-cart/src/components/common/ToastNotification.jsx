import React from "react";

const ToastNotification = ({ message, type = "info" }) => {
  const colors = {
    info: "bg-gray-900 text-white",
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg ${colors[type]}`}
    >
      {message}
    </div>
  );
};

export default ToastNotification;