import ProductManager from "./ProductManager.js"
import CartManager from "./CartManager.js"
import fs from "fs"
import express from "express"
const app = express()
const PORT = 8080
const manager = new ProductManager("productos.json")
const cartManager = new CartManager("carrito.json")



app.use(express.json())

//PRODUCTOS
app.get("/", (req, res) => {
    res.status(200).send("Entrega 1 de Backend. Comision 74305")
})

app.get("/api/products", (req, res) => {
    const productos = manager.getProducts()
    res.status(200).json(productos)
})

app.get("/api/products/:pid", (req, res) => {
    const id = parseInt(req.params.pid)
    const producto = manager.getProductById(id)
    if (producto) {
        res.status(200).json(producto)
    } else {
        res.status(404).json({ error: "Producto no encontrado" })
    }
})

app.post("/api/products", (req, res) => {
    const datos = req.body
    const nuevoProducto = manager.addProduct(datos)
    res.status(201).json(nuevoProducto)
})

app.put("/api/products/:pid", (req, res) => {
    const id = parseInt(req.params.pid)
    const productos = manager.getProducts()
    const producto = productos.find((p) => p.id === id)
    if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" })
    }
    const { title, description, price, code, stock } = req.body
    if (title) producto.title = title
    if (description) producto.description = description
    if (price) producto.price = price
    if (code) producto.code = code
    if (stock) producto.stock = stock

    fs.writeFileSync(manager.path, JSON.stringify(productos))
    res.status(200).json({
        message: `Producto ${producto.id} actualizado`,
        producto,
    })
})

app.delete("/api/products/:pid", (req, res) => {
    const id = parseInt(req.params.pid)
    let productos = manager.getProducts()
    const existe = productos.find((p) => p.id === id)

    if (!existe) {
        return res
            .status(404)
            .json({ mensaje: "No se pudo eliminar. Productto inexistente" })
    }
    productos = productos.filter((p) => p.id !== id)
    fs.writeFileSync(manager.path, JSON.stringify(productos))
    res.status(200).send(`Producto ${id}   eliminado`)
})

//CARRITOS


app.post('/api/carts', (req, res) => {
  const nuevoCarrito = cartManager.createCart()
  res.status(201).json( {mensaje: `El carrito fue creado con exito`})
})


app.get('/api/carts', (req, res) => {
  const carritos = cartManager.getCarts()
  res.status(200).json(carritos)  // Si no hay carritos, devuelve []
})


app.get('/api/carts/:cid', (req, res) => {
    const cid = req.params.cid
  const carrito = cartManager.getCartById(cid)
  if (!carrito) return res.status(404).json({ mensajes: 'Carrito no encontrado' })
  res.status(200).json(carrito.productos)
})


app.post("/api/carts/:cid/product/:pid", (req, res) => {
  const cid = req.params.cid
  const pid = req.params.pid

  const carritoActualizado = cartManager.addProductToCart(cid, pid)
  if (!carritoActualizado) 
    return res.status(404).json({ 
     mensaje: `Carrito con ID ${cid} no encontrado.` 
    })
  res.status(200).json({ 
    mensaje: `Producto ID ${pid} agregado al carrito ID ${cid}.`, 
    cart: carritoActualizado 
  })
})



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
