const Card = require('../models/card');

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию.' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId).then((card) => {
    if (card === null) { throw new ReferenceError('Передан несуществующий _id карточки.'); }
    res.status(200).send({ data: card });
  })
    .catch((err) => {
      if (err.name === 'ReferenceError') {
        return res.status(404).send({ message: `${err.message}` });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card === null) { throw new ReferenceError('Передан несуществующий _id карточки.'); }
    res.status(200).send({
      data: card,
    });
  })
    .catch((err) => {
      if (err.name === 'ReferenceError') {
        return res.status(404).send({ message: `${err.message}` });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card === null) { throw new ReferenceError('Передан несуществующий _id карточки.'); }
    res.status(200).send({ data: card });
  })
    .catch((err) => {
      if (err.name === 'ReferenceError') {
        return res.status(404).send({ message: `${err.message}` });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};
