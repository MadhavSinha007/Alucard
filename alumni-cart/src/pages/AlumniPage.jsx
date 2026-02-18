import React from "react";

const AlumniPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 font-mono p-10 space-y-10">

      {/* Title Block */}
      <div className="
        inline-block
        bg-blue-300
        border-4 border-black
        px-6 py-4
        shadow-[6px_6px_0px_#000]
      ">
        <h1 className="text-2xl font-black">
          ALUMNI DIRECTORY
        </h1>
      </div>

      {/* Description Block */}
      <div className="
        max-w-2xl
        bg-white
        border-4 border-black
        p-6
        shadow-[6px_6px_0px_#000]
        font-bold
      ">
        BROWSE AND CONNECT WITH ALUMNI FROM DIFFERENT BATCHES AND DOMAINS.
      </div>

      {/* Placeholder Section */}
      <div className="
        bg-blue-200
        border-4 border-black
        p-12
        shadow-[6px_6px_0px_#000]
        text-center
      ">
        <div className="
          inline-block
          bg-white
          border-4 border-black
          px-6 py-3
          font-black
        ">
          ALUMNI LIST COMING SOON...
        </div>
      </div>

    </div>
  );
};

export default AlumniPage;
