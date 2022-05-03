const router = require('express').Router();
const { getUserIdJoi, patchUserInfoJoi, patchAvatarJoi } = require('../middlewares/JoiValidate');
const {
  getUser, getUserId, createUser, patchUserInfo, patchAvatar, getUserMe,
} = require('../controllers/users');

router.get('/users', getUser);
router.get('/users/me', getUserMe);
router.get('/users/:userId', getUserIdJoi, getUserId);
router.post('/users', createUser);
router.patch('/users/me', patchUserInfoJoi, patchUserInfo);
router.patch('/users/me/avatar', patchAvatarJoi, patchAvatar);

module.exports = router;
