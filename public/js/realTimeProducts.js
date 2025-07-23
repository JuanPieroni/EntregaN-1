console.log("Script cargado")
const socket = io()

//  escucha el evento que envía la litsa actualizada de productos
socket.on("productosActualizados", (productos) => {
    console.log(productos)
    console.log(`Lista actualizada recibida`, productos)
    const lista = document.getElementById("lista-productos")
    lista.innerHTML = ""

    productos.forEach((p) => {
        const li = document.createElement("li")
        li.setAttribute("data-id", p.id)
        li.textContent = `${p.title} - $${p.price} - Stock: ${p.stock}`

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

socket.on("stockUpdated", (producto) => {
    const elemento = document.getElementById(`stock-${producto.id}`)
    if (elemento) elemento.innerText = producto.stock
})

const agregarAlCarrito = (pid) => {
  
  const cid = 2  

  fetch(`/api/carts/${cid}/product/${pid}`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.mensaje)
    })
    .catch((err) => console.error("Error al agregar al carrito", err))
}
