require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controller/errorController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
  console.log('pong');
  res.send('ping');
});

app.use(errorController.promiseErrors);

app.all('*', errorController.endpointNotFound);

const { PORT } = process.env || 3001;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
