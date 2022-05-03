const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUserId, createUser, patchUserInfo, patchAvatar,
} = require('../controllers/users');

const name = Joi.string().min(2).max(30);
const about = Joi.string().min(2).max(30);
const avatar = Joi.string().uri();
const email = Joi.string().required().email();
const password = Joi.string().required();

router.get('/users', getUser);
router.get('/users/:userId', celebrate({
  body: Joi.object().keys({
  }),
}), getUserId);
router.post('/users', celebrate({
  body: Joi.object().keys({
    name, about, avatar, email, password,
  }),
}), createUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({ name, about }),
}), patchUserInfo);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({ avatar }),
}), patchAvatar);

module.exports = router;
