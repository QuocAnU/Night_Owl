const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/users', verifyToken, userController.createUser);

module.exports = router;