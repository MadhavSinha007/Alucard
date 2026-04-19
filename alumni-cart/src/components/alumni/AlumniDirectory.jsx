import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const DUMMY_ALUMNI = [
  {
    id: "anonymousUser",
    name: "Arjun",
    batch: 2024,
    role: "FRONTEND DEVELOPER AT WEBSOLUTIONS INC.",
    department: "Computer Science",
  },
];

const AlumniDirectory = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return DUMMY_ALUMNI.filter((a) => {
      const q = query.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q) ||
        a.department.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div className="min-h-screen bg-blue-50 font-mono p-10">
      <div className="bg-blue-300 border-4 border-black shadow-[6px_6px_0px_#000] px-6 py-4 mb-8 inline-block">
        <h1 className="text-2xl font-black">
          ALUMNI DIRECTORY
        </h1>
      </div>

      <div className="mb-10 max-w-xl">
        <input
          placeholder="SEARCH ALUMNI..."
          className="w-full bg-white border-4 border-black px-5 py-3 font-bold focus:outline-none focus:bg-blue-100"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {filtered.map((alumni) => (
          <div
            key={alumni.id}
            onClick={() => navigate(`/alumni/${alumni.id}`)}
            className="bg-blue-200 border-4 border-black p-6 cursor-pointer shadow-[6px_6px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_#000]"
          >
            <h2 className="font-black text-lg mb-2">
              {alumni.name.toUpperCase()}
            </h2>

            <p className="font-bold text-sm mb-1">
              BATCH {alumni.batch}
            </p>

            <p className="font-bold text-sm mb-4">
              {alumni.department}
            </p>

            <div className="inline-block bg-white border-2 border-black px-3 py-1 text-xs font-black">
              {alumni.role}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlumniDirectory;