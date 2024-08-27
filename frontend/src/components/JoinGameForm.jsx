import React, { useState } from 'react';

const JoinGameForm = ({ onJoinGame }) => {
  const [gameCode, setGameCode] = useState('');
  const [nickname, setNickname] = useState('');

  const handleJoinGame = (e) => {
    e.preventDefault();
    if (nickname && gameCode) {
      onJoinGame(gameCode, nickname);
    } else {
      alert("Please enter a nickname and a game code.");
    }
  };

  return (
    <div>
      <h2>Join Game</h2>
      <form onSubmit={handleJoinGame}>
        <div>
          <label>Game Code:</label>
          <input
            type="text"
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value)}
            required
          />
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
        <button type="submit">Join Game</button>
      </form>
    </div>
  );
};

export default JoinGameForm;
