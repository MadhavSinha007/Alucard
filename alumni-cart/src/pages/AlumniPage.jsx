import React from "react";

const AlumniPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">
        Alumni Directory
      </h1>

      <p className="text-gray-400">
        Browse and connect with alumni from different batches and domains.
      </p>

      {/* later: AlumniCard + search/filter */}
      <div className="border border-dashed border-gray-700 rounded-lg p-6 text-gray-500">
        Alumni list coming soon...
      </div>
    </div>
  );
};

export default AlumniPage;