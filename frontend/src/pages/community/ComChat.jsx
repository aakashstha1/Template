import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ComChat({ community, messages = [] }) {
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    // placeholder UI behavior only
    setNewMessage("");
  };

  return (
    <Card className="flex flex-col h-full p-6">
      <h2 className="text-2xl font-bold mb-4">
        {community?.name || "Community"}
      </h2>

      {/* Chat messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 border rounded-md p-4 overflow-y-auto mb-4"
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
  );
}

export default ComChat;
