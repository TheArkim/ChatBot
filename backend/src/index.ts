import express from 'express';
const cors = require('cors')

const config = require('../config/config.json');
const chatRoutes = require('../src/routes/chatRoutes');
const manager = require('../src/nlp/nlp.config');

const app = express();
const port = config.PORT

app.use(cors())

app.use('/chatbot', chatRoutes);


manager.train().then(() => {
  manager.save();
  app.listen(port, () => {
    console.log(`Chatbot server is running on port ${port}`);
  });
});
