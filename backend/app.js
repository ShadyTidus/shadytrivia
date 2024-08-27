const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./db');
const trivia = require('./trivia');  // Importing trivia logic

// Initialize Express and Socket.io
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://trivia.shady.kyfho.us",  // Allow CORS for your frontend
    methods: ["GET", "POST"]
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Handling Socket.io connections and game logic
io.on('connection', (socket) => {
  console.log('A user connected');
  trivia.handleConnection(io, socket);  // Delegating the trivia logic to trivia.js
});

// Start the server
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
