const express = require('express');

const storeController = require('../controllers/storeController');

const storeRouter = express.Router();

storeRouter.get('/', storeController.getAll);
storeRouter.get('/:id', storeController.getById);

module.exports = storeRouter;
