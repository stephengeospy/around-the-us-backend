const path = require('path');
const readFile = require('../utils/readFile');
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  readFile(usersFilePath, res)
  .then((users) => res.status(200).send(users))
  .catch((err) => {
    res.status(500).send({ message: `Internal server error: ${err}`});
  });
}

const getUsersProfile = (req, res) => {
  readFile(usersFilePath, res)
  .then((users) => users.find(user => user._id === req.params.id))
    .then(user => {
      if(!user) {
        res.status(404).send({ message: `User ID not found` })
      }
      res.status(200).send(user)
    })
  .catch((err) => res.status(404).send({ message: `Internal server error : ${err}`}));
};

module.exports = { getUsers, getUsersProfile };