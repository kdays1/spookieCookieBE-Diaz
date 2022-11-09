const { randomUUID } = require('crypto')

const productsInStorage = [
    {
        "title" :"Chamarra Rosa",
        "price" :"200",
        "thumbnail" : "https://www.google.com/search?q=chamarra+rosa&tbm=isch&ved=2ahUKEwj4xI7244H7AhWwg2oFHbfpDpMQ2-cCegQIABAA&oq=chamarra+&gs_lcp=CgNpbWcQARgBMgQIIxAnMgQIIxAnMggIABCABBCxAzIICAAQgAQQsQMyCAgAEIAEELEDMggIABCABBCxAzILCAAQgAQQsQMQgwEyBQgAEIAEMgUIABCABDILCAAQgAQQsQMQgwE6BAgAEEM6CAgAELEDEIMBOgoIABCxAxCDARBDOgcIABCxAxBDUK0HWIgPYNM5aABwAHgAgAGNAYgB9QiSAQQwLjEwmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=ajFbY_jnD7CHqtsPt9O7mAk&bih=656&biw=1396&rlz=1C1CHBF_esMX810MX810",
        "id" : "25"
    }
]

function allProducts (req, res) {
    let productsPromise = productsInStorage;
    res.json(productsPromise)
}

function oneProduct ({params : {id}}, res) {
    const productPromise = productsInStorage.filter(x => x.id == id);
    if (!productPromise){
        res.json({error: 'producto no encontrado'})
        res.status(404)
    }
    // res.json(JSON.stringify({productPromise}))
    res.json(productPromise.title)
}

function addProduct (req, res) {
    var theObject = req.body
    // theObject.id = productsInStorage.length ? productsInStorage.length-1 : 1
    theObject.id = randomUUID()
    productsInStorage.push(theObject)
    let productAdded = productsInStorage.filter(x => x.id == theObject.id)
    res.status(201)
    res.json(productAdded)
}

function updateProduct ({body, params : {id}}, res) {
    let product2Update = productsInStorage.findIndex(x => x.id == id)
    // productsInStorage = productsInStorage.filter(x => x.id != id)
    if (product2Update == -1) {
        res.status(404)
        res.json({error: 'producto no encontrado'})
    } else {
        // product2Update.title = body.title ? body.title : product2Update.title
        // product2Update.price = body.price ? body.price : product2Update.price
        // product2Update.thumbnail = body.thumbnail ? body.thumbnail : product2Update.thumbnail
        productsInStorage[product2Update] = body;
        res.json (body)
    }
}

function deleteProduct (req, res) {
    productsInStorage = productsInStorage.filter(x => x.id != theId)
    res.send('The product was deleted')
}


exports.deleteProduct = deleteProduct;
exports.addProduct = addProduct;
exports.oneProduct = oneProduct;
exports.allProducts = allProducts;
exports.updateProduct = updateProduct;

// module.exports = {allProducts, oneProduct, addProduct, updateProduct, deleteProduct}