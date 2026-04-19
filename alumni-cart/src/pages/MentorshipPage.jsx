import React, { useEffect, useState } from "react";
import ChatList from "../components/messages/ChatList";
import ChatWindow from "../components/messages/ChatWindow";
import MessageInput from "../components/messages/MessageInput";
import { useAuth } from "../hooks/useAuth";

const STORAGE_KEY = "fake_mentorship_requests";

const MessagesPage = () => {
  const { userData } = useAuth();
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = userData?.role?.toLowerCase();

  useEffect(() => {
    if (!role) return;
    fetchChats();
  }, [role]);

  const fetchChats = () => {
    try {
      setLoading(true);

      const storedRequests = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      const acceptedOnly = storedRequests.filter(
        (item) => item.status?.toLowerCase() === "accepted"
      );

      let mappedChats = [];

      if (role === "student") {
        mappedChats = acceptedOnly
          .filter((item) => item.studentId === "student-demo")
          .map((item) => ({
            id: item.id,
            name: item.mentorName || "Arjun",
            last: item.lastMessage || "Connected for mentorship",
          }));
      }

      if (role === "alumni") {
        mappedChats = acceptedOnly
          .filter(
            (item) =>
              item.mentorId === "anonymousUser" ||
              item.alumniId === "anonymousUser"
          )
          .map((item) => ({
            id: item.id,
            name: item.studentName || "Demo Student",
            last: item.lastMessage || "Connected for mentorship",
          }));
      }

      setChats(mappedChats);

      if (mappedChats.length > 0) {
        setActiveChat(mappedChats[0]);
      } else {
        setActiveChat(null);
      }
    } catch (err) {
      console.error("Fetch chats failed:", err);
      setChats([]);
      setActiveChat(null);
    } finally {
      setLoading(false);
    }
  };

  if (role === "admin") {
    return (
      <div className="p-8 font-mono">
        <h1 className="text-3xl font-black border-b-4 border-black pb-4">
          ACCESS DENIED
        </h1>
        <p className="mt-6 font-bold">
          Admins do not have access to mentorship chats.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] font-mono font-black text-xl animate-pulse">
        LOADING CHATS...
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] border-4 border-black bg-white overflow-hidden">
      {chats.length === 0 ? (
        <div className="flex items-center justify-center h-[70vh] bg-blue-50 font-mono">
          <div className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_#000] text-center">
            <h2 className="text-2xl font-black mb-4">NO CHATS AVAILABLE</h2>
            <p className="font-bold">
              ACCEPT A MENTORSHIP REQUEST TO START MESSAGING.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex h-[80vh]">
          <ChatList chats={chats} onSelect={setActiveChat} />

          <div className="flex flex-col flex-1">
            <ChatWindow chat={activeChat} />
            <MessageInput chat={activeChat} refreshChats={fetchChats} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;