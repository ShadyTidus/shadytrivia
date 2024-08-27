const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');
const { handleSocketConnection } = require('./sockets/gameSocket');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/game', gameRoutes);

// WebSocket connection handling
io.on('connection', (socket) => {
  handleSocketConnection(socket, io);
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
