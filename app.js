const express = require('express');

const app = express();
const rescue = require('express-rescue');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routers');

app.use(helmet());
app.use(morgan('common'));

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', rescue(router.productsRouter));

module.exports = app;
