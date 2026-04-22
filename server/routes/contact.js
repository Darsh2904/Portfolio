const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/contactController');

// POST /api/contact  — send a message
router.post('/', sendMessage);

// GET /api/contact   — get all messages (protect in production with auth)
router.get('/', getMessages);

module.exports = router;
