
// Selectores que vamos a utilizar para modificar nuestro DOM:

const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')

const precioTotal = document.getElementById('precioTotal')

const cantidadTotal = document.getElementById('cantidadTotal')

const botonComprar = document.getElementById('finalizar-compra')


// Primero, vamos a importar nuestros productos localmente al HTML, desde nuestro archivo .json:

let dataJson = ""
fetch("https://github.com/Marcusjb87/jsProject/blob/data.json")
    .then( (res) => res.json())
    .then( (data) => {
        dataJson = data
        data.forEach((producto) => {
            const div = document.createElement('div')
            div.classList.add('producto')
            div.innerHTML = `
            <img src=${producto.img} alt= "">
            <h3>${producto.nombre}</h3>
            <p>${producto.tipo}</p>
            <p>Marca: ${producto.marca}</p>
            <p class="precioProducto">Precio: $ ${producto.precio}</p>
            <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
            `
            contenedorProductos.appendChild(div)
            // Para agregar luego nuestros productos al Carrito:
            const boton = document.getElementById(`agregar${producto.id}`)
            boton.addEventListener('click', () => {
                agregarAlCarrito(producto.id)
            })
        })
    })


// Para agregar productos al Carrito:

let carrito = [] // Inicializamos nuestro Array en 0

const agregarAlCarrito = (prodId) => {
    // Para aumentar la cantidad del ítem, sin que se repita:
    const existe = carrito.some (prod => prod.id === prodId)
    if (existe){
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
        const item = dataJson.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito() // Llamamos a esta función, cada vez que se modifica el Carrito
}


// Para eliminar elementos del Carrito:

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}


// Para actualizar la información del modal del Carrito:

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" // Para tener la info del Carrito actualizada
    // Definimos la estructura de nuestro modal:
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)        
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    contadorCarrito.innerText = carrito.length // Para actualizar el contador
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0) //Para ir actualizando el importe del Precio Total
}


// Para que no se borre nuestro Carrito al actualizar la página:

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})


// Para vaciar completamente nuestro Carrito:

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})


// Para finalizar la Compra:

botonComprar.addEventListener("click", () => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Muchas gracias por tu compra!!!',
        showConfirmButton: false,
        timer: 1500
      })
})
