import React from "react";

const MentorshipRequests = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-semibold mb-4">
        Mentorship Requests
      </h1>

      <div className="border border-gray-800 rounded p-4">
        <p>Request from <strong>Vikram Singh</strong></p>

        <div className="mt-3 flex gap-3">
          <button className="bg-white text-black px-3 py-1 rounded">
            Accept
          </button>
          <button className="border border-gray-700 px-3 py-1 rounded">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorshipRequests;