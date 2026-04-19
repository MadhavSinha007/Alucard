import React, { useMemo, useState } from "react";

const USER_KEY = "fake_admin_users";

const DEPARTMENTS = [
  "CSE",
  "IOT",
  "AIML",
  "MECH",
  "CIVIL",
  "ECE",
  "EEE",
  "IT",
];

const REQUIRED_HEADERS = [
  "fullName",
  "email",
  "department",
  "batch",
  "role",
];

const AdminBulkBatchCreate = () => {
  const [department, setDepartment] = useState("CSE");
  const [batch, setBatch] = useState("2026");
  const [count, setCount] = useState("60");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  const [previewRows, setPreviewRows] = useState([]);
  const [fileName, setFileName] = useState("");

  const sampleCsv = useMemo(
    () =>
      [
        "fullName,email,department,batch,role",
        "Rahul Sharma,rahul.sharma@college.edu,CSE,2026,student",
        "Ananya Gupta,ananya.gupta@college.edu,AIML,2026,student",
        "Arjun Verma,arjun.verma@alumni.edu,CSE,2020,alumni",
      ].join("\n"),
    []
  );

  const parseCsv = (text) => {
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length < 2) {
      throw new Error("CSV MUST CONTAIN HEADER + AT LEAST ONE DATA ROW.");
    }

    const headers = lines[0].split(",").map((h) => h.trim());

    const missingHeaders = REQUIRED_HEADERS.filter(
      (header) => !headers.includes(header)
    );

    if (missingHeaders.length > 0) {
      throw new Error(
        `MISSING REQUIRED COLUMNS: ${missingHeaders.join(", ")}`
      );
    }

    const rows = lines.slice(1).map((line, index) => {
      const values = line.split(",").map((v) => v.trim());
      const row = {};

      headers.forEach((header, i) => {
        row[header] = values[i] || "";
      });

      return {
        id: `csv_${Date.now()}_${index + 1}`,
        uid: `csv_${Date.now()}_${index + 1}`,
        fullName: row.fullName,
        email: row.email,
        department: row.department,
        batch: row.batch,
        role: row.role.toLowerCase(),
        status: "active",
        createdAt: new Date().toISOString(),
      };
    });

    return rows;
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setMessage("");

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        const parsed = parseCsv(String(text || ""));
        setPreviewRows(parsed);
        setMessage(`CSV PARSED SUCCESSFULLY. ${parsed.length} USERS READY TO IMPORT.`);
      } catch (err) {
        console.error(err);
        setPreviewRows([]);
        setMessage(err.message || "FAILED TO PARSE CSV.");
      }
    };

    reader.readAsText(file);
  };

  const handleImportCsv = () => {
    if (previewRows.length === 0) {
      setMessage("NO CSV DATA READY TO IMPORT.");
      return;
    }

    const users = JSON.parse(localStorage.getItem(USER_KEY) || "[]");
    localStorage.setItem(USER_KEY, JSON.stringify([...previewRows, ...users]));
    setMessage(`${previewRows.length} USERS IMPORTED SUCCESSFULLY FROM CSV.`);
    setPreviewRows([]);
    setFileName("");
  };

  const handleBulkCreate = () => {
    const total = Number(count);

    if (!department.trim() || !batch.trim() || !total || total <= 0) {
      setMessage("PLEASE ENTER VALID BATCH DETAILS.");
      return;
    }

    const users = JSON.parse(localStorage.getItem(USER_KEY) || "[]");

    const generated = Array.from({ length: total }, (_, index) => {
      const n = index + 1;
      const dept = department.toUpperCase();

      return {
        id: `bulk_${Date.now()}_${n}`,
        uid: `bulk_${Date.now()}_${n}`,
        fullName: `${dept} ${role.toUpperCase()} ${n}`,
        email: `${role}${n}.${batch}.${dept.toLowerCase()}@college.edu`,
        role,
        department: dept,
        batch,
        status: "active",
        createdAt: new Date().toISOString(),
      };
    });

    localStorage.setItem(USER_KEY, JSON.stringify([...generated, ...users]));
    setMessage(`${generated.length} USERS CREATED FOR ${department} BATCH ${batch}.`);
  };

  return (
    <div className="bg-blue-100 border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
      <h2 className="text-2xl font-black mb-6">BULK CREATE / IMPORT BATCH</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000]">
            <h3 className="text-lg font-black mb-4">QUICK GENERATE BATCH</h3>

            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>

                <input
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  placeholder="BATCH YEAR"
                  className="bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  type="number"
                  placeholder="NUMBER OF USERS"
                  className="bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none"
                />

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none"
                >
                  <option value="student">STUDENT BATCH</option>
                  <option value="alumni">ALUMNI BATCH</option>
                </select>
              </div>

              <button
                onClick={handleBulkCreate}
                className="bg-blue-500 border-4 border-black px-6 py-3 font-black shadow-[6px_6px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_#000]"
              >
                GENERATE WHOLE BATCH
              </button>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000]">
            <h3 className="text-lg font-black mb-4">IMPORT FROM CSV</h3>

            <p className="font-bold text-sm mb-3">
              UPLOAD A CSV FILE USING THE REQUIRED FORMAT SHOWN ON THE RIGHT.
            </p>

            <input
              type="file"
              accept=".csv"
              onChange={handleCsvUpload}
              className="w-full bg-white border-4 border-black px-4 py-3 font-bold"
            />

            {fileName && (
              <p className="font-bold text-sm mt-3">
                FILE: {fileName}
              </p>
            )}

            <button
              onClick={handleImportCsv}
              className="mt-4 bg-blue-500 border-4 border-black px-6 py-3 font-black shadow-[6px_6px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_#000]"
            >
              IMPORT CSV USERS
            </button>
          </div>

          {message && (
            <div className="bg-blue-200 border-4 border-black px-4 py-4 font-black shadow-[4px_4px_0px_#000]">
              {message}
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <div className="bg-blue-200 border-4 border-black p-5 shadow-[4px_4px_0px_#000]">
            <h3 className="text-lg font-black mb-4">CSV FORMAT REQUIREMENTS</h3>

            <p className="font-bold text-sm mb-3">
              REQUIRED COLUMNS:
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {REQUIRED_HEADERS.map((header) => (
                <span
                  key={header}
                  className="bg-white border-2 border-black px-3 py-1 text-xs font-black"
                >
                  {header}
                </span>
              ))}
            </div>

            <p className="font-bold text-sm mb-3">
              ALLOWED DEPARTMENTS:
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {DEPARTMENTS.map((dept) => (
                <span
                  key={dept}
                  className="bg-white border-2 border-black px-3 py-1 text-xs font-black"
                >
                  {dept}
                </span>
              ))}
            </div>

            <p className="font-bold text-sm mb-3">
              SAMPLE CSV:
            </p>

            <pre className="bg-white border-4 border-black p-4 text-xs font-bold overflow-x-auto whitespace-pre-wrap">
              {sampleCsv}
            </pre>
          </div>

          <div className="bg-blue-200 border-4 border-black p-5 shadow-[4px_4px_0px_#000]">
            <h3 className="text-lg font-black mb-4">CSV PREVIEW</h3>

            {previewRows.length === 0 ? (
              <div className="bg-white border-4 border-black p-4 font-black">
                NO CSV LOADED.
              </div>
            ) : (
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
                {previewRows.slice(0, 10).map((user) => (
                  <div
                    key={user.id}
                    className="bg-white border-4 border-black p-4 shadow-[3px_3px_0px_#000]"
                  >
                    <p className="font-black">{user.fullName}</p>
                    <p className="font-bold text-sm">{user.email}</p>
                    <p className="font-bold text-xs mt-2">
                      {user.department} · {user.batch} · {user.role.toUpperCase()}
                    </p>
                  </div>
                ))}

                {previewRows.length > 10 && (
                  <p className="font-black text-sm">
                    + {previewRows.length - 10} MORE USERS READY TO IMPORT
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBulkBatchCreate;