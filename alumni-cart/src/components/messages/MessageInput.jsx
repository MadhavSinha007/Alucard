import React, { useState } from "react";

const MESSAGE_KEY = "fake_messages";
const STORAGE_KEY = "fake_mentorship_requests";

const MessageInput = ({ chat, refreshChats }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || !chat) return;

    const allMessages = JSON.parse(localStorage.getItem(MESSAGE_KEY) || "{}");
    const currentMessages = allMessages[chat.id] || [];

    const nextMessages = [
      ...currentMessages,
      {
        id: Date.now(),
        sender: "me",
        text: message.trim(),
      },
    ];

    allMessages[chat.id] = nextMessages;
    localStorage.setItem(MESSAGE_KEY, JSON.stringify(allMessages));

    const requests = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const updatedRequests = requests.map((req) =>
      req.id === chat.id ? { ...req, lastMessage: message.trim() } : req
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRequests));

    setMessage("");
    refreshChats?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-blue-200 border-t-4 border-black p-6 font-mono">
      <div className="flex gap-4 items-end">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none focus:bg-blue-50 resize-none min-h-[56px] max-h-40"
          placeholder="TYPE A MESSAGE..."
          rows={1}
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 border-4 border-black px-6 py-3 font-black shadow-[4px_4px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]"
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default MessageInput;