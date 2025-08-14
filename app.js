import express from "express"
import { fileURLToPath } from "url"
import path from "path"
import { engine } from "express-handlebars"
import { createServer } from "http"

import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"

import {
    connectToMongoDB,
    connectToMongoDBAtlas,
} from "./config/db/connect.config.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const httpServer = createServer(app)
const PORT = 8080
const atlas = true

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(path.join(__dirname, "public")))

/** 1) Motor de Plantillas */
app.engine("hbs", engine({ extname: ".hbs" }))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))



app.get("/", (req, res) => {
    res.render("home", {
        title: "Entrega Final Backend I",
    })
})

//ROUTES

app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)

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
