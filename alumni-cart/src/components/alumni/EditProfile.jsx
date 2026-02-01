import React, { useState } from "react";

const EditProfile = () => {
  const [bio, setBio] = useState("");

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-semibold mb-4">Edit Profile</h1>

      <textarea
        placeholder="Your bio..."
        className="w-full h-32 bg-black border border-gray-700 p-3 rounded"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <button className="mt-4 bg-white text-black px-4 py-2 rounded">
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;