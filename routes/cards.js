const router = require("express").Router();
const {
  getCard,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require("../controllers/cards");

router.get("/cards", getCard);
router.post("/cards", createCard);
router.delete("/cards/:cardId", deleteCard);
router.put("/cards/:cardId/likes", likeCard);
router.delete("/cards/:cardId/likes", dislikeCard);

module.exports = router;
