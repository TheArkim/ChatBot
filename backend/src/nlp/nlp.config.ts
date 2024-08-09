const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en'], forceNER: true });

manager.addDocument('en','hello','greeting');
manager.addDocument('en','hi','greeting');
manager.addDocument('en','hey there','greeting');
manager.addDocument('en','good morning','greeting');
manager.addDocument('en','good afternoon','greeting');
manager.addDocument('en', 'good bye!', 'farewell')
manager.addDocument('en', 'bye bye take care', 'farewell')
manager.addDocument('en', 'okay see you later', 'farewell')
manager.addDocument("en", "tell me about you", "bot");
manager.addDocument("en", "who are you", "bot");
manager.addDocument("en", "do you know some places to visit in costa rica?", "places");
manager.addDocument("en", "i wanna visit a beatiful place", "places");
manager.addDocument("en", "can you recommend a dish for lunch", "food");
manager.addDocument("en", "i'm hungry but t don't know what to eat", "food");
manager.addDocument("en", "Do you know any joke?", "joke");
manager.addDocument("en", "tell me a joke", "joke");


manager.addAnswer('en','greeting','hi, good day !');
manager.addAnswer('en', 'greeting', 'Hey!')
manager.addAnswer('en', 'greeting', 'Hey there')
manager.addAnswer('en', 'greeting', 'Hi')
manager.addAnswer('en', 'farewell', 'till next time')
manager.addAnswer('en', 'farewell', 'see you soon!')
manager.addAnswer('en', 'farewell', 'bye bye')
manager.addAnswer("en", "bot", "I'm a virtual bot, let's say a virtual friend");
manager.addAnswer("en", "bot", "Think of me as a virtual agent");
manager.addAnswer("en", "places", "Maybe you can visit santa elena bay, it's beatiful");
manager.addAnswer("en", "places", "ohh! in cerro pelado you can see an amazing dawn");
manager.addAnswer("en", "food", "maybe you can try some fried chicken with french fries");
manager.addAnswer("en", "food", "sushi never disappoints");
manager.addAnswer("en", "joke", "what do you call a magic dog?  A labracadabrador!");
manager.addAnswer("en", "joke", "what do cows say when they hear a bad joke?  I am not amooosed");

module.exports = manager;