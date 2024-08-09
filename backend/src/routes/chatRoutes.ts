import express from 'express';

const chatController = require('../controllers/chatController');
const router = express.Router();

router.get('/', chatController.processMessage);

module.exports = router;