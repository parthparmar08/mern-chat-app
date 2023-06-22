import React, { useEffect, useContext } from "react";
import { getMessagesByGroup } from "../api/messageApi";
import ChatContext from "../ChatContext";
import "../App.css";

const MessageList = ({ socket }) => {
  const { name, group, setMessages, messages } = useContext(ChatContext);

  // Event listener for "sendMessage1" event received from the server
  socket.on("sendMessage1", (data) => {
    // Update the messages state with the new message received
    setMessages([
      ...messages,
      { user: data.user, group: data.group, message: data.message },
    ]);
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetch messages from the server based on the group
        const response = await getMessagesByGroup(group);
        const messages = response;
        // Update the messages state with the fetched messages
        setMessages(messages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    if (group) {
      // Call fetchMessages when the group value changes
      fetchMessages();
    }
  }, [group, setMessages]);

  return (
    <div className="messagelist">
      {messages.length === 0 ? (
        <p className="no-messages">
          No messages found. Start the conversation!
        </p>
      ) : (
        messages.map((message, index) => (
          <div
            className={`message ${message.user === name ? "sent" : "received"}`}
            key={index}
          >
            <p>
              <strong>{message.user}:</strong> {message.message}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
