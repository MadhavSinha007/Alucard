import React, { useEffect, useState } from "react";

const MESSAGE_KEY = "fake_messages";

const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chat) return;

    const allMessages = JSON.parse(localStorage.getItem(MESSAGE_KEY) || "{}");
    setMessages(
      allMessages[chat.id] || [
        { id: 1, sender: "them", text: "HELLO 👋" },
        { id: 2, sender: "them", text: "HOW ARE YOU?" },
      ]
    );
  }, [chat]);

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-blue-50 font-mono font-black text-lg">
        SELECT A CONVERSATION
      </div>
    );
  }

  return (
    <div className="flex-1 bg-blue-50 p-8 font-mono overflow-y-auto">
      <div className="mb-6 bg-blue-300 border-4 border-black p-4 shadow-[6px_6px_0px_#000]">
        <h2 className="text-xl font-black">
          {chat.name.toUpperCase()}
        </h2>
      </div>

      <div className="space-y-4 font-bold">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`
              inline-block border-4 border-black px-4 py-2 shadow-[4px_4px_0px_#000] max-w-md
              ${msg.sender === "me" ? "bg-blue-200" : "bg-white"}
            `}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;