import React, { useState } from "react";

const CreateEvent = () => {
  const [title, setTitle] = useState("");

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-semibold mb-4">Create Event</h1>

      <input
        placeholder="Event Title"
        className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className="mt-4 bg-white text-black px-4 py-2 rounded">
        Create
      </button>
    </div>
  );
};

export default CreateEvent;