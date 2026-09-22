import config from '../config/config.json';
import app from './app';
import manager from './nlp/nlp.config';

const port = Number(process.env.PORT || config.PORT);

if (!Number.isInteger(port) || port <= 0 || port > 65535) {
  throw new Error(`Invalid PORT configuration: ${port}`);
}

const startServer = async (): Promise<void> => {
  try {
    await manager.train();
    await manager.save();

    app.listen(port, () => {
      console.log(`Chatbot server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start chatbot server:', error);
    process.exitCode = 1;
  }
};

if (require.main === module) {
  void startServer();
}

export { startServer };
