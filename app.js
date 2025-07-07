import ProductManager from "./ProductManager.js"
import fs from "fs"
import express from "express"
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
    res.json(producto)
})

app.delete("/api/products/:pid", (req, res) => {
    const id = parseInt(req.params.pid)
    let productos = manager.getProducts()
    const existe = productos.find((p) => p.id === id)

    if (!existe) {
        return res.status(404).json({ mensaje: "Producto no encontrado" })
    }
    productos = productos.filter((p) => p.id !== id)
    fs.writeFileSync(manager.path, JSON.stringify(productos))
    res.send()
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
