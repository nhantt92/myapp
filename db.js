const mongoose = require('mongoose');

const mongoDB_url = 'mongodb://127.0.0.1/myapp_lib';
mongoose.connect(mongoDB_url);
mongoose.Promise = global.Promise;