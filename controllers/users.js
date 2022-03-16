const User = require('../models/user');


const handleError = (err, res) => {
  if ( err.name === 'ValidationError' ) {
    err.statusCode = 400
    err.message = "Bad request"
  } else if (err.name === 'DocumentNotFoundError') {
    err.statusCode = 404
    err.message = "The requested User is not found."
  } else {
    err.statusCode = 500
    err.message = "Internal Server Error"
  }
  res.status(err.statusCode).send({ message: `${err.name} - ${err.message}` });
};


const getUsers = (req, res) => {
  User.find()
    .orFail()
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => handleError(err, res));
};

const getUsersProfile = (req, res) => {
  User.findById({ _id: req.params.userId })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => handleError(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar})
    .then(user => res.status(201).send({ data: user }))
    .catch((err) => handleError(err, res));
};

const updateProfile = (req, res) => {
  const { name } = req.body;
  const { _id } = req.params;
  console.log(_id, name);

  User.findByIdAndUpdate(
    _id,
    { name },
    {
      new: true,
      runValidators: true, // Don't think this is enforcing validation
      upsert: true
    })
    .orFail()
    .then((user) => {
      res.send({ data: user })
    })
    .catch((err) => handleError(err, res));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  console.log(_id, avatar);

  User.findByIdAndUpdate(
    _id,
    { avatar },
    {
      new: true,
      runValidators: true, // Don't think this is enforcing validation
      upsert: true
    })
    .orFail()
    .then((user) => {
      res.send({ data: user })
    })
    .catch((err) => handleError(err, res));
};

module.exports = {  getUsers, getUsersProfile,
                    createUser, updateProfile,
                    updateAvatar };
