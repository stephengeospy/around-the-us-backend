const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 2,
    maxlength: 30
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^http[s]{0,1}?:\/\/(www.)?[a-zA-Z0-9\-._~:\/?%#\[\]@!$&'()*+,;=]*/.test(v);
      },
      message: "Provide a valid URL"
    }
  }
});

module.exports = mongoose.model('user', userSchema);