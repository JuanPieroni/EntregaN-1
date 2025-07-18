import express from "express"
import fs from "fs"
import ProductManager from "./managers/ProductManager.js"
import CartManager from "./managers/CartManager.js"
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"

const app = express()
const PORT = 8080
const manager = new ProductManager("productos.json")
const cartManager = new CartManager("carrito.json")

app.use(express.json())

//PRODUCTOS
app.get("/", (req, res) => {
    res.send("Entrega nro 1 Backend comision 37405")
})

app.use("/api/products", productsRouter(manager))

//CARRITOS
app.use("/api/carts", cartRouter(cartManager))

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
