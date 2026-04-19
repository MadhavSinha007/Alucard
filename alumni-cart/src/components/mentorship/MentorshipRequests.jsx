import React from "react";

const MentorshipRequests = ({ requests = [], onAccept, onReject }) => {
  return (
    <section className="p-8 bg-blue-50 min-h-screen font-mono">
      <h1 className="text-3xl font-black mb-10 border-b-4 border-black pb-4">
        MENTORSHIP REQUESTS
      </h1>

      {requests.length === 0 ? (
        <p className="text-lg font-bold">No requests found.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req.id}
            className="bg-blue-200 border-4 border-black p-6 shadow-[8px_8px_0px_#000] mb-8"
          >
            <p className="font-bold text-lg">
              REQUEST FROM{" "}
              <span className="underline">
                {req.studentName || req.studentUid || "Unknown Student"}
              </span>
            </p>

            <p className="font-bold text-xl mt-2">
              {req.topic || "No topic specified"}
            </p>

            {req.department && (
              <p className="mt-2 font-bold text-sm">
                Department: {req.department}
              </p>
            )}

            {req.status && (
              <p className="mt-2 font-bold text-sm">
                Status: {req.status.toUpperCase()}
              </p>
            )}

            <div className="mt-6 flex gap-6">
              <button
                onClick={() => onAccept(req.id)}
                className="bg-green-400 border-4 border-black px-5 py-2 font-black shadow-[4px_4px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]"
              >
                ACCEPT
              </button>

              <button
                onClick={() => onReject(req.id)}
                className="bg-red-400 border-4 border-black px-5 py-2 font-black shadow-[4px_4px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]"
              >
                DECLINE
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default MentorshipRequests;