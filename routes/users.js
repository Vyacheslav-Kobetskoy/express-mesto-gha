const router = require('express').Router();
const {
  getUser, getUserId, createUser, patchUserInfo, patchAvatar,
} = require('../controllers/users');

router.get('/users', getUser);
router.get('/users/:userId', getUserId);
router.post('/users', createUser);
router.patch('/users/me', patchUserInfo);
router.patch('/users/me/avatar', patchAvatar);

module.exports = router;
