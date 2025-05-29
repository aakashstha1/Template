import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const communities = [
  { id: "community1", name: "React Developers" },
  { id: "community2", name: "Node.js Fans" },
  { id: "community3", name: "MERN Stack" },
];

// Sample messages per community
const communityMessages = {
  community1: [
    { username: "Alice", content: "Welcome to React Devs!", time: "10:00 AM" },
    { username: "You", content: "Glad to be here.", time: "10:05 AM" },
  ],
  community2: [
    { username: "Bob", content: "Node.js is awesome!", time: "11:00 AM" },
  ],
  community3: [
    {
      username: "Charlie",
      content: "Anyone tried MERN stack?",
      time: "09:30 AM",
    },
  ],
};

function CommunityChat() {
  const [selectedCommunity, setSelectedCommunity] = useState(communities[0]);
  const [messages, setMessages] = useState(
    communityMessages[communities[0].id]
  );
  const [newMessage, setNewMessage] = useState("");

  // Ref to the scrollable chat container div
  const chatContainerRef = useRef(null);

  useEffect(() => {
    setMessages(communityMessages[selectedCommunity.id] || []);
  }, [selectedCommunity]);

  // Scroll to bottom on messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const msg = { username: "You", content: newMessage, time };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");

    // TODO: send message to backend/socket here
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 flex gap-6 h-[80vh]">
      {/* Left: Community list */}
      <Card className="w-64 flex flex-col">
        <h2 className="text-xl font-bold mb-4 px-4">Communities</h2>
        <div className="flex-1 overflow-y-auto border rounded-md">
          <ul className="p-2">
            {communities.map((community) => (
              <li
                key={community.id}
                onClick={() => setSelectedCommunity(community)}
                className={`cursor-pointer px-4 py-2 rounded-md mb-2 ${
                  selectedCommunity.id === community.id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100"
                }`}
              >
                {community.name}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Right: Chat room */}
      <Card className="flex-1 flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-4">{selectedCommunity.name}</h2>
        <div
          ref={chatContainerRef}
          className="flex-1 border rounded-md p-4 overflow-y-auto mb-4"
          style={{ maxHeight: "calc(80vh - 160px)" }} // to ensure it fits and scrolls nicely
        >
          {messages.map((msg, idx) => {
            const isYou = msg.username === "You";
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 mb-4 ${
                  isYou ? "justify-end" : "justify-start"
                }`}
              >
                {!isYou && (
                  <Avatar>
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${msg.username}`}
                    />
                    <AvatarFallback>{msg.username[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`${isYou ? "text-right" : "text-left"}`}>
                  <div
                    className={`rounded-xl px-4 py-2 max-w-xs ${
                      isYou ? "bg-blue-500 text-white" : "bg-muted"
                    }`}
                  >
                    {!isYou && <p className="font-semibold">{msg.username}</p>}
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      isYou ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
                {isYou && (
                  <Avatar>
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${msg.username}`}
                    />
                    <AvatarFallback>{msg.username[0]}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })}
        </div>

        {/* Message input */}
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </Card>
    </div>
  );
}

export default CommunityChat;
