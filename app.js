import express from "express"
import { fileURLToPath } from "url"
import path from "path"
import { engine } from "express-handlebars"
import { createServer } from "http"
import cookieParser from "cookie-parser"
import { passport } from "./config/passport.config.js"

import productsRouter from "./routes/products.routes.js"
import cartRouter from "./routes/carts.routes.js"
import viewsRouter from "./routes/views.routes.js"
import sessionsRouter from "./routes/sessions.routes.js"
import userRouter from "./routes/users.routes.js"
import config from "./config/env.config.js"
import MongoSingleton from "./config/db/connect.config.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const usersRouter = new userRouter()
const app = express()
const httpServer = createServer(app)
const PORT = config.port


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(passport.initialize())

app.use("/static", express.static(path.join(__dirname, "public")))

/** 1) Motor de Plantillas */
app.engine("hbs", engine({ extname: ".hbs" }))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
    res.render("home", {
        title: "BackEnd II - Entrega 1",
        buttons: true,
    })
})

//ROUTES

app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/api/users", usersRouter.getRouter())

const startServer = async () => {
    try {
        const mongoConn = new MongoSingleton()
        await mongoConn.connect(config.useAtlas)

        httpServer.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error("Error al iniciar el servidor:", error)
    }
}

startServer()
