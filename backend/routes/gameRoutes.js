const express = require('express');
const { createGame } = require('../controllers/gameController');
const router = express.Router();

// POST /api/game/create
router.post('/create', createGame);

module.exports = router;
