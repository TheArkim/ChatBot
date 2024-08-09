const nlpService = require('../nlp/nlpService');

exports.processMessage = async (req:any, res:any) => {
  const { message } = req.query;

  try {
    const response = await nlpService.processMessage(message);
    res.send({data:response});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};