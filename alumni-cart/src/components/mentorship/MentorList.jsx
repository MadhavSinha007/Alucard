import React, { useMemo, useState } from "react";

const MentorList = ({ mentors = [], requests = [], onRequest }) => {
  const [query, setQuery] = useState("");

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const mentorName = (
        mentor.fullName ||
        mentor.name ||
        ""
      ).toLowerCase();

      const mentorRole = (
        `${mentor.designation || ""} ${mentor.currentCompany || ""} ${mentor.department || ""}`
      ).toLowerCase();

      const q = query.toLowerCase();
      return mentorName.includes(q) || mentorRole.includes(q);
    });
  }, [mentors, query]);

  const getRequestForMentor = (mentorId) => {
    return requests.find(
      (req) => req.mentorId === mentorId || req.alumniId === mentorId
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 font-mono p-10">
      <div className="bg-blue-300 border-4 border-black shadow-[6px_6px_0px_#000] px-6 py-4 mb-8 inline-block">
        <h1 className="text-2xl font-black">FIND MENTORS</h1>
      </div>

      <div className="mb-4 max-w-xl">
        <input
          placeholder="SEARCH MENTORS..."
          className="w-full bg-white border-4 border-black px-5 py-3 font-bold focus:outline-none focus:bg-blue-100"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <p className="font-bold mb-8">TOTAL MENTORS: {filteredMentors.length}</p>

      <div className="grid md:grid-cols-3 gap-8">
        {filteredMentors.map((mentor) => {
          const mentorId = mentor.uid || mentor.id;
          const mentorName = mentor.fullName || mentor.name || "Unknown";
          const mentorBatch = mentor.batch || "N/A";
          const mentorRole = `${mentor.designation || "Professional"} AT ${mentor.currentCompany || "COMPANY"}`;
          const req = getRequestForMentor(mentorId);
          const status = req?.status?.toLowerCase();

          return (
            <div
              key={mentorId}
              className="bg-blue-200 border-4 border-black p-6 shadow-[6px_6px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_#000]"
            >
              <h2 className="font-black text-lg mb-2">
                {mentorName.toUpperCase()}
              </h2>

              <p className="font-bold text-sm mb-1">
                BATCH {mentorBatch}
              </p>

              <div className="inline-block bg-white border-2 border-black px-3 py-1 text-xs font-black mb-3">
                {mentorRole}
              </div>

              <p className="font-bold text-sm mb-2">
                {mentor.department}
              </p>

              <p className="text-xs font-bold mb-4 leading-relaxed">
                {mentor.bio}
              </p>

              <p className="font-bold text-xs mb-4">
                STATUS:{" "}
                <span className="underline">
                  {status === "accepted"
                    ? "CONNECTED"
                    : status === "pending"
                    ? "REQUEST SENT"
                    : status === "rejected"
                    ? "REJECTED"
                    : "NOT CONNECTED"}
                </span>
              </p>

              <button
                disabled={status === "pending" || status === "accepted"}
                onClick={() => onRequest(mentorId)}
                className={`
                  border-4 border-black
                  px-4 py-2
                  font-black text-sm
                  shadow-[4px_4px_0px_#000]
                  transition-all duration-150
                  ${
                    status === "accepted"
                      ? "bg-green-300 cursor-not-allowed"
                      : status === "pending"
                      ? "bg-yellow-300 cursor-not-allowed"
                      : "bg-blue-500 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]"
                  }
                `}
              >
                {status === "accepted"
                  ? "CONNECTED"
                  : status === "pending"
                  ? "REQUEST SENT"
                  : "REQUEST MENTORSHIP"}
              </button>
            </div>
          );
        })}
      </div>

      {filteredMentors.length === 0 && (
        <p className="text-lg font-bold mt-8">No mentors found.</p>
      )}
    </div>
  );
};

export default MentorList;