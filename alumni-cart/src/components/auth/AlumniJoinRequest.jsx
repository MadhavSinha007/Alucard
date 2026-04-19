import React, { useState } from "react";

const STORAGE_KEY = "fake_alumni_join_requests";

const AlumniJoinRequest = ({ onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [batch, setBatch] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [messageToAdmin, setMessageToAdmin] = useState("");
  const [proofFiles, setProofFiles] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    const mapped = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type || "unknown",
      uploadedAt: new Date().toISOString(),
    }));
    setProofFiles(mapped);
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setRegistrationNumber("");
    setBatch("");
    setDepartment("");
    setDateOfBirth("");
    setCurrentCompany("");
    setDesignation("");
    setLinkedInUrl("");
    setMessageToAdmin("");
    setProofFiles([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !fullName.trim() ||
      !email.trim() ||
      !registrationNumber.trim() ||
      !batch.trim() ||
      !department.trim()
    ) {
      setError("PLEASE FILL ALL REQUIRED FIELDS.");
      return;
    }

    if (proofFiles.length === 0) {
      setError("PLEASE UPLOAD AT LEAST ONE PROOF DOCUMENT.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const alreadyExists = existing.some(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() ||
        item.registrationNumber.toLowerCase() ===
          registrationNumber.trim().toLowerCase()
    );

    if (alreadyExists) {
      setError("A REQUEST WITH THIS EMAIL OR REGISTRATION NUMBER ALREADY EXISTS.");
      return;
    }

    const newRequest = {
      id: `join_${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      registrationNumber: registrationNumber.trim(),
      batch: batch.trim(),
      department: department.trim(),
      dateOfBirth,
      currentCompany: currentCompany.trim(),
      designation: designation.trim(),
      linkedInUrl: linkedInUrl.trim(),
      messageToAdmin: messageToAdmin.trim(),
      proofFiles,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify([newRequest, ...existing]));

    resetForm();
    setSuccess(
      "REQUEST SUBMITTED. THE ADMIN WILL VERIFY YOUR DETAILS AND CONTACT YOU BY EMAIL."
    );
  };

  return (
    <div className="w-full max-w-4xl bg-blue-100 border-4 border-black p-8 shadow-[10px_10px_0px_#000] font-mono max-h-[85vh] overflow-y-auto">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="text-2xl font-black mb-2">ALUMNI ACCESS REQUEST</h2>
          <p className="font-bold text-sm leading-relaxed max-w-3xl">
            SUBMIT YOUR DETAILS, REGISTRATION NUMBER, AND PROOF DOCUMENTS.
            THE ADMIN WILL VERIFY THE DATA, CREATE YOUR ACCOUNT, AND SHARE LOGIN DETAILS.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="bg-white border-4 border-black px-4 py-2 font-black shadow-[4px_4px_0px_#000]"
        >
          CLOSE
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-500 text-white border-4 border-black px-4 py-3 font-bold">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-300 border-4 border-black px-4 py-3 font-black shadow-[4px_4px_0px_#000]">
            {success}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="FULL NAME *"
            className="w-full border-4 border-black px-4 py-3 font-bold bg-white"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            placeholder="EMAIL *"
            className="w-full border-4 border-black px-4 py-3 font-bold bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="PHONE NUMBER"
            className="w-full border-4 border-black px-4 py-3 font-bold bg-white"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="REGISTRATION NUMBER *"
            className="w-full border-4 border-black px-4 py-3 font-bold bg-white"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />

          <input
            type="date"
            className="w-full border-4 border-black px-4 py-3 font-bold bg-white"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="BATCH YEAR *"
            className="w-full border-4 border-black px-4 py-3 font-bold bg-white"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          />

          <input
            type="text"
            placeholder="DEPARTMENT *"
            className="w-full border-4 border-black px-4 py-3 font-bold bg-white"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="CURRENT COMPANY"
            className="w-full border-4 border-black px-4 py-3 font-bold bg-white"
            value={currentCompany}
            onChange={(e) => setCurrentCompany(e.target.value)}
          />

          <input
            type="text"
            placeholder="DESIGNATION"
            className="w-full border-4 border-black px-4 py-3 font-bold bg-white"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>

        <input
          type="url"
          placeholder="LINKEDIN PROFILE URL"
          className="w-full border-4 border-black px-4 py-3 font-bold bg-white"
          value={linkedInUrl}
          onChange={(e) => setLinkedInUrl(e.target.value)}
        />

        <div className="bg-white border-4 border-black p-4">
          <p className="font-black text-sm mb-2">UPLOAD PROOF DOCUMENTS *</p>
          <p className="font-bold text-xs mb-3">
            EXAMPLES: MARKSHEET, DEGREE CERTIFICATE, COLLEGE ID, OR OTHER PROOF.
          </p>

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full border-4 border-black px-4 py-3 font-bold bg-white"
          />

          {proofFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {proofFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="bg-blue-50 border-2 border-black px-3 py-2 text-sm font-bold"
                >
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </div>
              ))}
            </div>
          )}
        </div>

        <textarea
          placeholder="MESSAGE TO ADMIN / EXTRA DETAILS"
          className="w-full min-h-[140px] border-4 border-black px-4 py-3 font-bold bg-white"
          value={messageToAdmin}
          onChange={(e) => setMessageToAdmin(e.target.value)}
        />

        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            className="bg-blue-500 border-4 border-black px-6 py-3 font-black shadow-[6px_6px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_#000]"
          >
            SUBMIT REQUEST
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-white border-4 border-black px-6 py-3 font-black shadow-[6px_6px_0px_#000]"
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlumniJoinRequest;