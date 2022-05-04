const router = require('express').Router();
const {
  getCard,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');
const { auth } = require('../middlewares/auth');
const { createCardJoi } = require('../middlewares/JoiValidate');

router.get('/cards', auth, getCard);
router.post('/cards', createCardJoi, auth, createCard);
router.delete('/cards/:cardId', auth, deleteCard);
router.put('/cards/:cardId/likes', auth, likeCard);
router.delete('/cards/:cardId/likes', auth, dislikeCard);

module.exports = router;
