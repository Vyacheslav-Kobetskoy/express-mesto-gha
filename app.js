const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const UserRouter = require('./routes/users');
const CardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { createUserJoi, loginJoi } = require('./middlewares/JoiValidate');
const { errorHandler } = require('./middlewares/errorHandler');
const NotFoundError = require('./error/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signin', loginJoi, login);
app.post('/signup', createUserJoi, createUser);

app.use(UserRouter);
app.use(CardRouter);

app.use(auth, (req, res, next) => next(new NotFoundError('404 Not Found')));
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
