const express = require('express');
// const { addProduct } = require('../controllers/controllerApi.js');
const {productsForm, productsInStorage } = require('../controllers/controllerWeb.js')

const routerWeb = express.Router()

routerWeb.get('/', productsInStorage);
// routerWeb.post('/', addProduct);
routerWeb.get('/form', productsForm);

exports.routerWeb = routerWeb;