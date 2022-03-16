const router = require('express').Router();
const { getCards, getCardInfo, createCard } = require('../controllers/cards');

router.get('/', getCards);
router.get('/:cardId', getCardInfo);
router.post('/', createCard);
// router.put('/:cardId/likes', likeCard);
// router.delete('/:cardId/likes', unlikeCard);

module.exports = router;
