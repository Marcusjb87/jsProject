// Eventos

botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})

modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() // Cuando clickeo sobre el modal, se finaliza la propagacion del click a los elementos
})
