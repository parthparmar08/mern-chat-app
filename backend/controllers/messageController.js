const Message = require("../models/message");

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { user, group, message } = req.body;

    // Create a new message instance using the provided data
    const newMessage = new Message({ user, group, message });

    // Save the new message to the database
    await newMessage.save();

    // Respond with the newly created message in the response body
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to create message" });
  }
};

// Get all messages for a specific group
exports.getMessagesByGroup = async (req, res) => {
  try {
    // Retrieve all messages from the database that match the provided group
    const messages = await Message.find({ group: req.query.group });

    // Respond with the retrieved messages in the response body
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};
