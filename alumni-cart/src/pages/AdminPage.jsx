import React from "react";

const AdminPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">
        Admin Panel
      </h1>

      <p className="text-gray-400">
        Manage users, events, alumni records, and platform settings.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black border border-gray-800 rounded-lg p-5">
          Manage Events
        </div>
        <div className="bg-black border border-gray-800 rounded-lg p-5">
          Manage Alumni
        </div>
      </div>
    </div>
  );
};

export default AdminPage;