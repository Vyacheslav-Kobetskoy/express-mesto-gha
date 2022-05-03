const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users })).catch(() => res.status(500).send({ message: 'Ошибка по умолчанию.' }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) { throw new ReferenceError('Пользователь по указанному _id не найден.'); }
      res.status(200).send({
        data: user,
      });
    }).catch((err) => {
      if (err.name === 'ReferenceError') {
        return res.status(404).send({ message: `${err.message}` });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        res.status(200).send({ data: user });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        }
        return res.status(500).send({ message: 'Ошибка по умолчанию.' });
      });
  });
};

module.exports.patchUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) { throw new ReferenceError('Пользователь с указанным _id не найден.'); }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ReferenceError') {
        return res.status(404).send({ message: `${err.message}` });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) { throw new ReferenceError('Пользователь с указанным _id не найден.'); }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ReferenceError') {
        return res.status(404).send({ message: `${err.message}` });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password).then((user) => {
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
    res.cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: true,
    });
    res.send(user._id);
  })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports.getUserMe = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user._id) {
        throw new Error('Пользователь с указанным _id не найден.');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new Error('Пользователь по указанному _id не найден.');
      }
    });
};
