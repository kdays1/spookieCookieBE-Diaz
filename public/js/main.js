const socket = io();

const formAddProduct = document.getElementById('formAddProduct')
formAddProduct.addEventListener('submit', e => {
    e.preventDefault()

    const product = {
        title: formAddProduct[0].value, // document.getElementById('txtNombre').value
        price: formAddProduct[1].value, // document.getElementById('txtApellido').value
        thumbnail: formAddProduct[2].value
    }

    socket.emit('addProduct', product);

    formAddProduct.reset()
})


socket.on('products', updatingProducts);

async function updatingProducts(products) {

    const productsFile = await fetch('templates/productsInStorage.hbs')

    const productsTemplate = await productsFile.text()

    const productsHld = Handlebars.compile(productsTemplate)

    const html = productsHld({ products })

    document.getElementById('products').innerHTML = html
}