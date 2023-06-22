// MongoDB connection
require("./config/dbConnection");

const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);
const port = 5000;

// Middleware setup
app.use(express.json());
app.use(cors());

// Routes setup
const route = require("./routes/chatRoutes");
app.use("/chat", route);

// Socket.IO connection
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

// Socket.IO event handling
io.on("connection", (socket) => {
  // Join room event
  socket.on("join room", (roomID) => {
    socket.join(roomID);
  });

  // Send message event
  socket.on("sendMessage", (data) => {
    socket.in(data["group"]).emit("sendMessage1", data);
  });

  // Disconnect event
  socket.on("dis", (data) => {
    socket.leave(data);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
