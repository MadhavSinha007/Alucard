import React from "react";

const MENTORS = [
  { id: 1, name: "Ananya Gupta", expertise: "Product Management" },
  { id: 2, name: "Rahul Sharma", expertise: "Backend Engineering" },
];

const MentorList = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-semibold mb-4">Mentors</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {MENTORS.map((mentor) => (
          <div
            key={mentor.id}
            className="border border-gray-800 rounded p-4"
          >
            <h2 className="font-semibold">{mentor.name}</h2>
            <p className="text-gray-400">{mentor.expertise}</p>

            <button className="mt-3 bg-white text-black px-3 py-1 rounded">
              Request Mentorship
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorList;