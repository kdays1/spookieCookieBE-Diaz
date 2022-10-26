const { Console } = require('console');
var fs = require('fs')
const { json } = require('stream/consumers')

function callb(these, objectId) {
    return objectId;
}

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
        const productsPromise = await new Promise ((resolve, reject) => {
            return fs.readFile('theFile.json', function (err,data) {
                if (err) {
                    console.log('There was an error while reading the file');
                    return reject()
                } else {
                var productsInFile = JSON.parse(data);
                productsInFile = productsInFile.Productos;
                return resolve(productsInFile);
                }
            });
        })
        console.log('getAllPromise',productsPromise);
        return productsPromise;
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

productos.save({title: 'Chamarra Guinda', price: 150, thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUPAGmmm_nF83rB0WxsLsECxgUWqeGp5CoDw&usqp=CAU'});


// Function getById
    // async function getPRoductById() {
    //     try {
    //         var gettingObject = await productos.getById(1);
    //     }
    //     catch(err){
    //         console.log('error')
    //     }
    //     console.log('getById', gettingObject);
    // }
    // getPRoductById()
    let gettingObject = productos.getById(1);

//Function getAll

    var gettingAllObjects = productos.getAll();


//Function deleteBy

setTimeout(productos.deleteByID, 300, 0);

//Function deleteAll

setTimeout(productos.deleteAll, 600);

console.log('getById', gettingObject);
console.log('getAll', gettingAllObjects);