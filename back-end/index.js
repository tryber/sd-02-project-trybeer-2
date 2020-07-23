require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
  console.log('pong');
  res.send('ping');
});

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
