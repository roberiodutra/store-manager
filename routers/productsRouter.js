const express = require('express');

const productsController = require('../controllers/productsController');
const bodyValidation = require('../middlewares/bodyValidation');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);
productsRouter.post('/', bodyValidation, productsController.add);

module.exports = productsRouter;
