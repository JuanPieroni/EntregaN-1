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
/* console.log("config", config) */



import {
    connectToMongoDB,
    connectToMongoDBAtlas,
} from "./config/db/connect.config.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const usersRouter = new userRouter()
const app = express()
const httpServer = createServer(app)
const PORT = config.port
const atlas = config.useAtlas



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
app.use("/api/users", usersRouter.getRouter()) //Todo : aca ver como hacer para que ande el usersRouter ( es una clase)

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
//Todo borrar esta verga de prueba
/* console.log(process.cwd());
console.log(`Servidor iniciado con PID: ${process.pid}`) */
/* console.log(process.argv.slice(2)) */
/* console.log(process.memoryUsage())
console.log(process.env) */
/* console.log("process", process); */
//todo mandar esto a commander u otro archivo en config

/* const env = process.argv[2]
switch (env) {
    case "dev":
        console.log("MODO DE DESARROLLO")
        break
    case "prod":
        console.log("MODO DE PRODUCCION")
        break
    case "test":
        console.log("MODO DE TESTEO")
        break
    default:
        console.log("No env")
        break
} */
startServer()
