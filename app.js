import express from "express"
import fs from "fs"
import ProductManager from "./managers/ProductManager.js"
import CartManager from "./managers/CartManager.js"
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import { fileURLToPath } from "url"
import path from "path"
import { Server } from "socket.io"
import { engine } from "express-handlebars"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 8080
const manager = new ProductManager("./data/productos.json")
const cartManager = new CartManager("./data/carrito.json")

/** 1) Motor de Plantillas */
app.engine("hbs", engine({ extname: ".hbs" }))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))

/** 2) Carpeta de archivos static y llamados a bootstrap y sweetalert*/
app.use("/static", express.static(path.join(__dirname, "public")))
app.use(
    "/bootstrap",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
)
app.use(
    "/sweetalert2",
    express.static(path.join(__dirname, "node_modules/sweetalert2/dist"))
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

 


//LANDING
 app.get("/", (req, res) => {
   res.render("home", { title: "Home", message: "Bienvenido a la página de inicio" })
})

//PRODUCTOS
app.use("/api/products", productsRouter(manager))

//CARRITOS
app.use("/api/carts", cartRouter(cartManager))

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

//Crear websocket
