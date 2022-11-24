const socket = io();


//Products Form
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

//Chat messages

const sendMessage = document.getElementById('sendButton')
sendMessage.addEventListener('click', e => {
    const user = document.getElementById('user')
    const userMessage = document.getElementById('userMessage')
    if (user.value && userMessage.value) {
        const message = {
            user: user.value,
            content: userMessage.value
        }
        socket.emit('newMessage', message)
    } else {
        alert('You need to write your username and a message')
    }
})

function renderMessages(messages) {
    console.log(messages)
    const messagesInbox = messages.map(({user, content, date}) => {
        return `<li>${date} :: ${user} :: ${content}</li>`
    })

    const messagesHtml = `
    <ul>
        ${messagesInbox.join('\n')}
    </ul>`

    const messagesRender = document.getElementById('messages')
    messagesRender.innerHTML = messagesHtml
}

socket.on('messages', messages => {
    renderMessages(messages)
})



