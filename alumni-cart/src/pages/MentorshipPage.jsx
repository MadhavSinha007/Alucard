import React from "react";
import MentorList from "../components/mentorship/MentorList";
import MentorshipRequests from "../components/mentorship/MentorshipRequests";

const MentorshipPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-white">
        Mentorship
      </h1>

      <MentorshipRequests />
      <MentorList />
    </div>
  );
};

export default MentorshipPage;