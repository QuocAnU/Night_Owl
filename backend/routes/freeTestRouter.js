// routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const { getQuestions } = require('../controllers/FreeTest.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/free-test', verifyToken, getQuestions);

module.exports = router;
