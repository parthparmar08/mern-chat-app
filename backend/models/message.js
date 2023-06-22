const mongoose = require("mongoose");

// Define the message schema using Mongoose.Schema
const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
    enum: ["IT", "Sales", "HR"], // Restrict the 'group' field to specific values: IT, Sales, HR
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current timestamp
  },
});

// Create a Mongoose model named 'Message' based on the 'messageSchema'
const Message = mongoose.model("Message", messageSchema);

// Export the 'Message' model to be used in other files
module.exports = Message;
