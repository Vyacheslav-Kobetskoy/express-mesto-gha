const { celebrate, Joi } = require('celebrate');

const linkJoi = (value, helper) => {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

  if (!regex.test(value)) {
    return helper.message('Validation failed');
  }
  return value;
};
const patchUserInfoJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const patchAvatarJoi = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().custom(linkJoi),
  }),
});

const createUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri().custom(linkJoi),
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
    link: Joi.string().required().custom(linkJoi),
  }),
});

const parameterIdJoi = (id) => celebrate({
  params: Joi.object().keys({
    [id]: Joi.string().length(24).hex().required(),
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
