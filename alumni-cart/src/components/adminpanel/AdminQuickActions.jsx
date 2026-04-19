import React from "react";
import { useNavigate } from "react-router-dom";

const AdminQuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { label: "MANAGE EVENTS", onClick: () => navigate("/events") },
    { label: "VIEW ALUMNI DIRECTORY", onClick: () => navigate("/alumni") },
    { label: "GO TO DASHBOARD", onClick: () => navigate("/dashboard") },
    { label: "OPEN REPORTS SECTION", onClick: () => window.scrollTo({ top: document.body.scrollHeight / 2, behavior: "smooth" }) },
  ];

  return (
    <div className="bg-blue-300 border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
      <h2 className="text-2xl font-black mb-6">QUICK ACTIONS</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="bg-white border-4 border-black px-5 py-4 font-black shadow-[4px_4px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminQuickActions;