const express = require('express');

const salesController = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.getById);
salesRouter.post('/', salesController.createSale);
salesRouter.delete('/:id', salesController.remove);
salesRouter.put('/:id', salesController.update);

module.exports = salesRouter;
