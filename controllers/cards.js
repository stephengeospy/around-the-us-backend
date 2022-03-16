const Card = require('../models/card');

const handleError = (err, res) => {
  if (err.name === 'ValidationError') {
    err.statusCode = 400;
    err.message = 'Bad request';
  } else if (err.name === 'DocumentNotFoundError') {
    err.statusCode = 404;
    err.message = 'The requested Card is not found.';
  } else {
    err.statusCode = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.statusCode).send({ message: `${err.name} - ${err.message}` });
};

const getCards = (req, res) => {
  Card.find()
    .orFail()
    .then((cardData) => res.status(200).send({ data: cardData }))
    .catch((err) => handleError(err, res));
};

const getCardInfo = (req, res) => {
  Card.findById({ _id: req.params.cardId })
    .orFail(() => {
      const err = new Error('No card found with that id');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => handleError(err, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => { res.status(200).send(card); })
    .catch((err) => handleError(err, res));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((card) => res.status(202).send({ card }))
    .catch((err) => handleError(err, res));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((card) => res.send({ card }))
    .catch((err) => handleError(err, res));
};

module.exports = {
  getCards,
  getCardInfo,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
