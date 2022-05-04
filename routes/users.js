const router = require('express').Router();
const { getUserIdJoi, patchUserInfoJoi, patchAvatarJoi } = require('../middlewares/JoiValidate');
const {
  getUser, getUserId, patchUserInfo, patchAvatar, getUserMe,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.get('/users', auth, getUser);
router.get('/users/me', auth, getUserMe);
router.get('/users/:userId', getUserIdJoi, auth, getUserId);
// router.post('/users', createUser);
router.patch('/users/me', patchUserInfoJoi, patchUserInfo);
router.patch('/users/me/avatar', patchAvatarJoi, patchAvatar);

module.exports = router;
