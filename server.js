const express = require('express')
const { routerCart }= require('./routers/routerCart.js')
const { routerProducts }= require('./routers/routerProducts.js')
const { routerWeb } = require('./routers/routerWeb')
const { engine } = require ('express-handlebars')
// const { Server: HttpServer } = require('http')
// const { Server: Socket } = require('socket.io')

const app = express()
// const httpServer = new HttpServer(app)

app.use('/api/products', routerProducts)
app.use('/api/shoppingCart', routerCart)
app.use('/', routerWeb)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

// --------------------CODE FOR SOCKETS --------------------------
// const io = new Socket(httpServer)

app.engine('handlebars', engine())

app.set('view engine', 'handlebars')

// const products = []
// const messages = []

// io.on('connection', (socket) => {
//     //Products Form
//     socket.emit('products', products)

//     socket.on('addProduct', producto => {
//         products.push(producto)
//         io.sockets.emit('products', products)
    // })

    //Chat Messages
    // socket.emit('messages', messages);
    // socket.on('newMessage', message => {
    //     message.date = new Date().toLocaleString()
    //     messages.push(message)
    //     console.log(messages)
    //     io.sockets.emit('messages', messages)
    // })
// })

const PORT=8080
const server = app.listen(PORT, () => {
    console.log(`Sever up and listening at port : ${server.address().port}`)
})
server.on('error', error => console.log(`There is an error in the server: ${error}`))