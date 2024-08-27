import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GameLobby = ({ socket }) => {
  const { gameCode } = useParams();
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState([]);
  const navigate = useNavigate(); // useNavigate replaces useHistory

  useEffect(() => {
    // Handle joining the game room
    socket.emit('join-room', gameCode);

    // Listen for updates from the server
    socket.on('player-joined', (data) => {
      setPlayers(data.players);
    });

    socket.on('next-question', (data) => {
      setCurrentQuestion({
        question: data.question,
        choices: data.choices,
        questionType: data.questionType,
      });
    });

    socket.on('game-over', (data) => {
      setGameOver(true);
      setScores(data.scores);
    });

    // Handle disconnection from the game
    socket.on('disconnect', () => {
      navigate('/');
    });

    return () => {
      socket.off('player-joined');
      socket.off('next-question');
      socket.off('game-over');
    };
  }, [gameCode, socket, navigate]);

  // Handle answer submission
  const submitAnswer = (answer, timeRemaining) => {
    socket.emit('submit-answer', { gameCode, answer, timeRemaining });
  };

  if (gameOver) {
    return (
      <div>
        <h2>Game Over</h2>
        <ul>
          {scores.map((score, index) => (
            <li key={index}>{score.nickname}: {score.score}</li>
          ))}
        </ul>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div>
        <h2>Game Code: {gameCode}</h2>
        <h3>Players:</h3>
        <ul>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
        {/* If the user is the creator, show the "Start Game" button */}
        <button onClick={() => socket.emit('start-game', { gameCode })}>
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div>
      {currentQuestion && (
        <div>
          <h2>{currentQuestion.question}</h2>
          {currentQuestion.questionType === 'Multiple Choice' && (
            <ul>
              {currentQuestion.choices.map((choice, index) => (
                <li key={index}>
                  <button onClick={() => submitAnswer(choice, 60)}>{choice}</button>
                </li>
              ))}
            </ul>
          )}
          {currentQuestion.questionType === 'Typing' && (
            <form onSubmit={handleSubmit}>
              <input type="text" name="answer" placeholder="Type your answer..." required />
              <button type="submit">Submit Answer</button>
            </form>
          )}
        </div>
      )}
    </div>
  );

  function handleSubmit(e) {
    e.preventDefault();
    const answer = e.target.elements.answer.value;
    submitAnswer(answer, 60);
  }
};

export default GameLobby;
