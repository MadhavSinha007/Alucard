import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "http://localhost:8080";

const AlumniPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchAlumni = async () => {
      setLoading(true);
      setError("");
      try {
        const token = await user.getIdToken();

        // Try /api/alumni first, fall back to /api/alumni/profile
        let res = await fetch(`${BASE_URL}/api/alumni`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If that 404s, try the profile endpoint
        if (!res.ok) {
          res = await fetch(`${BASE_URL}/api/alumni/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        // Backend might return array or single object — handle both
        setAlumni(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error fetching alumni:", err);
        setError("FAILED TO LOAD ALUMNI. CHECK YOUR CONNECTION.");
      }
      setLoading(false);
    };
    fetchAlumni();
  }, [user]);

  const filtered = alumni.filter((a) => {
    const q = query.toLowerCase();
    return (
      (a.fullName || a.name || "").toLowerCase().includes(q) ||
      (a.department || a.branch || "").toLowerCase().includes(q) ||
      (a.currentCompany || a.company || "").toLowerCase().includes(q) ||
      (a.designation || a.role || "").toLowerCase().includes(q) ||
      String(a.batch || a.graduationYear || "").includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-blue-50 font-mono p-6 sm:p-10">

      {/* Header */}
      <div className="mb-10">
        <div className="inline-block bg-blue-300 border-4 border-black px-6 py-4 shadow-[6px_6px_0px_#000] mb-4">
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Users size={28} strokeWidth={2.5} />
            ALUMNI DIRECTORY
          </h1>
        </div>
        <p className="font-bold text-sm text-gray-600 ml-1">
          BROWSE AND CONNECT WITH ALUMNI FROM DIFFERENT BATCHES AND DOMAINS
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mb-6 relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2"
          strokeWidth={2.5}
        />
        <input
          placeholder="SEARCH BY NAME, COMPANY, DEPT, BATCH..."
          className="w-full bg-white border-4 border-black px-5 py-3 pl-11 font-bold focus:outline-none focus:bg-blue-100 shadow-[4px_4px_0px_#000]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Count */}
      {!loading && !error && (
        <p className="font-bold text-sm mb-6">
          SHOWING {filtered.length} OF {alumni.length} ALUMNI
        </p>
      )}

      {/* States */}
      {loading ? (
        <div className="flex items-center justify-center py-32">
          <p className="text-xl font-black animate-pulse">LOADING DIRECTORY...</p>
        </div>

      ) : error ? (
        <div className="bg-red-300 border-4 border-black p-8 shadow-[6px_6px_0px_#000] text-center">
          <p className="text-xl font-black mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white border-4 border-black px-6 py-2 font-black text-sm shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all"
          >
            RETRY
          </button>
        </div>

      ) : filtered.length === 0 ? (
        <div className="bg-white border-4 border-black p-10 shadow-[6px_6px_0px_#000] text-center">
          <p className="text-xl font-black mb-4">NO ALUMNI FOUND</p>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="bg-blue-300 border-4 border-black px-6 py-2 font-black text-sm shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all"
            >
              CLEAR SEARCH
            </button>
          )}
        </div>

      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((person, i) => (
            <div
              key={person.uid || person.id || i}
              onClick={() => navigate(`/alumni/${person.uid || person.id}`)}
              className="
                bg-blue-200 border-4 border-black p-6
                cursor-pointer shadow-[6px_6px_0px_#000]
                transition-all duration-150
                hover:translate-x-1 hover:translate-y-1
                hover:shadow-[3px_3px_0px_#000]
              "
            >
              {/* Avatar */}
              <div className="w-14 h-14 bg-blue-400 border-4 border-black flex items-center justify-center mb-4 font-black text-xl shadow-[3px_3px_0px_#000]">
                {(person.fullName || person.name || "?")[0].toUpperCase()}
              </div>

              <h2 className="font-black text-lg mb-1">
                {(person.fullName || person.name || "UNKNOWN").toUpperCase()}
              </h2>

              <p className="text-sm font-bold text-gray-600 mb-3">
                BATCH {person.batch || person.graduationYear || "—"}
                {" · "}
                {person.department || person.branch || "—"}
              </p>

              {(person.designation || person.currentRole) && (
                <div className="inline-block bg-white border-2 border-black px-3 py-1 text-xs font-black shadow-[2px_2px_0px_#000] mb-2">
                  {(person.designation || person.currentRole).toUpperCase()}
                </div>
              )}

              {(person.currentCompany || person.company) && (
                <p className="text-xs font-bold mt-1 text-gray-700">
                  @ {(person.currentCompany || person.company).toUpperCase()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlumniPage;