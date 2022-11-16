const express = require('express')
const { routerApi }= require('./routers/routerApi.js')
const { routerWeb }= require('./routers/routerWeb.js')
const { engine } = require ('express-handlebars')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.static('public'))
app.engine('handlebars', engine())

app.set('view engine', 'handlebars')

app.use('/productos', routerWeb)
app.use('/api/products', routerApi)


const PORT=8080
const server = app.listen(PORT, () => {
    console.log(`Sever up and listening at port : ${server.address().port}`)
})
server.on('error', error => console.log(`There is an error in the server: ${error}`))