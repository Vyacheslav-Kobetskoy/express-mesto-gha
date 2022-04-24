const Card = require('../models/card')

module.exports.getCard = (req, res) => {
    Card.find({})
        .then((cards) => res.send({ data: cards }))
        .catch((err) => console.log(err));
};

module.exports.createCard = (req, res) => {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    Card.create({ name, link, owner: ownerId })
        .then((card) => res.status(200).send({ data: card }))
        .catch((err) => {
            console.log(err)
        })
}

module.exports.deleteCard = (req, res) => {
    Card.findByIdAndDelete(req.params.cardId).then((card) => res.status(200).send({ data: card }))
        .catch((err) => {
            console.log(err)
        })
}

module.exports.likeCard = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } }, 
        { new: true },
    ).then((card) => res.status(200).send({ data: card }))
        .catch((err) => {
            console.log(err)
        })

}

module.exports.dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } }, 
        { new: true },
    ).then((card) => res.status(200).send({ data: card }))
        .catch((err) => {
            console.log(err)
        })
}