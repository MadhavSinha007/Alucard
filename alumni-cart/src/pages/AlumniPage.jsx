import React, { useEffect, useState } from "react";

const AlumniPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/alumni/profile") // only one alumni because dumbass forgot to add a mapping for everyone // i did it myself nvm
      .then((res) => res.json())
      .then((data) => {
        setAlumni(data);
        setLoading(false);
      console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching alumni:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 font-mono p-10 space-y-10">
      
      {/* Title Block */}
      <div className="inline-block bg-blue-300 border-4 border-black px-6 py-4 shadow-[6px_6px_0px_#000]">
        <h1 className="text-2xl font-black">ALUMNI DIRECTORY</h1>
      </div>

      {/* Description Block */}
      <div className="max-w-2xl bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] font-bold">
        BROWSE AND CONNECT WITH ALUMNI FROM DIFFERENT BATCHES AND DOMAINS.
      </div>

      {/* Alumni Section */}
      <div className="bg-blue-200 border-4 border-black p-12 shadow-[6px_6px_0px_#000] text-center">
        
        {loading ? (
          <div className="font-black">LOADING...</div>
        ) : alumni.length === 0 ? (
          <div className="font-black">NO ALUMNI FOUND</div>
        ) : (
          <div className="grid gap-4">
            {alumni.map((person, index) => (
              <div
                key={index}
                className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#000]"
              >
                <h2 className="font-black text-lg">{person.fullName}</h2>
                <p>{person.batch}</p>
                <p>{person.department}</p>
                <p>{person.designation}</p>
                <p>{person.currentCompany}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AlumniPage;