const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/users', verifyToken, userController.createUser);
router.get('/users', verifyToken, userController.getUser);
router.get('/users/discount', verifyToken, userController.getUserDiscount);

router.post('/users/checkout', verifyToken, userController.autoMark);

module.exports = router;