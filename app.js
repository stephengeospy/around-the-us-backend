const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

// middleware to add a static user id for all requests
app.use((req, res, next) => {
  req.user = {
    _id: '62276a8f3e4f81452b66ebda'
  };
  next();
});

app.use(express.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => res.
  status(404).send({ message: 'Requested resource not found' })
);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
