const manager = require('./nlp.config');

exports.processMessage = async (message:any) => {
  const response = await manager.process('en', message);
  return response.answer || `I'm sorry. I can understand you, please ask me something else`;
};