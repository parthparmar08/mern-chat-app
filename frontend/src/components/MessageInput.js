import React, { useState, useContext } from "react";
import { sendMessage } from "../api/messageApi";
import ChatContext from "../ChatContext";
import "../App.css";

const MessageInput = ({ socket }) => {
  // Access name, group, setMessages, and messages from the ChatContext
  const { name, group, setMessages, messages } = useContext(ChatContext);

  // State variables to manage the input message and error message
  const [inputMessage, setInputMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleMessageChange = (e) => {
    // Update the inputMessage state with the new input value
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") {
      // If the input message is empty or contains only whitespace, show an error message
      setErrorMessage("Please enter some message");
      return;
    }

    try {
      // Call the sendMessage function from the messageApi file to send the message
      await sendMessage(name, group, inputMessage);
    } catch (error) {
      console.error("Failed to send message:", error);
      return;
    }

    // Emit a "sendMessage" event to the server with the user, group, and message details
    socket.emit("sendMessage", { user: name, group, message: inputMessage });

    // Update the messages state with the new message
    setMessages([...messages, { user: name, group, message: inputMessage }]);

    // Clear the input message and error message
    setInputMessage("");
    setErrorMessage("");
  };

  return (
    <div className="messinput">
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={handleMessageChange}
          placeholder="Write Something..."
          className="messtextbox"
        />
        <button className="messbtn" onClick={handleSendMessage}>
          Send
        </button>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default MessageInput;
