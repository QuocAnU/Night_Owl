const express = require('express');
const router = express.Router();

const testVocalController = require('../controllers/TestVocal.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/test-vocal', verifyToken, testVocalController.getTestVocal);

router.post('/test-vocal/submit-answers', verifyToken, testVocalController.submitAnswer);

module.exports = router;
