import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import GameLobby from './components/GameLobby';

const App = ({ socket }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/game/:gameCode" element={<GameLobby socket={socket} />} />
      </Routes>
    </Router>
  );
};

export default App;
