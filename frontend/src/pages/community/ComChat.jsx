import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { toast } from "sonner";

const socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
});

function ComChat({ community }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch messages when community changes
  useEffect(() => {
    if (!community?._id) return;

    // Join the socket room for this community
    socket.emit("joinRoom", community._id);

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/community/${community._id}/messages`,
          { withCredentials: true }
        );
        setMessages(
          res.data.map((msg) => ({
            ...msg,
            senderId: msg.sender._id,
            name: msg.sender.name,
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
          }))
        );
      } catch (error) {
        toast.error("Failed to load messages.");
        console.error(error);
      }
    };

    fetchMessages();

    // Cleanup on community change/unmount: leave old room
    return () => {
      socket.emit("leaveRoom", community._id);
    };
  }, [API_URL, community]);

  // Listen for incoming messages from socket
  useEffect(() => {
    socket.on("messageReceived", (message) => {
      // Format the message similar to the fetched ones
      const formattedMsg = {
        ...message,
        senderId: message.sender._id,
        name: message.sender.name,
        time: new Date(message.createdAt).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };
      setMessages((prev) => [...prev, formattedMsg]);
    });

    return () => {
      socket.off("messageReceived");
    };
  }, []);

  // Send message
  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post(
        `${API_URL}/community/message/send`,
        {
          communityId: community._id,
          content: newMessage,
        },
        { withCredentials: true }
      );

      // Emit message to socket room for live update to others
      socket.emit("newMessage", res.data, community._id);

      // Add your own sent message locally
      const sentMsg = {
        ...res.data,
        senderId: user._id,
        name: user.name,
        time: new Date(res.data.createdAt).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };

      setMessages((prev) => [...prev, sentMsg]);
      setNewMessage("");
    } catch (error) {
      toast.error("Failed to send message.");
      console.error(error);
    }
  };

  return (
    <Card className="flex flex-col h-full p-6">
      <h2 className="text-2xl font-bold mb-4">{community?.name || "Community"}</h2>

      {/* Chat messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 border rounded-md p-4 overflow-y-auto mb-4"
      >
        {messages.map((msg, idx) => {
          const isYou = msg.senderId === user._id;
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
                    src={`https://ui-avatars.com/api/?name=${msg.name}`}
                  />
                  <AvatarFallback>{msg.name[0]}</AvatarFallback>
                </Avatar>
              )}
              <div className={`${isYou ? "text-right" : "text-left"}`}>
                <div
                  className={`rounded-xl px-4 py-2 max-w-xs ${
                    isYou ? "bg-blue-500 text-white" : "bg-muted"
                  }`}
                >
                  {!isYou && <p className="font-semibold">{msg.name}</p>}
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
                    src={`https://ui-avatars.com/api/?name=${msg.name}`}
                  />
                  <AvatarFallback>{msg.name[0]}</AvatarFallback>
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
