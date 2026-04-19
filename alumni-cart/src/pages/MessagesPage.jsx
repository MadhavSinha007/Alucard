import React, { useEffect, useState } from "react";
import ChatList from "../components/messages/ChatList";
import ChatWindow from "../components/messages/ChatWindow";
import MessageInput from "../components/messages/MessageInput";
import { useAuth } from "../hooks/useAuth";

const STORAGE_KEY = "fake_mentorship_requests";
const MESSAGE_KEY = "fake_messages";

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

      const storedRequests = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const acceptedOnly = storedRequests.filter(
        (item) => item.status?.toLowerCase() === "accepted"
      );

      const mappedChats = acceptedOnly.map((item) => ({
        id: item.id,
        name: role === "student" ? item.mentorName || "Arjun" : item.studentName || "Demo Student",
        last: item.lastMessage || "Connected for mentorship",
      }));

      setChats(mappedChats);
    } catch (err) {
      console.error("Fetch chats failed:", err);
      setChats([]);
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
    <div className="flex h-[80vh] border-4 border-black rounded-none overflow-hidden">
      <ChatList chats={chats} onSelect={setActiveChat} />

      <div className="flex flex-col flex-1">
        <ChatWindow chat={activeChat} />
        {activeChat && <MessageInput chat={activeChat} refreshChats={fetchChats} />}
      </div>
    </div>
  );
};

export default MessagesPage;