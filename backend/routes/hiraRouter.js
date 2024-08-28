const express = require('express');
const router = express.Router();
const { getHira } = require('../controllers/Hira.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/hira', verifyToken, getHira);

module.exports = router;