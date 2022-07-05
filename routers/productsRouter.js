const express = require('express');

const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);
productsRouter.post('/', productsController.add);
productsRouter.put('/:id', productsController.update);

module.exports = productsRouter;
