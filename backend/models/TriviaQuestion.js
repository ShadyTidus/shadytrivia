const mongoose = require('mongoose');

const triviaQuestionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    choices: [String],
});

const TriviaQuestion = mongoose.model('TriviaQuestion', triviaQuestionSchema);

module.exports = TriviaQuestion;
