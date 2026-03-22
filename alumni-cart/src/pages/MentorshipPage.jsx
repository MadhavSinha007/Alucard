import React, { useEffect, useState } from "react";
import MentorList from "../components/mentorship/MentorList";
import MentorshipRequests from "../components/mentorship/MentorshipRequests";

const MentorshipPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/mentorship/my-requests");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (id) => {
    try {
      await fetch(`/api/mentorship/accept/${id}`, {
        method: "PUT",
      });

      // remove or update request locally
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`/api/mentorship/reject/${id}`, {
        method: "PUT",
      });

      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-white">
        Mentorship
      </h1>

      <MentorshipRequests
        requests={requests}
        onAccept={handleAccept}
        onReject={handleReject}
      />

      <MentorList />
    </div>
  );
};

export default MentorshipPage;