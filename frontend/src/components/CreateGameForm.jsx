import React, { useState } from 'react';

const CreateGameForm = ({ onCreateGame }) => {
  const [category, setCategory] = useState('Horror');
  const [difficulty, setDifficulty] = useState('Easy');
  const [questionCount, setQuestionCount] = useState(5);
  const [nickname, setNickname] = useState('');
  const [answerFormat, setAnswerFormat] = useState('Typing');

  const handleCreateGame = (e) => {
    e.preventDefault();
    if (nickname) {
      onCreateGame(category, difficulty, questionCount, nickname, answerFormat);
    } else {
      alert("Please enter a nickname.");
    }
  };

  return (
    <div>
      <h2>Create Game</h2>
      <form onSubmit={handleCreateGame}>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Horror">Horror</option>
            <option value="Serial Killers">Serial Killers</option>
            <option value="WoW Lore">WoW Lore</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div>
          <label>Difficulty:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <label>Number of Questions:</label>
          <input
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(e.target.value)}
            min="1"
          />
        </div>
        <div>
          <label>Answer Format:</label>
          <select value={answerFormat} onChange={(e) => setAnswerFormat(e.target.value)}>
            <option value="Typing">Typing</option>
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label>Nickname:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Game</button>
      </form>
    </div>
  );
};

export default CreateGameForm;
