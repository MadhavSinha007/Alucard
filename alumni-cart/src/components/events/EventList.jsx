import React from "react";
import EventCard from "./EventCard";

const EventList = () => {
  // temporary mock data (replace with API later)
  const events = [
    {
      id: 1,
      title: "Alumni Meet 2026",
      description: "Connect with alumni across industries.",
      date: "12 Mar 2026",
      location: "Mumbai",
    },
    {
      id: 2,
      title: "Tech Talk: AI in Finance",
      description: "Industry experts discuss real-world AI use cases.",
      date: "25 Mar 2026",
      location: "Online",
    },
    {
      id: 3,
      title: "Mentorship Bootcamp",
      description: "One-on-one mentorship sessions for final year students.",
      date: "02 Apr 2026",
      location: "Delhi",
    },
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">
        Events
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default EventList;