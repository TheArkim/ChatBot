import express from 'express';
import { processMessage } from '../controllers/chatController';
const router = express.Router();

router.get('/', processMessage);

export default router;