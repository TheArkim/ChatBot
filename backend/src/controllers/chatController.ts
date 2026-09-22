import { Request, Response } from 'express';
import { processMessage as processNlpMessage } from '../nlp/nlpService';

export const processMessage = async (req: Request, res: Response): Promise<void> => {
  const { message } = req.query;

  if (typeof message !== 'string' || message.trim().length === 0) {
    res.status(400).json({ error: 'The message query parameter is required' });
    return;
  }

  if (message.length > 500) {
    res.status(400).json({ error: 'The message must not exceed 500 characters' });
    return;
  }

  try {
    const response = await processNlpMessage(message.trim());
    res.status(200).json({ data: response });
  } catch (error) {
    console.error('Failed to process chatbot message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};