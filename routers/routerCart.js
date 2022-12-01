const express = require('express');
const { createCart, deleteCart, addToCart, listCart, deleteFromCart } = require('../controllers/controllerCart.js');

const routerCart = express.Router()

routerCart.post('/', createCart);
routerCart.delete('/:idCart', deleteCart);
routerCart.post('/:idCart/products', addToCart);
routerCart.get('/:idCart/products', listCart);
routerCart.delete('/:idCart/products/:idProduct', deleteFromCart);

exports.routerCart = routerCart;