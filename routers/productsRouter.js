const express = require('express');

const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);

module.exports = productsRouter;
