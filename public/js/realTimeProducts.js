console.log("Script cargado")
const socket = io()

//  Escuchar el evento que envía la lista actualizada de productos
socket.on("productosActualizados", (productos) => {
    console.log(`Lista actualizada recibida`, productos)
    const lista = document.getElementById("lista-productos")
    lista.innerHTML = ""

    productos.forEach((p) => {
        const li = document.createElement("li")
        li.setAttribute("data-id", p.id)
        li.textContent = `${p.title} - ${p.price} - ${p.stock}`
        lista.appendChild(li)
    })
})

socket.on("productoEliminado", (id) => {
    console.log("producto eliminado", id)

    const elemento = document.getElementById(`producto-${id}`)
    if (elemento) {
        elemento.remove()
    }
})
