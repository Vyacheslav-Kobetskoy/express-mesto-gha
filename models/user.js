const mongoose = require('mongoose');
const { isEmail, isURL } = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [isURL, 'Ошибка валидации'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Ошибка валидации'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw Error('Неправильные почта или пароль');
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new Error('Неправильные почта или пароль');
      }
      return user;
    });
  });
};

module.exports = mongoose.model('User', userSchema);
