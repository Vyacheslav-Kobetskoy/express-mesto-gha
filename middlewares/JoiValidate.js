const { celebrate, Joi } = require('celebrate');

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

const createUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createCardJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
});

const parameterIdJoi = (id) => celebrate({
  params: Joi.object().keys({
    [id]: Joi.string().hex(),
  }),
});
module.exports = {
  patchUserInfoJoi,
  patchAvatarJoi,
  createUserJoi,
  loginJoi,
  createCardJoi,
  parameterIdJoi,
};
