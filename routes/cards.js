const router = require('express').Router();
const {
  getCard,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');
const { auth } = require('../middlewares/auth');
const { createCardJoi, parameterIdJoi } = require('../middlewares/JoiValidate');

router.get('/cards', auth, getCard);
router.post('/cards', auth, createCardJoi, createCard);
router.delete('/cards/:cardId', auth, parameterIdJoi('cardId'), deleteCard);
router.put('/cards/:cardId/likes', auth, parameterIdJoi('cardId'), likeCard);
router.delete('/cards/:cardId/likes', auth, parameterIdJoi('cardId'), dislikeCard);

module.exports = router;
