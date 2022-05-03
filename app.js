const express = require('express');
const mongoose = require('mongoose');

const { auth } = require('./middlewares/auth');
const { createUserJoi, loginJoi } = require('./middlewares/JoiValidate');
const { login, createUser } = require('./controllers/users');
const UserRouter = require('./routes/users');
const CardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signin', loginJoi, login);
app.post('/signup', createUserJoi, createUser);
app.use(auth);
app.use(UserRouter);
app.use(CardRouter);
app.use((req, res) => res.status(404).send({ message: '404 Not Found' }));

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

// app.listen(PORT);
