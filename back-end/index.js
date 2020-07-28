require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const errorController = require('./controller/errorController');
const userController = require('./controller/userController');
const productController = require('./controller/productController');
const middlewares = require('./middleware/validateJwt');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', userController.loginUser);
app.post('/register', userController.createUser);

app.get('/products', middlewares.loginJwt, productController.getAllProducts);
app.get('/products/:id', middlewares.loginJwt, productController.getProductById);

app.use(errorController.promiseErrors);

app.all('*', errorController.endpointNotFound);

const NODE_PORT = process.env.NODE_PORT || 3001;

app.listen(NODE_PORT, () => console.log(`Listening on ${NODE_PORT}`));
