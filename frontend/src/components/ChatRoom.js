import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import ChatContext from "../ChatContext";

// Create a new socket instance
const newSocket = io("http://localhost:5000");

const ChatRoom = () => {
  // Access the name and group values from the ChatContext
  const { name, group, setName, setGroup } = useContext(ChatContext);

  // State variables to manage input values and socket instance
  const [inputName, setInputName] = useState("");
  const [inputGroup, setInputGroup] = useState("");
  const [socket, setSocket] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Set the socket instance when the component mounts
    setSocket(newSocket);
  }, []);

  const handleNameChange = (e) => {
    // Update the inputName state with the new input value
    setInputName(e.target.value);
  };

  const handleGroupChange = (e) => {
    setInputGroup((prev) => {
      if (prev) {
        // Emit a "dis" event to leave the previous group (if any)
        socket.emit("dis", prev);
      }
      // Update the inputGroup state with the new group value
      return e.target.value;
    });
  };

  const handleJoinChat = () => {
    if (!inputName.trim()) {
      // If the name input is empty or contains only whitespace, show an error message
      setErrorMessage("Please enter your name");
      return;
    }

    if (!inputGroup) {
      // If no group is selected, show an error message
      setErrorMessage("Please select a group");
      return;
    }

    // Emit a "join room" event to join the selected group
    socket.emit("join room", inputGroup);

    // Update the name and group values in the ChatContext
    setName(inputName);
    setGroup(inputGroup);

    // Clear the error message
    setErrorMessage("");
  };

  return (
    <div>
      <input
        type="text"
        value={inputName}
        onChange={handleNameChange}
        placeholder="Enter your name"
      />
      <select value={inputGroup} onChange={handleGroupChange}>
        <option value="">Select a group</option>
        <option value="IT">IT</option>
        <option value="Sales">Sales</option>
        <option value="HR">HR</option>
      </select>
      <button onClick={handleJoinChat}>Join Group</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {name && group && socket && (
        <>
          {/* Render the MessageList and MessageInput components when name, group, and socket are available */}
          <MessageList socket={socket} />
          <MessageInput socket={socket} />
        </>
      )}
    </div>
  );
};

export default ChatRoom;
