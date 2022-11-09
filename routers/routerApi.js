const express = require('express');
const { allProducts, oneProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/controllerApi.js')

const routerApi = express.Router();

// router.get('/', function(req,res){
//     res.sendFile(__dirname + '/index.html');
// })
routerApi.get('/', allProducts);
routerApi.get('/:id', oneProduct);
routerApi.post('/', addProduct);
routerApi.put('/:id', updateProduct);
routerApi.delete('/:id', deleteProduct);

exports.routerApi = routerApi;