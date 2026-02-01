import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;