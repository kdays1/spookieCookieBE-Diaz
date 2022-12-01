const express = require('express');
const adminAuth = require('../middlewares/middleAdmin')
const { allProducts, oneProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/controllerProducts.js')

const routerProducts = express.Router();

routerProducts.get('/', allProducts);
routerProducts.get('/:id', oneProduct);
routerProducts.post('/', adminAuth, addProduct);
routerProducts.put('/:id', adminAuth, updateProduct);
routerProducts.delete('/:id', adminAuth, deleteProduct);

exports.routerProducts = routerProducts;