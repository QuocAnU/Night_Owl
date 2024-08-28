const express = require('express');
const router = express.Router();
const kanjiController = require('../controllers/Kanji.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

// Get all Kanji
router.get('/kanji', verifyToken, kanjiController.getKanji);

// Get Kanji by ID
router.get('/kanji/:id', verifyToken, kanjiController.getKanjiById);

// Create a new Kanji entry
router.post('/kanji', verifyToken, kanjiController.createKanji);

module.exports = router;
