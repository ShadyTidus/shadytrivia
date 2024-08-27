const TriviaQuestion = require('./models/TriviaQuestion');
const Game = require('./models/Game');

// Placeholder for active games in memory
const games = {};

// Handling a new connection
function handleConnection(io, socket) {
  // When a player joins a room
  socket.on('join-room', async (gameCode) => {
    let game = await Game.findOne({ gameCode });

    if (!game) {
      socket.emit('error', { message: 'Game not found' });
      return;
    }

    // Add the player to the room in the database and in memory
    if (!game.players[socket.id]) {
      game.players[socket.id] = { score: 0 };
      await game.save();
    }

    // Join the room
    socket.join(gameCode);

    // Notify everyone in the room about the updated player list
    io.to(gameCode).emit('player-joined', { players: Object.keys(game.players) });

    // If the game has started, send the current question to the player
    if (game.currentQuestionIndex > 0) {
      socket.emit('next-question', {
        question: game.questions[game.currentQuestionIndex].question,
        choices: game.questions[game.currentQuestionIndex].choices,
        questionType: game.questions[game.currentQuestionIndex].questionType,
      });
    }
  });

  // Handle creating a game
  socket.on('create-game', async (data) => {
    const gameCode = generateGameCode();
    const questions = await TriviaQuestion.find({
      category: data.category,
      difficulty: data.difficulty,
    }).limit(data.questionCount);

    if (questions.length > 0) {
      const formattedQuestions = questions.map((question) => {
        if (data.answerFormat === 'Hybrid') {
          question.questionType = Math.random() > 0.5 ? 'Typing' : 'Multiple Choice';
        } else {
          question.questionType = data.answerFormat;
        }
        return question;
      });

      const newGame = new Game({
        gameCode,
        players: {
          [socket.id]: {
            score: 0,
            isCreator: true,
            nickname: data.nickname,
          }
        },
        category: data.category,
        questions: formattedQuestions,
        currentQuestionIndex: 0,
        answerFormat: data.answerFormat,
      });

      await newGame.save();
      games[gameCode] = newGame;  // Store the game in memory as well

      socket.join(gameCode);  // Join the room associated with this game
      io.to(gameCode).emit('game-created', { gameCode, players: Object.keys(newGame.players), isCreator: true });
    } else {
      socket.emit('error', { message: 'No questions available for this category and difficulty' });
    }
  });

  // Handle starting the game
  socket.on('start-game', async (data) => {
    const game = games[data.gameCode];
    if (game && game.players[socket.id].isCreator) {
      broadcastNextQuestion(io, game);
    }
  });

  // Handle submitting an answer
  socket.on('submit-answer', async (data) => {
    const game = games[data.gameCode];
    if (game) {
      const player = game.players[socket.id];
      const question = game.questions[game.currentQuestionIndex];

      if (question.correctAnswer === data.answer) {
        const points = calculatePoints(data.timeRemaining);
        player.score += points;
        await game.save();  // Save the updated score to the database
      }

      if (game.currentQuestionIndex < game.questions.length - 1) {
        game.currentQuestionIndex++;
        await game.save();
        broadcastNextQuestion(io, game);
      } else {
        endGame(io, game);
      }
    }
  });

  // Handle disconnecting from the game
  socket.on('disconnect', async () => {
    console.log('A user disconnected');
    // Optional: Handle removing the player from the game or marking them as disconnected
  });
}

// Helper functions

const broadcastNextQuestion = (io, game) => {
  const question = game.questions[game.currentQuestionIndex];
  io.to(game.gameCode).emit('next-question', {
    question: question.question,
    choices: question.choices,
    questionType: question.questionType,
  });
};

const endGame = (io, game) => {
  const scores = Object.entries(game.players).map(([id, player]) => ({
    nickname: player.nickname,
    score: player.score,
  })).sort((a, b) => b.score - a.score);

  io.to(game.gameCode).emit('game-over', { scores });

  // Clean up the game in memory and the database
  delete games[game.gameCode];
  game.remove();
};

const generateGameCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const calculatePoints = (timeRemaining) => {
  return Math.floor(timeRemaining * 10);
};

module.exports = { handleConnection };
