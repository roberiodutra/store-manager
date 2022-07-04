const express = require('express');

const salesController = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.getById);
salesRouter.post('/', salesController.createSale);

module.exports = salesRouter;
