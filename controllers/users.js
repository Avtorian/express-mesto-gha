const User = require('../models/user');
const { responseСodes } = require('../utils/responseСodes');

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(responseСodes.internalServerError).send({ message: err.message }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        res.status(responseСodes.notFound).send({ message: 'Пользователь не найден !' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(responseСodes.badRequest).send({ message: 'Передан некорретный Id пользователя !' });
      } else {
        res.status(responseСodes.internalServerError).send({ message: err.message });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(responseСodes.created).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(responseСodes.badRequest).send({ message: 'Переданы некорректные данные !' });
      } else {
        res.status(responseСodes.internalServerError).send({ message: err.message });
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user === null) {
        res.status(responseСodes.notFound).send({ message: 'Пользователь не найден !' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(responseСodes.badRequest).send({ message: 'Переданы некорректные данные !' });
      } else {
        res.status(responseСodes.internalServerError).send({ message: err.message });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user === null) {
        res.status(responseСodes.notFound).send({ message: 'Пользователь не найден !' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(responseСodes.badRequest).send({ message: 'Переданы некорректные данные !' });
      } else {
        res.status(responseСodes.internalServerError).send({ message: err.message });
      }
    });
};
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
