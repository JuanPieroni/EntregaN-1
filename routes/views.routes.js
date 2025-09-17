import { Router } from "express"
import path from "path"
import { fileURLToPath } from "url"
import { productsManager } from "../managers/products.manager.js"
import { cartsManager } from "../managers/carts.manager.js"
import { authenticateJWT } from "../middlewares/auth.middleware.js"


const viewsRouter = Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

viewsRouter.get("/products", authenticateJWT, async (req, res) => {
    try {
        const products = await productsManager.findAllProducts(req.query)
        
        // Pasar carrito del usuario autenticado
        res.render("index", { 
            products, 
            userCartId: req.user.cart,
            user: req.user

        })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al obtener productos")
    }
})

viewsRouter.get("/cart/:cid", async (req, res) => {
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

viewsRouter.get("/carts", async (req, res) => {
    try {
        const carts = await cartsManager.findAllCarts()
         
        res.render("carts", { carts })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al obtener carritos")
    }
})

viewsRouter.get("/login", (req, res) => {
    res.render("login")
})

viewsRouter.get("/register", (req, res) => {
    res.render("register")
})

viewsRouter.get("/profile", authenticateJWT, (req, res) => {
    console.log("req.user en /profile:", req.user)
    res.render("profile", { user: req.user })
})

export default viewsRouter
