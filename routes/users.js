const router = require('express').Router();
const {
  patchUserInfoJoi, patchAvatarJoi, parameterIdJoi,
} = require('../middlewares/JoiValidate');
const {
  getUser, getUserId, patchUserInfo, patchAvatar, getUserMe,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.get('/users', auth, getUser);
router.get('/users/me', auth, getUserMe);
router.get('/users/:userId', auth, parameterIdJoi('userId'), getUserId);
router.patch('/users/me', auth, patchUserInfoJoi, patchUserInfo);
router.patch('/users/me/avatar', auth, patchAvatarJoi, patchAvatar);

module.exports = router;
