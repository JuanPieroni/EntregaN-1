import ProductManager from "./ProductManager.js"
const express = require("express")
const app = express()
const PORT = 8080
const manager = new ProductManager("productos.json")
app.use(express.json())
app.get("/", (req, res) => {
    res.status(200).send("Entrega 1 de Backend. Comision 74305")
})
app.get("/api/products", (req, res) => {
    const productos = manager.getProducts()
    res.json(productos)
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
    if (
        !datos.title ||
        !datos.description ||
        !datos.price ||
        !datos.code ||
        !datos.stock
    ) {
        return res.status(400).json({ error: "Faltan datos del producto" })
    }
    const nuevoProducto = manager.addProduct(datos)
    res.status(201).json(nuevoProducto)
})
app.put("/api/products/:pid", (req, res) => {
    


})
app.delete("/api/products/:pid", (req, res) => {})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
