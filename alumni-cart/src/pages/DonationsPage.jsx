import React from "react";
import DonationCard from "../components/donations/DonationCard";
import DonationHistory from "../components/donations/DonationHistory";

const DonationsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">
        Donations
      </h1>

      <DonationCard />
      <DonationHistory />
    </div>
  );
};

export default DonationsPage;