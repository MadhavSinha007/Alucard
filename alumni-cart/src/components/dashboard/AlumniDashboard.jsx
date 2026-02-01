import React from "react";

const AlumniDashboard = () => {
  return (
    <div className="p-6 text-white space-y-6">
      {/* Welcome */}
      <div className="border border-gray-800 rounded p-6">
        <h1 className="text-xl font-semibold">Welcome back 👋</h1>
        <p className="text-gray-400 mt-1">
          Here’s what’s happening in your alumni network.
        </p>
      </div>

      {/* Widgets */}
      <div className="grid md:grid-cols-3 gap-4">
        <DashboardCard
          title="Upcoming Events"
          value="3"
          description="Events you registered for"
        />
        <DashboardCard
          title="Mentorship Requests"
          value="1"
          description="Pending requests"
        />
        <DashboardCard
          title="New Connections"
          value="5"
          description="This month"
        />
      </div>

      {/* Announcements */}
      <div className="border border-gray-800 rounded p-6">
        <h2 className="font-semibold mb-2">Announcements</h2>
        <ul className="text-gray-400 space-y-1">
          <li>Alumni meetup this Saturday</li>
          <li>New mentorship program launched</li>
        </ul>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, description }) => (
  <div className="border border-gray-800 rounded p-4">
    <h3 className="text-sm text-gray-400">{title}</h3>
    <p className="text-2xl font-semibold mt-1">{value}</p>
    <p className="text-xs text-gray-500 mt-1">{description}</p>
  </div>
);

export default AlumniDashboard;