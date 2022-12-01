const { randomUUID } = require('crypto')

const cartsInStorage = []

function createCart (req, res) {
    let newCart = []
    newCart.id = randomUUID()
    cartsInStorage.push(newCart)
    res.json(newCart.id)
}

function deleteCart ({body, params : {id}}, res) {
    const cartToDelete = cartsInStorage.findIndex(c => c.id === id);
    if (!cartToDelete){
        res.json({error: 'cart not found'})
        res.status(404)
    }
    const deletedCart = cartsInStorage.splice(cartToDelete, 1);
    const cartPromise = []
    cartPromise.id = id
    cartsInStorage.push(cartPromise)
    res.send('Products deleted')
}

function addToCart ({body, params : {id}}, res) {
    var productToAdd = body.id
    const currentCart = cartsInStorage.findIndex(c => c.id === id);
    if (!currentCart){
        res.json({error: 'cart not found'})
        res.status(404)
    } else {
        const theCart = cartsInStorage.filter(x => x.id != id)
            // theCart.title = body.name ? body.name : theCart.id
            // theCart.title = body.name ? body.name : theCart.name
            // theCart.price = body.price ? body.price : theCart.price
            // theCart.thumbnail = body.thumbnail ? body.thumbnail : theCart.thumbnail
        theCart.products.push(productToAdd)
        cartsInStorage.splice(currentCart, 1);
        productsInStorage.push(theCart)
        res.status(201)
        res.json(theCart)
    }
}

function listCart ({body, params : {id}}, res) {
    const insideCart = cartsInStorage.findIndex(c => c.id === id);
    if (insideCart == -1) {
        res.status(404)
        res.json({error: 'cart not found'})
    } else {
        const cartToShow = cartsInStorage[insideCart].products
        res.json(cartToShow)
    }
}

function deleteFromCart ({body, params : {id}}, res) {
    const insideCarts =  cartsInStorage.findIndex(c => c.id === id);
    if (insideCarts == -1) {
        res.status(404)
        res.json({error: 'cart not found'})
    } else {
        const insideTheCart = cartsInStorage[insideCarts].products
        const productInCart = insideTheCart.findIndex(c => c.id === body.id);
        insideTheCart.splice(productInCart, 1);
        res.json(insideTheCart)
    }
}


exports.createCart = createCart;
exports.deleteCart = deleteCart;
exports.addToCart = addToCart;
exports.listCart = listCart;
exports.deleteFromCart = deleteFromCart;

// module.exports = {allProducts, oneProduct, addProduct, updateProduct, deleteProduct}