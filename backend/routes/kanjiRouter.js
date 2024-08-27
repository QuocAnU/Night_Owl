const express = require('express');
const router = express.Router();
const kanjiController = require('../controllers/Kanji.controller');

// Get all Kanji
router.get('/kanji', kanjiController.getAllKanji);

// Get Kanji by ID
router.get('/kanji/:id', kanjiController.getKanjiById);

// Create a new Kanji entry
router.post('/kanji', kanjiController.createKanji);

module.exports = router;
