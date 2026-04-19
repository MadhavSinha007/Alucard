import React, { useState } from "react";

const STORAGE_KEY = "fake_created_events";

const CreateEvent = ({ onCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [audience, setAudience] = useState("both");
  const [success, setSuccess] = useState("");

  const handleCreate = () => {
    if (!title.trim() || !description.trim() || !date || !location.trim()) {
      return;
    }

    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const newEvent = {
      id: `local_${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      date,
      location: location.trim(),
      organizerUid: "anonymousUser",
      rsvpUserIds: [],
      audience,
      source: "local",
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify([newEvent, ...existing]));

    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
    setAudience("both");
    setSuccess("EVENT CREATED SUCCESSFULLY.");

    onCreated?.();
  };

  return (
    <div className="p-8 bg-blue-100 font-mono">
      <div className="max-w-3xl bg-blue-200 border-4 border-black p-8 shadow-[10px_10px_0px_#000]">
        <h1 className="text-2xl font-black mb-6">
          CREATE EVENT
        </h1>

        <div className="grid gap-5">
          <div>
            <label className="block text-sm font-black mb-2">EVENT TITLE</label>
            <input
              placeholder="EVENT TITLE"
              className="w-full bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none focus:bg-blue-50"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-black mb-2">DESCRIPTION</label>
            <textarea
              placeholder="EVENT DESCRIPTION"
              className="w-full min-h-[120px] bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none focus:bg-blue-50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-black mb-2">DATE & TIME</label>
              <input
                type="datetime-local"
                className="w-full bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none focus:bg-blue-50"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-black mb-2">LOCATION</label>
              <input
                placeholder="EVENT LOCATION"
                className="w-full bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none focus:bg-blue-50"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-black mb-2">WHO CAN JOIN</label>
            <select
              className="w-full bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            >
              <option value="both">BOTH</option>
              <option value="student">STUDENTS ONLY</option>
              <option value="alumni">ALUMNI ONLY</option>
            </select>
          </div>

          <button
            onClick={handleCreate}
            className="mt-2 bg-blue-500 border-4 border-black px-6 py-3 font-black shadow-[6px_6px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_#000]"
          >
            CREATE EVENT
          </button>

          {success && (
            <div className="bg-green-300 border-4 border-black px-4 py-3 font-black shadow-[4px_4px_0px_#000]">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;