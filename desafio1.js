class Contenedor {
    #objectsContained

    constructor() {
        this.#objectsContained = []
    }

    save(theObject) {
        this.#objectsContained.push(theObject)
    }
    getById(theId){
        return this.#objectsContained.filter(x => x.id == theId)
    }
    getAll(){
        return this.#objectsContained
    }
    deleteByID(theId){
        this.#objectsContained = this.#objectsContained.filter(x => x.id != theId)
    }
    deleteAll(){
        this.#objectsContained = []
    }
}

const productos = new Contenedor()

productos.save({id: 0, title: 'Chamarra Rosa', price: 250, thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUPAGmmm_nF83rB0WxsLsECxgUWqeGp5CoDw&usqp=CAU'})
productos.save({id: 1, title: 'Chamarra Azul', price: 150, thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKvevSuf65KREl9xg2kY2IeSBRdMIi7df_cw&usqp=CAU'})

console.log('getAll', productos.getAll())
console.log('getByID', productos.getById(1))

productos.deleteByID(1)

console.log('deleteById', productos.getAll())

productos.deleteAll()

console.log('deleteAll', productos.getAll())