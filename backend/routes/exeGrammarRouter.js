const express = require('express');
const router = express.Router();

const exeGrammarController = require('../controllers/ExeGrammar.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/exe-grammar', verifyToken, exeGrammarController.getExeGrammar);

router.post('/exe-grammar/submit-answers', verifyToken, exeGrammarController.submitAnswer);

module.exports = router;
