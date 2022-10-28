const { Console } = require('console');
let fs = require('fs')
const { json } = require('stream/consumers')
// const http = require ('http')
// const connectedServer = server.listen(8080, () => {
//     console.log('Servidor Http escuchando en el puerto ${connectedServer.address().port}')
// })
const express = require('express')
const app = express()
const PORT = 8080

class Contenedor {
    #objectsContained

    constructor() {
        this.#objectsContained = []
    }

    save(theObject) {
        // this.#objectsContained.push(theObject)
        fs.readFile('theFile.json', function (err,data) {
            if (err) {
                console.log('There was an error while reading the file');
            } else {
                //extracting info and pushing new object
                let productsInFile = JSON.parse(data);
                productsInFile = productsInFile.Productos;
                theObject.id = productsInFile.length;
                productsInFile.push(theObject);
                // console.log(productsInFile);
                // console.log(JSON.stringify(productsInFile));
                //writing info to file
                fs.writeFile('theFile.json', '{"Productos" :' + JSON.stringify(productsInFile) + '}', error => {
                    if (error) {
                        console.log('There was an error when saving the info');
                    } else {
                        console.log('The product with ID: '+ theObject.id + ' was saved :)');
                    }
                })
            }
        })
    }

    async getById(theId) {
        const productPromise = await new Promise ((resolve, reject) => {
            return fs.readFile('theFile.json', function (err,data) {
                if (err) {
                    console.log('There was an error while reading the file');
                    return reject()
                } else {
                var productsInFile = JSON.parse(data);
                productsInFile = productsInFile.Productos;
                var contents = productsInFile.filter(x => x.id == theId);
                return resolve(contents);
                }
            });
        })
        console.log('getByIdPromise',productPromise);
        return productPromise;
    }

    async getAll(){
        // return this.#objectsContained
        let productsPromise = await fs.promises.readFile('theFile.json', 'utf-8');
        const products = await JSON.parse(productsPromise);
        console.log(products.Productos)
        console.log('LENGTH', products.Productos.length)
        return (products.Productos);
    }

    deleteByID(theId){
        // this.#objectsContained = this.#objectsContained.filter(x => x.id != theId)
        fs.readFile('theFile.json', function (err,data) {
            if (err) {
                console.log('There was an error while reading the file');
            } else {
                //extracting info and pushing new object
                var productsInFile = JSON.parse(data);
                productsInFile = productsInFile.Productos;
                productsInFile = productsInFile.filter(x => x.id != theId);
                // console.log('deleteByID: ', productsInFile);
                //writing info to file
                fs.writeFile('theFile.json', '{"Productos" :' + JSON.stringify(productsInFile) + '}', error => {
                    if (error) {
                        console.log('There was an error when saving the info');
                    } else {
                        console.log('The product with ID: '+ theId + ' was deleted :)');
                    }
                })
            }
        })
    }
    deleteAll(){
        // this.#objectsContained = []
        fs.writeFile('theFile.json', '', error => {
            if (error) {
                console.log('There was an error when deleting all files');
            } else {
                console.log('All the products were deleted');
            }
        })
    }
}

const productos = new Contenedor()

// Function save

// productos.save({title: 'Chamarra Guinda', price: 150, thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUPAGmmm_nF83rB0WxsLsECxgUWqeGp5CoDw&usqp=CAU'});


// Function getById

    // let gettingObject = productos.getById(1);

//Function getAll

    var gettingAllObjects = productos.getAll();


app.get('/productos', async (req,res) => {
    // console.log('La peticion fue enviada', gettingAllObjects)
    let products = await productos.getAll();
    res.json(JSON.stringify({products}))
})

app.get('/productoRandom', async (req,res) => {
    let rand = Math.floor(Math.random() * 3)
    let product = await productos.getById(rand);
    res.json(JSON.stringify({product}))
})

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))