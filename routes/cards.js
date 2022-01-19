const router = require('express').Router();
const getCards = require('../controllers/cards');

router.get('/', getCards);

module.exports = router;

// const cards_path = path.join(__dirname, '../data/cards.json');

// cards_router.get('/', (req, res) => {
//   const data = fs.readFile(cards_path, {'encoding': 'utf8'}, (err, data) => {
//     if (err) {
//       res.send(404, `Error fetching cards data - ${err}`);
//     }

//     console.log(`Cards Data: ${JSON.parse(data)}`);
//     res.send(200, JSON.parse(data));
//   });
// })
