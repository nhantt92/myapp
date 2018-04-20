const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
