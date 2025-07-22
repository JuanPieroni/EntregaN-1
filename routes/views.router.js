import { Router } from "express"
import ProductManager from "../managers/ProductManager.js"  
import path from "path"
import { fileURLToPath } from "url"

const router = Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const manager = new ProductManager(
    path.join(__dirname, "../data/productos.json")
)

router.get("/products", async (req, res) => {
    try {
        const products = await manager.getProducts()
        res.render("products", { products })
    } catch (err) {
        res.status(500).send("Error al obtener los productos")
    }
})

export default router
