const path = require('path');
const cardsFilePath = path.join(__dirname, '..', 'data', 'cards.json');
const readFile = require('../utils/readFile');

const getCards = (req, res) => {
  readFile(cardsFilePath, { 'encoding': 'utf8' })
  .then((cards) => res.status(200).send(cards))
  .catch((err) => res.status(500).send({ message: `Internal server error: ${err}` }))
};

module.exports = getCards;