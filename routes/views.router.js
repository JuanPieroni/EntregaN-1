import { Router } from "express"
import path from "path"
import { fileURLToPath } from "url"

import { productsManager } from "../managers/products.manager.js"

const router = Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

router.get("/products", async (req, res) => {
    try {
        const products = await productsManager.findAllProducts(req.query)
        res.render("index", { products })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al obtener productos")
    }
})

router.get("/carts", (req, res) => {
    res.render("carts")
})

export default router
