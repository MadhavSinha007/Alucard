import React from "react";
import { useParams } from "react-router-dom";

const AlumniProfile = () => {
  const { id } = useParams();

  return (
    <div className="p-6 text-white">
      <div className="border border-gray-800 p-6 rounded">
        <h1 className="text-xl font-semibold">Alumni Profile</h1>

        <p className="text-gray-400 mt-2">Alumni ID: {id}</p>

        <div className="mt-4 space-y-2">
          <p><strong>Name:</strong> Dummy Name</p>
          <p><strong>Batch:</strong> 2020</p>
          <p><strong>Role:</strong> Software Engineer</p>
          <p><strong>Skills:</strong> React, Node.js</p>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="bg-white text-black px-4 py-2 rounded">
            Connect
          </button>
          <button className="border border-gray-700 px-4 py-2 rounded">
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfile;