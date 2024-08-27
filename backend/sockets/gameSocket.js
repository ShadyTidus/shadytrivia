const games = require('../services/gameService').games;

exports.handleSocketConnection = (socket, io) => {
  socket.on('joinGame', ({ accessCode, nickname }) => {
    const game = games[accessCode];
    if (game) {
      game.players.push({ id: socket.id, nickname, score: 0 });
      socket.join(accessCode);
      io.to(accessCode).emit('playerJoined', game.players);
    } else {
      socket.emit('error', 'Game not found');
    }
  });

  // Handle other game events (answering questions, etc.)
  // ...
};
