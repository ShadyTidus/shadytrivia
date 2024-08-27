const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  gameCode: {
    type: String,
    required: true,
    unique: true,
  },
  players: {
    type: Map,
    of: {
      score: { type: Number, default: 0 },
      isCreator: { type: Boolean, default: false },
      nickname: { type: String, default: '' },
    },
    default: {},
  },
  category: String,
  questions: [
    {
      question: String,
      choices: [String],
      correctAnswer: String,
      questionType: String,
    }
  ],
  currentQuestionIndex: { type: Number, default: 0 },
  answerFormat: String,
});

module.exports = mongoose.model('Game', GameSchema);
