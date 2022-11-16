const products = [
    {
        "title" :"Chamarra",
        "price" :"200",
        "thumbnail" : "https://cdn1.iconfinder.com/data/icons/clothes-outfit-line-shop-aholic/512/Hooded_top-64.png",
        "id" : "25"
    }
]

function productsForm(req,res) {
    res.render('productsForm');
}

function addProduct(req,res) {
    products.push(req.body);
    console.log(products);
    res.render('products', { products, areProducts: products.length > 0 });
}

function productsInStorage (req,res) {
    res.render('products', { products, areProducts: products.length > 0 });
}

exports.productsForm = productsForm;
exports.productsInStorage = productsInStorage;
exports.addProduct = addProduct;