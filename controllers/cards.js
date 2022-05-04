const Card = require('../models/card');
const NotFoundError = require('../error/NotFoundError');
const BadRequestError = require('../error/BadRequestError');
const ForbiddenError = require('../error/ForbiddenError');

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).then((card) => {
    if (card === null) {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    }
    const { owner } = card;
    if (req.user._id !== owner.toJSON()) {
      throw new ForbiddenError('Недосаточно прав для удаления карточки');
    }
    return Card.findByIdAndDelete(req.params.cardId)
      .then((deleteCard) => res.status(200).send({ data: deleteCard }));
  }).catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Карточка с указанным _id не найдена.'));
    }
    next(err);
  });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card === null) { throw new NotFoundError('Передан несуществующий _id карточки.'); }
    res.status(200).send({
      data: card,
    });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'));
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card === null) { throw new NotFoundError('Передан несуществующий _id карточки.'); }
    res.status(200).send({ data: card });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'));
      }
      next(err);
    });
};
