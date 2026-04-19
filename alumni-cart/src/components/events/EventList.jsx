import React, { useEffect, useMemo, useState } from "react";
import EventCard from "./EventCard";
import CreateEvent from "./CreateEvent";
import { useAuth } from "../../hooks/useAuth";

const BASE_URL = "http://localhost:8080";
const CREATED_EVENTS_KEY = "fake_created_events";
const RSVP_KEY = "fake_event_rsvps";

const normalizeEvent = (event) => ({
  id: event.id,
  title: event.title || "Untitled Event",
  description: event.description || "No description available.",
  date: event.date || "",
  location: event.location || "TBD",
  organizerUid: event.organizerUid || "anonymousUser",
  rsvpUserIds: Array.isArray(event.rsvpUserIds) ? event.rsvpUserIds : [],
  audience: event.audience || "both",
  source: event.source || "backend",
});

const EventList = () => {
  const { userData } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = userData?.role?.toLowerCase();
  const currentUserId =
    userData?.uid ||
    (role === "student"
      ? "student-demo"
      : role === "alumni"
      ? "anonymousUser"
      : "admin-demo");

  useEffect(() => {
    fetchEvents();
  }, []);

  const buildMergedEvents = (backendEventsRaw, localEventsRaw, rsvpMap) => {
    const backendEvents = Array.isArray(backendEventsRaw)
      ? backendEventsRaw.map(normalizeEvent)
      : [];

    const localEvents = Array.isArray(localEventsRaw)
      ? localEventsRaw.map(normalizeEvent)
      : [];

    return [...localEvents, ...backendEvents].map((event) => {
      const localRsvps = rsvpMap[event.id] || [];
      const baseRsvps = Array.isArray(event.rsvpUserIds) ? event.rsvpUserIds : [];
      const combined = Array.from(new Set([...baseRsvps, ...localRsvps]));

      return {
        ...event,
        rsvpUserIds: combined,
        rsvpCount: combined.length,
      };
    });
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const localEvents = JSON.parse(
        localStorage.getItem(CREATED_EVENTS_KEY) || "[]"
      );
      const rsvpMap = JSON.parse(localStorage.getItem(RSVP_KEY) || "{}");

      const res = await fetch(`${BASE_URL}/api/events`);
      const data = await res.json();

      const merged = buildMergedEvents(data, localEvents, rsvpMap);
      setEvents(merged);
    } catch (err) {
      console.error("Error fetching events:", err);

      const localEvents = JSON.parse(
        localStorage.getItem(CREATED_EVENTS_KEY) || "[]"
      );
      const rsvpMap = JSON.parse(localStorage.getItem(RSVP_KEY) || "{}");

      const merged = buildMergedEvents([], localEvents, rsvpMap);
      setEvents(merged);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = (eventId) => {
    const stored = JSON.parse(localStorage.getItem(RSVP_KEY) || "{}");
    const existing = stored[eventId] || [];

    if (!existing.includes(currentUserId)) {
      const updatedRsvps = [...existing, currentUserId];
      stored[eventId] = updatedRsvps;
      localStorage.setItem(RSVP_KEY, JSON.stringify(stored));

      setEvents((prev) =>
        prev.map((event) => {
          if (event.id !== eventId) return event;

          const nextUserIds = event.rsvpUserIds.includes(currentUserId)
            ? event.rsvpUserIds
            : [...event.rsvpUserIds, currentUserId];

          return {
            ...event,
            rsvpUserIds: nextUserIds,
            rsvpCount: nextUserIds.length,
          };
        })
      );
    }
  };

  const handleCancelRSVP = (eventId) => {
    const stored = JSON.parse(localStorage.getItem(RSVP_KEY) || "{}");
    const existing = stored[eventId] || [];

    stored[eventId] = existing.filter((id) => id !== currentUserId);
    localStorage.setItem(RSVP_KEY, JSON.stringify(stored));

    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;

        const nextUserIds = event.rsvpUserIds.filter(
          (id) => id !== currentUserId
        );

        return {
          ...event,
          rsvpUserIds: nextUserIds,
          rsvpCount: nextUserIds.length,
        };
      })
    );
  };

  const visibleEvents = useMemo(() => {
    return events.filter((event) => {
      if (role === "admin") return true;
      if (event.audience === "both") return true;
      if (event.audience === "student" && role === "student") return true;
      if (event.audience === "alumni" && role === "alumni") return true;
      return false;
    });
  }, [events, role]);

  if (loading) {
    return <p className="p-8 font-mono font-black">LOADING EVENTS...</p>;
  }

  return (
    <section className="p-8 bg-blue-50 min-h-screen font-mono">
      <h1 className="text-3xl font-black mb-10 border-b-4 border-black pb-4">
        EVENTS
      </h1>

      {role === "admin" && (
        <div className="mb-10">
          <CreateEvent onCreated={fetchEvents} />
        </div>
      )}

      {visibleEvents.length === 0 ? (
        <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_#000]">
          <p className="font-black text-lg">NO EVENTS AVAILABLE.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {visibleEvents.map((event) => {
            const hasRSVPed = event.rsvpUserIds?.includes(currentUserId);
            const canRSVP = role === "student" || role === "alumni";

            return (
              <EventCard
                key={event.id}
                event={event}
                role={role}
                canRSVP={canRSVP}
                hasRSVPed={hasRSVPed}
                onRSVP={handleRSVP}
                onCancelRSVP={handleCancelRSVP}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default EventList;