const { createNewGame } = require('../services/gameService');

// Controller for creating a new game
exports.createGame = (req, res) => {
  const { category, mode, numQuestions } = req.body;
  const game = createNewGame(category, mode, numQuestions);
  res.status(201).json({ accessCode: game.accessCode, game });
};
