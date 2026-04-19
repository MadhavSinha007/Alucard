import React, { useState } from "react";

const REQUEST_KEY = "fake_alumni_join_requests";
const USER_KEY = "fake_admin_users";

const AdminJoinRequestsPanel = () => {
  const [requests, setRequests] = useState(
    JSON.parse(localStorage.getItem(REQUEST_KEY) || "[]")
  );

  const refreshRequests = () => {
    setRequests(JSON.parse(localStorage.getItem(REQUEST_KEY) || "[]"));
  };

  const handleApprove = (request) => {
    const users = JSON.parse(localStorage.getItem(USER_KEY) || "[]");

    const newUser = {
      id: `approved_${Date.now()}`,
      uid: `approved_${Date.now()}`,
      fullName: request.fullName,
      email: request.email,
      role: "alumni",
      department: request.department,
      batch: request.batch,
      currentCompany: request.currentCompany,
      designation: request.designation,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(USER_KEY, JSON.stringify([newUser, ...users]));

    const updated = requests.map((item) =>
      item.id === request.id
        ? {
            ...item,
            status: "approved",
            adminNote: "ACCOUNT CREATED. LOGIN DETAILS TO BE SENT BY EMAIL.",
          }
        : item
    );

    localStorage.setItem(REQUEST_KEY, JSON.stringify(updated));
    refreshRequests();
  };

  const handleReject = (requestId) => {
    const updated = requests.map((item) =>
      item.id === requestId
        ? {
            ...item,
            status: "rejected",
            adminNote: "REQUEST REJECTED AFTER VERIFICATION.",
          }
        : item
    );

    localStorage.setItem(REQUEST_KEY, JSON.stringify(updated));
    refreshRequests();
  };

  return (
    <div className="bg-blue-100 border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
      <h2 className="text-2xl font-black mb-6">ALUMNI ACCESS REQUESTS</h2>

      {requests.length === 0 ? (
        <div className="bg-white border-4 border-black p-4 font-black">
          NO JOIN REQUESTS FOUND.
        </div>
      ) : (
        <div className="space-y-5">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000]"
            >
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-lg font-black">
                    {request.fullName.toUpperCase()}
                  </p>
                  <p className="font-bold text-sm">{request.email}</p>
                  <p className="font-bold text-sm">
                    {request.department} · BATCH {request.batch}
                  </p>

                  {request.currentCompany && (
                    <p className="font-bold text-sm">
                      COMPANY: {request.currentCompany}
                    </p>
                  )}

                  {request.designation && (
                    <p className="font-bold text-sm">
                      DESIGNATION: {request.designation}
                    </p>
                  )}

                  {request.messageToAdmin && (
                    <div className="bg-blue-50 border-4 border-black p-3 mt-3">
                      <p className="font-black text-xs mb-2">MESSAGE</p>
                      <p className="font-bold text-sm">{request.messageToAdmin}</p>
                    </div>
                  )}

                  <p className="font-black text-xs mt-2">
                    STATUS: {request.status.toUpperCase()}
                  </p>

                  {request.adminNote && (
                    <p className="font-bold text-xs">
                      NOTE: {request.adminNote}
                    </p>
                  )}
                </div>

                {request.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(request)}
                      className="bg-green-300 border-4 border-black px-5 py-2 font-black shadow-[4px_4px_0px_#000]"
                    >
                      APPROVE + CREATE USER
                    </button>

                    <button
                      onClick={() => handleReject(request.id)}
                      className="bg-red-300 border-4 border-black px-5 py-2 font-black shadow-[4px_4px_0px_#000]"
                    >
                      REJECT
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminJoinRequestsPanel;