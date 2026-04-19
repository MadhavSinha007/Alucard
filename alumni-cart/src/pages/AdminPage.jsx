import React, { useState } from "react";

import AdminOverview from "../components/adminpanel/AdminOverview";
import AdminUserManagement from "../components/adminpanel/AdminUserManagement";
import AdminBulkBatchCreate from "../components/adminpanel/AdminBulkBatchCreate";
import AdminDonationsPanel from "../components/adminpanel/AdminDonationsPanel";
import AdminReportsPanel from "../components/adminpanel/AdminReportsPanel";
import AdminQuickActions from "../components/adminpanel/AdminQuickActions";
import AdminJoinRequestsPanel from "../components/adminpanel/AdminJoinRequestsPanel";

const TABS = [
  { key: "overview", label: "OVERVIEW" },
  { key: "users", label: "USERS" },
  { key: "batch", label: "BATCH CREATE" },
  { key: "joinrequests", label: "JOIN REQUESTS" },
  { key: "donations", label: "DONATIONS" },
  { key: "reports", label: "REPORTS" },
  { key: "actions", label: "ACTIONS" },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />;

      case "users":
        return <AdminUserManagement />;

      case "batch":
        return <AdminBulkBatchCreate />;

      case "joinrequests":
        return <AdminJoinRequestsPanel />;

      case "donations":
        return <AdminDonationsPanel />;

      case "reports":
        return <AdminReportsPanel />;

      case "actions":
        return <AdminQuickActions />;

      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 font-mono p-6 sm:p-10">
      <div className="mb-8">
        <div className="inline-block bg-blue-300 border-4 border-black px-6 py-4 shadow-[6px_6px_0px_#000]">
          <h1 className="text-3xl font-black">
            ADMIN CONTROL PANEL
          </h1>
        </div>

        <p className="mt-4 font-bold text-sm text-gray-700">
          FULL CONTROL OVER USERS, JOIN REQUESTS, DONATIONS, REPORTS, AND SYSTEM OPERATIONS
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              border-4 border-black
              px-5 py-2
              font-black text-sm
              shadow-[4px_4px_0px_#000]
              transition-all duration-150
              ${
                activeTab === tab.key
                  ? "bg-white shadow-[6px_6px_0px_#000]"
                  : "bg-blue-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPage;