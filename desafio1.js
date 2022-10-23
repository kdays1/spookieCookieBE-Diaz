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
                var productsInFile = JSON.parse(data);
                productsInFile = productsInFile.Productos;
                theObject.id = productsInFile.length;
                productsInFile.push(theObject);
                console.log(productsInFile);
                console.log(JSON.stringify(productsInFile));
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

    getById(theId) {
        // return this.#objectsContained.filter(x => x.id == theId)
        // const content = () => fs.readFile('theFile.json', function (err,data) {
        //     if (err) {
        //         console.log('There was an error while reading the file');
        //     } else {
        //         //extracting info and getting the required object
        //         var productsInFile = JSON.parse(data);
        //         productsInFile = productsInFile.Productos;
        //         console.log(productsInFile);
        //         console.log(productsInFile.filter(x => x.id == theId));
        //         var contents = productsInFile.filter(x => x.id == theId);
        //     }
        // })
        // return content;
        const content = () => fs.readFileSync('theFile.json')
        var productsInFile = JSON.parse(content());
        productsInFile = productsInFile.Productos;
        var contents = productsInFile.filter(x => x.id == theId);
        return contents;
    }

    getAll(){
        // return this.#objectsContained
        const content = () => fs.readFileSync('theFile.json')
        var productsInFile = JSON.parse(content());
        return productsInFile.Productos;
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
                console.log('estos: ', productsInFile);
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

    var gettingObject = productos.getById(1);
    console.log('getByID', gettingObject);

//Function getAll

    var gettingAllObjects = productos.getAll();
    console.log('getAll', gettingAllObjects)


//Function deleteBy

setTimeout(productos.deleteByID, 300, 0);

//Function deleteAll

setTimeout(productos.deleteAll, 600);