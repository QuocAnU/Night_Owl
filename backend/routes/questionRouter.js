const express = require('express');
const router = express.Router();

const questionController = require('../controllers/Question.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/questions', verifyToken, questionController.getAllQuestions);
router.get('/read', verifyToken, questionController.getAllQuestions);
router.post('/submit-answer', verifyToken, questionController.submitAnswer);
router.post('/submit-answer-image', verifyToken, questionController.submitAnswerImage);
router.post('/submit-answer-listen', verifyToken, questionController.submitAnswerListen);

module.exports = router;
