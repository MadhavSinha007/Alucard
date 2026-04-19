import React, { useState } from "react";

const EditProfile = () => {
  const [bio, setBio] = useState(
    "Passionate about modern UI/UX design and React. Currently building open-source web crawlers in my free time."
  );

  return (
    <div className="min-h-screen bg-blue-50 font-mono p-10">
      <div className="bg-blue-300 border-4 border-black shadow-[6px_6px_0px_#000] px-6 py-4 mb-8 inline-block">
        <h1 className="text-2xl font-black">EDIT PROFILE</h1>
      </div>

      <div className="max-w-3xl bg-blue-200 border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
        <label className="block text-sm font-black mb-3">
          BIO
        </label>

        <textarea
          placeholder="Your bio..."
          className="w-full h-40 bg-white border-4 border-black p-4 font-bold focus:outline-none focus:bg-blue-100"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button className="mt-6 bg-blue-500 border-4 border-black px-6 py-3 font-black shadow-[4px_4px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]">
          SAVE CHANGES
        </button>
      </div>
    </div>
  );
};

export default EditProfile;