// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const { createComment, getComments } = require('../controllers/Comment.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

// Define the route and link it to the controller method
router.post('/comments', verifyToken , createComment);
router.get('/comments', verifyToken, getComments);
// Export the router
module.exports = router;
