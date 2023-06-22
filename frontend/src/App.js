import React, { useState } from "react";
import ChatRoom from "./components/ChatRoom";
import ChatContext from "./ChatContext";
import "./App.css";

function App() {
  // State variables for name, group, and messages
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [messages, setMessages] = useState([]);

  // Context value containing state variables and their respective setter functions
  const contextValue = {
    name,
    group,
    messages,
    setName,
    setGroup,
    setMessages,
  };

  return (
    <div className="App">
      <h1>Chat App</h1>

      {/* Provide the context value to ChatContext.Provider */}
      <ChatContext.Provider value={contextValue}>
        <ChatRoom />
      </ChatContext.Provider>
    </div>
  );
}

export default App;
