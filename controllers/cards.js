const Card = require('../models/card');

const handleError = (err, res) => {
  if ( err.name === 'ValidationError' ) {
    err.statusCode = 400
    err.message = "Bad request"
  } else {
    err.statusCode = 500
    err.message = "Internal Server Error"
  }
  res.status(err.statusCode).send({ message: `${err.message} - ${err.name}` });
};

const getCards = (req, res) => {
  Card.find()
    .orFail()
    .then(cardData => res.status(200).send({ data: cardData }))
    .catch((err) => handleError(err, res));
};

const getCardInfo = (req, res) => {
  Card.findById({ _id: req.params.cardId })
    .orFail(() => {
      const err = new Error("No card found with that id");
      err.statusCode = 404;
      throw err;
    })
    .then(card => res.status(200).send({ data: card }))
    .catch((err) => handleError(err, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card}))
    .catch((err) => handleError(err, res));
};

module.exports = { getCards,  getCardInfo, createCard };
