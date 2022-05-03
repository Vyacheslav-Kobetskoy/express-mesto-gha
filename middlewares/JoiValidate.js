const { celebrate, Joi } = require('celebrate');

const getUserIdJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const patchUserInfoJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const patchAvatarJoi = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
});

module.exports = { getUserIdJoi, patchUserInfoJoi, patchAvatarJoi };
