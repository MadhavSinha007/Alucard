import React from "react";

const DonationCard = () => {
  return (
    <div className="bg-gray-900 p-6 rounded border border-gray-800">
      <h3 className="text-white font-semibold mb-2">
        Alumni Scholarship Fund
      </h3>
      <p className="text-gray-400 text-sm mb-4">
        Support students through scholarships.
      </p>

      <button className="bg-white text-black px-4 py-2 rounded">
        Donate
      </button>
    </div>
  );
};

export default DonationCard;