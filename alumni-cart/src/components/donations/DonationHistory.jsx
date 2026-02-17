import React from "react";

const DonationHistory = () => {
  return (
    <div
      className="
        bg-blue-100
        border-4 border-black
        p-6
        shadow-[8px_8px_0px_#000]
        font-mono
      "
    >
      <h3 className="text-xl font-black mb-6">
        DONATION HISTORY
      </h3>

      <div
        className="
          bg-white
          border-4 border-black
          p-4
          font-bold
        "
      >
        NO DONATIONS YET.
      </div>
    </div>
  );
};

export default DonationHistory;
