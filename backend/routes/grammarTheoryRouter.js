const express = require('express');
const router = express.Router();
const grammarTheoryController = require('../controllers/GrammarTheory.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

// Get all GrammarTheory
router.get('/grammar-theory', verifyToken, grammarTheoryController.getGrammarTheory);

module.exports = router