import manager from './nlp.config';

export const processMessage = async (message: string): Promise<string> => {
  const response = await manager.process('en', message);
  return response.answer || `I'm sorry. I can understand you, please ask me something else`;
};