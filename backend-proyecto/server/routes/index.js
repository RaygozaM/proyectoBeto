const express = require('express');
const app = express();

app.use(require('./listingsAndReviews'));
app.use(require('./rentas'));
app.use(require('./customer'));


module.exports = app;