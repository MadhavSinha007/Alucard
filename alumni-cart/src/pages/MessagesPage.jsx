import React, { useState } from "react";
import ChatList from "../components/messages/ChatList";
import ChatWindow from "../components/messages/ChatWindow";
import MessageInput from "../components/messages/MessageInput";

const MessagesPage = () => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="flex h-[80vh] border border-gray-800 rounded">
      <ChatList onSelect={setActiveChat} />

      <div className="flex flex-col flex-1">
        <ChatWindow chat={activeChat} />
        <MessageInput />
      </div>
    </div>
  );
};

export default MessagesPage;