import { Router } from "express"
import { manager } from "../app.js"
import path from "path"
import { fileURLToPath } from "url"

const router = Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

router.get("/products", async (req, res) => {
    try {
        const products = await manager.getProducts()
        res.render("products", {
            title: "Lista de Productos",
            message: "Lista de Productos",
            products,
        })
    } catch (err) {
        res.status(500).send("Error al obtener los productos")
    }
})

router.get("/carts", (req, res) => {
    res.render("carts")
})

export default router
