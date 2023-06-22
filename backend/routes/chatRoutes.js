const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Message routes

// Route to create a new message
router.post("/addmessages", messageController.createMessage);

// Route to get messages by group
router.get("/getmessagesbygroup", messageController.getMessagesByGroup);

// Export the router
module.exports = router;
