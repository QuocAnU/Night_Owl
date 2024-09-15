const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/users', verifyToken, userController.createUser);
router.get('/users', verifyToken, userController.getUser);
router.get('/users/discount', verifyToken, userController.getUserDiscount);

router.post('/users/discount', verifyToken, userController.createUseDiscount);

router.get('/users/mark', verifyToken, userController.autoMark);

router.get('/users/free-premium', verifyToken, userController.getFreePremium);

module.exports = router;