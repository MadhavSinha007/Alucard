import React from "react";

const DonationCard = () => {
  return (
    <div
      className="
        bg-blue-200
        border-4 border-black
        p-6
        shadow-[8px_8px_0px_#000]
        font-mono
      "
    >
      <h3 className="text-xl font-black mb-3">
        ALUMNI SCHOLARSHIP FUND
      </h3>

      <p className="font-medium mb-6">
        Support students through scholarships.
      </p>

      <button
        className="
          bg-blue-500
          border-4 border-black
          px-6 py-2
          font-black
          shadow-[4px_4px_0px_#000]
          transition-all duration-150
          hover:translate-x-1 hover:translate-y-1
          hover:shadow-[2px_2px_0px_#000]
        "
      >
        DONATE
      </button>
    </div>
  );
};

export default DonationCard;
