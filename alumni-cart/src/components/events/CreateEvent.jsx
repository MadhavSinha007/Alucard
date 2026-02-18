import React, { useState } from "react";

const CreateEvent = () => {
  const [title, setTitle] = useState("");

  return (
    <div className="p-8 bg-blue-100 min-h-screen font-mono">

      <div className="max-w-xl bg-blue-200 border-4 border-black p-8 shadow-[10px_10px_0px_#000]">

        <h1 className="text-2xl font-black mb-6">
          CREATE EVENT
        </h1>

        <input
          placeholder="EVENT TITLE"
          className="
            w-full
            bg-white
            border-4 border-black
            px-4 py-3
            font-bold
            focus:outline-none
            focus:bg-blue-50
          "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="
            mt-6
            bg-blue-500
            border-4 border-black
            px-6 py-3
            font-black
            shadow-[6px_6px_0px_#000]
            transition-all duration-150
            hover:translate-x-1 hover:translate-y-1
            hover:shadow-[3px_3px_0px_#000]
          "
        >
          CREATE
        </button>

      </div>
    </div>
  );
};

export default CreateEvent;
