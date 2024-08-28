const express = require('express');
const router = express.Router();
const { getKata } = require('../controllers/Kata.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/kata', verifyToken, getKata);
module.exports = router;