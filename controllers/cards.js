const Card = require('../models/card');
const { errCodes } = require('../utils/errCodes');

const getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send(cards))
    .catch((err) => res.status(errCodes.internalServerError).send({ message: err.message }));
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errCodes.badRequest).send({ message: 'Переданы некорректные данные !' });
      } else {
        res.status(errCodes.internalServerError).send({ message: err.name });
      }
    });
};
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errCodes.notFound).send({ message: 'Карточка не найдена !' });
      } else {
        res.status(errCodes.internalServerError).send({ message: err.message });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errCodes.notFound).send({ message: 'Карточка не найдена !' });
      } else if (err.name === 'ValidationError') {
        res.status(errCodes.badRequest).send({ message: 'Переданы некорректные данные !' });
      } else {
        res.status(errCodes.internalServerError).send({ message: err.message });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errCodes.notFound).send({ message: 'Карточка не найдена !' });
      } else if (err.name === 'ValidationError') {
        res.status(errCodes.badRequest).send({ message: 'Переданы некорректные данные !' });
      } else {
        res.status(errCodes.internalServerError).send({ message: err.message });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
