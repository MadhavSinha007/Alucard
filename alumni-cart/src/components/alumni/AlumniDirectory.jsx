import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DUMMY_ALUMNI = [
  { id: "1", name: "Rahul Sharma", batch: 2020, role: "SDE at Google" },
  { id: "2", name: "Ananya Gupta", batch: 2019, role: "PM at Amazon" },
  { id: "3", name: "Vikram Singh", batch: 2018, role: "Founder at Startup" },
];

const AlumniDirectory = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = DUMMY_ALUMNI.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-semibold mb-4">Alumni Directory</h1>

      <input
        placeholder="Search alumni..."
        className="w-full mb-6 bg-black border border-gray-700 px-3 py-2 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map((alumni) => (
          <div
            key={alumni.id}
            onClick={() => navigate(`/alumni/${alumni.id}`)}
            className="border border-gray-800 p-4 rounded hover:bg-gray-900 cursor-pointer"
          >
            <h2 className="font-semibold">{alumni.name}</h2>
            <p className="text-sm text-gray-400">
              Batch {alumni.batch}
            </p>
            <p className="text-sm">{alumni.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlumniDirectory;