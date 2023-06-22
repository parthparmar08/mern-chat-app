import axios from "axios";

// Send a message to the server
export const sendMessage = async (user, group, message) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/chat/addmessages",
      { user, group, message }
    );
    return response.data; // Return the response data from the server
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
};

// Get messages for a specific group from the server
export const getMessagesByGroup = async (group) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/chat/getmessagesbygroup?group=${encodeURIComponent(
        group
      )}`
    );
    return response.data; // Return the response data from the server
  } catch (error) {
    console.error("Failed to get messages:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
};
