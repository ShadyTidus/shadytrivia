import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ socket }) => {
  const [gameCode, setGameCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [creatingGame, setCreatingGame] = useState(false);
  const [category, setCategory] = useState('Horror');
  const [difficulty, setDifficulty] = useState('Easy');
  const [questionCount, setQuestionCount] = useState(5);
  const [answerFormat, setAnswerFormat] = useState('Typing');
  const navigate = useNavigate(); // useNavigate replaces useHistory

  // Function to handle creating a game
  const handleCreateGame = () => {
    if (nickname) {
      socket.emit('create-game', {
        category,
        difficulty,
        questionCount,
        nickname,
        answerFormat,
      });
      
      socket.on('game-created', (data) => {
        navigate(`/game/${data.gameCode}`);
      });
    }
  };

  // Function to handle joining a game
  const handleJoinGame = () => {
    if (gameCode && nickname) {
      socket.emit('join-game', { gameCode, nickname });
      
      socket.on('player-joined', (data) => {
        navigate(`/game/${gameCode}`);
      });
    }
  };

  return (
    <div>
      <h1>Shady Trivia Game</h1>

      {!creatingGame ? (
        <div>
          <button onClick={() => setCreatingGame(true)}>Create Game</button>
          <div>
            <h2>Join Game</h2>
            <input
              type="text"
              placeholder="Game Code"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button onClick={handleJoinGame}>Join Game</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Create Game</h2>
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <div>
            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Horror">Horror</option>
              <option value="Gaming">Gaming</option>
              <option value="Family">Family</option>
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
          <button onClick={handleCreateGame}>Create Game</button>
        </div>
      )}
    </div>
  );
};

export default Home;
