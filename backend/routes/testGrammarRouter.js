const express = require('express');
const router = express.Router();

const testGrammarController = require('../controllers/TestGrammar.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/test-grammar', verifyToken, testGrammarController.getTestGrammar);

router.post('/test-grammar/submit-answers', verifyToken, testGrammarController.submitAnswer);

module.exports = router;
