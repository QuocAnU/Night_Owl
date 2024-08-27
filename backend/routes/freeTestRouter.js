// routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const { getQuestions, submitAnswers } = require('../controllers/FreeTest.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/free-test', verifyToken, getQuestions);
router.post('/submit-answers', verifyToken, submitAnswers);

module.exports = router;
