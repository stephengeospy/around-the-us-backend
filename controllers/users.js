const User = require('../models/user');


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


const getUsers = (req, res) => {
  User.find()
    .orFail()
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => handleError(err, res));
};

const getUsersProfile = (req, res) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
      }
      res.status(200).send(user);
    })
    .catch((err) => handleError(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar})
    .then(user => res.status(201).send({ data: user }))
    .catch((err) => handleError(err, res));
};


module.exports = { getUsers, getUsersProfile, createUser };
