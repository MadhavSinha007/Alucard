import React, { useEffect, useMemo, useState } from "react";
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

        let data = null;

        // 1) try collection endpoint
        try {
          const res = await fetch(`${BASE_URL}/api/alumni`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.ok) {
            data = await res.json();
          }
        } catch (err) {
          console.error("Collection endpoint failed:", err);
        }

        // 2) fallback to known single profile for now
        if (!data) {
          const res = await fetch(`${BASE_URL}/api/alumni/profile/anonymousUser`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }

          data = await res.json();
        }

        const normalized = Array.isArray(data) ? data : data ? [data] : [];
        setAlumni(normalized);
      } catch (err) {
        console.error("Error fetching alumni:", err);
        setError("FAILED TO LOAD ALUMNI. CHECK YOUR CONNECTION.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [user]);

  const filtered = useMemo(() => {
    return alumni.filter((a) => {
      const q = query.toLowerCase();

      return (
        (a.fullName || a.name || "").toLowerCase().includes(q) ||
        (a.department || a.branch || "").toLowerCase().includes(q) ||
        (a.currentCompany || a.company || "").toLowerCase().includes(q) ||
        (a.designation || a.role || a.currentRole || "").toLowerCase().includes(q) ||
        String(a.batch || a.graduationYear || "").includes(q)
      );
    });
  }, [alumni, query]);

  return (
    <div className="min-h-screen bg-blue-50 font-mono p-6 sm:p-10">
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

      {!loading && !error && (
        <p className="font-bold text-sm mb-6">
          SHOWING {filtered.length} OF {alumni.length} ALUMNI
        </p>
      )}

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
          {filtered.map((person, i) => {
            const personId = person.uid || person.id || `alumni-${i}`;
            const fullName = person.fullName || person.name || "Unknown";
            const department = person.department || person.branch || "—";
            const batch = person.batch || person.graduationYear || "—";
            const designation = person.designation || person.currentRole || person.role;
            const company = person.currentCompany || person.company;

            return (
              <div
                key={personId}
                onClick={() => navigate(`/alumni/${personId}`)}
                className="bg-blue-200 border-4 border-black p-6 cursor-pointer shadow-[6px_6px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_#000]"
              >
                <div className="w-14 h-14 bg-blue-400 border-4 border-black flex items-center justify-center mb-4 font-black text-xl shadow-[3px_3px_0px_#000]">
                  {fullName[0]?.toUpperCase() || "?"}
                </div>

                <h2 className="font-black text-lg mb-1">
                  {fullName.toUpperCase()}
                </h2>

                <p className="text-sm font-bold text-gray-600 mb-3">
                  BATCH {batch} {" · "} {department}
                </p>

                {designation && (
                  <div className="inline-block bg-white border-2 border-black px-3 py-1 text-xs font-black shadow-[2px_2px_0px_#000] mb-2">
                    {designation.toUpperCase()}
                  </div>
                )}

                {company && (
                  <p className="text-xs font-bold mt-1 text-gray-700">
                    @ {company.toUpperCase()}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AlumniPage;