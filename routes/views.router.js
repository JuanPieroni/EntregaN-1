import { Router } from "express"
import path from "path"
import { fileURLToPath } from "url"

import { productsManager } from "../managers/products.manager.js"
import { cartsManager } from "../managers/carts.manager.js"

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

router.get("/cart/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartsManager.getCartById(cid)

        if (!cart) return res.status(404).send("Carrito no encontrado")

        res.render("cart", { cart })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al cargar el carrito")
    }
})

router.get("/carts", async (req, res) => {
    try {
        const carts = await cartsManager.findAllCarts()
         
        res.render("carts", { carts })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al obtener carritos")
    }
})

export default router
