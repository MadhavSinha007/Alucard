import React, { useState } from "react";
import DonationCard from "../components/donations/DonationCard";
import DonationHistory from "../components/donations/DonationHistory";

const DonationsPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-blue-50 font-mono p-6 sm:p-10 space-y-8">
      <div className="inline-block bg-blue-300 border-4 border-black px-6 py-4 shadow-[6px_6px_0px_#000]">
        <h1 className="text-3xl font-black">
          DONATIONS
        </h1>
      </div>

      <DonationCard onDonationComplete={() => setRefreshKey((prev) => prev + 1)} />
      <DonationHistory refreshKey={refreshKey} />
    </div>
  );
};

export default DonationsPage;