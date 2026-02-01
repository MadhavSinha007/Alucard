import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4">
        <Stat title="Total Users" value="1,248" />
        <Stat title="Active Events" value="12" />
        <Stat title="Mentorship Pairs" value="86" />
        <Stat title="Reports" value="2" />
      </div>

      <div className="border border-gray-800 rounded p-6">
        <h2 className="font-semibold mb-2">Recent Admin Actions</h2>
        <ul className="text-gray-400 space-y-1">
          <li>User #102 disabled</li>
          <li>Event “Tech Talk” approved</li>
          <li>Bulk email sent to alumni</li>
        </ul>
      </div>
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="border border-gray-800 rounded p-4">
    <p className="text-sm text-gray-400">{title}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

export default AdminDashboard;