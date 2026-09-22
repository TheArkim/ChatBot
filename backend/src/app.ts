import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes';

const app = express();
const allowedOrigin = process.env.FRONTEND_URL || '*';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/chatbot', chatRoutes);

export default app;
