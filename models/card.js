const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlenght: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^http[s]{0,1}?:\/\/(www.)?[a-zA-Z0-9\-._~:\/?%#\[\]@!$&'()*+,;=]*/.test(v);
      },
      message: 'Provide valid URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
