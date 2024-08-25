const express = require('express');
const router = express.Router();
const MediaController = require('../controllers/Media.controllers');

router.post('/media', MediaController.upload);

module.exports = router;
