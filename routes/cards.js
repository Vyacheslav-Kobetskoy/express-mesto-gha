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
router.post('/cards', createCardJoi, auth, createCard);
router.delete('/cards/:cardId', parameterIdJoi('cardId'), auth, deleteCard);
router.put('/cards/:cardId/likes', parameterIdJoi('cardId'), auth, likeCard);
router.delete('/cards/:cardId/likes', parameterIdJoi('cardId'), auth, dislikeCard);

module.exports = router;
