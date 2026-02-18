import React from "react";

const MENTORS = [
  { id: 1, name: "Ananya Gupta", expertise: "Product Management" },
  { id: 2, name: "Rahul Sharma", expertise: "Backend Engineering" },
];

const MentorList = () => {
  return (
    <section className="p-8 bg-blue-50 min-h-screen font-mono">

      <h1 className="text-3xl font-black mb-10 border-b-4 border-black pb-4">
        MENTORS
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {MENTORS.map((mentor) => (
          <div
            key={mentor.id}
            className="
              bg-blue-200
              border-4 border-black
              p-6
              shadow-[8px_8px_0px_#000]
              transition-all duration-150
              hover:translate-x-1 hover:translate-y-1
              hover:shadow-[4px_4px_0px_#000]
            "
          >
            <h2 className="text-xl font-black mb-2">
              {mentor.name.toUpperCase()}
            </h2>

            <p className="font-bold mb-4">
              {mentor.expertise}
            </p>

            <button
              className="
                bg-blue-500
                border-4 border-black
                px-4 py-2
                font-black text-sm
                shadow-[4px_4px_0px_#000]
                transition-all duration-150
                hover:translate-x-1 hover:translate-y-1
                hover:shadow-[2px_2px_0px_#000]
              "
            >
              REQUEST MENTORSHIP
            </button>
          </div>
        ))}
      </div>

    </section>
  );
};

export default MentorList;
