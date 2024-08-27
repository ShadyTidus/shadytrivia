const { v4: uuidv4 } = require('uuid');
let games = {}; // In-memory storage for games

// Create a new game
exports.createNewGame = (category, mode, numQuestions) => {
  const accessCode = uuidv4().slice(0, 6); // Generate a short access code
  const game = {
    id: uuidv4(),
    accessCode,
    category,
    mode,
    numQuestions,
    players: [],
    questions: [], // Populate with questions from the database
    currentQuestion: 0,
    status: 'waiting', // waiting, in-progress, completed
  };

  // Store the game in memory
  games[accessCode] = game;
  return game;
};
