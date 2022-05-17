require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../error/NotFoundError');
const BadRequestError = require('../error/BadRequestError');
const User = require('../models/user');
const ConflictError = require('../error/ConflictError');
const UnauthorizedError = require('../error/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users })).catch(next);
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) { throw new NotFoundError('Пользователь по указанному _id не найден.'); }
      res.status(200).send({
        data: user,
      });
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Пользователь по указанному _id не найден.'));
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => User.findById(user._id)).then((user) => {
        res.status(200).send({ data: user });
      }).catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
        }
        if (err.code === 11000) {
          next(new ConflictError('email существует в базе данных'));
        }
        next(err);
      });
  }).catch(next);
};

module.exports.patchUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) { throw new NotFoundError('Пользователь с указанным _id не найден.'); }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      }
      next(err);
    });
};

module.exports.patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) { throw new NotFoundError('Пользователь с указанным _id не найден.'); }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password).then((user) => {
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
    res.cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: true,
    });
    res.status(200).send({ token });
  })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user._id) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.status(200).send(user);
    })
    .catch(next);
};
