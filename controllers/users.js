const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users })).catch(() => res.status(500).send({ message: 'Ошибка по умолчанию.' }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) { throw new Error('Пользователь по указанному _id не найден.'); }
      res.status(200).send({
        data: user,
      });
    }).catch((err) => {
      if (err.name === 'Error') { res.status(404).send({ message: `${err.message}` }); }
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.patchUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) { throw new Error('Пользователь с указанным _id не найден.'); }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'Error') { res.status(404).send({ message: `${err.message}` }); }
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
      if (user === null) { throw new Error('Пользователь с указанным _id не найден.'); }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'Error') { res.status(404).send({ message: `${err.message}` }); }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};
