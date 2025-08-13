import express from "express"
import fs from "fs"
import ProductManager from "./managers/ProductManager.js"
import CartManager from "./managers/CartManager.js"
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"

import { fileURLToPath } from "url"
import path from "path"

import { engine } from "express-handlebars"
import { createServer } from "http"
import {
    connectToMongoDB,
    connectToMongoDBAtlas,
} from "./config/db/connect.config.js"

export const manager = new ProductManager("./data/productos.json")
const cartManager = new CartManager("./data/carrito.json")

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const httpServer = createServer(app)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/** 1) Motor de Plantillas */
app.engine("hbs", engine({ extname: ".hbs" }))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))

app.use("/static", express.static(path.join(__dirname, "public")))


//LANDING
app.get("/", (req, res) => {
    res.render("home", {
        title: "Home",
        message: "Bienvenido a la página de inicio",
    })
})

//rutas api


app.use("/", viewsRouter)
//PRODUCTOS EN JSON
app.use("/api/products", productsRouter(manager))
//CARRITOS EN JSON
app.use("/api/carts", cartRouter(cartManager, manager))



const PORT = 8080

const atlas = true

const startServer = async () => {
    if (!atlas) {
        try {
            await connectToMongoDB()
            httpServer.listen(PORT, () => {
                console.log(`Servidor corriendo en http://localhost:${PORT}`)
            })
        } catch (error) {
            console.error("Error al iniciar el servidor:", error)
        }
    } else {
        try {
            await connectToMongoDBAtlas()
            httpServer.listen(PORT, () => {
                console.log(`Servidor corriendo en http://localhost:${PORT}`)
            })
        } catch (error) {
            console.error("Error al iniciar el servidor:", error)
        }
    }
}

startServer()
