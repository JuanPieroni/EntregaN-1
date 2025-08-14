import { Router } from "express"
import { cartsManager } from "../managers/CartManager"

const router = Router()

router.post("/", async (req, res) => {
    const cart = await cartsManager.create()
    res.status(201).json({
        mensaje: `El carrito fue creado con exito`,
        status: "success",
        payload: cart,
    })
})

router.put("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params
    const { cantidad } = req.body
    const cart = await cartsManager.updateCantidadProducto(cid, pid, cantidad)
    res.status(200).json({ status: "success", payload: cart })
})

router.put("/:cid", async (req, res) => {
    const { cid } = req.params
    const nuevoProducto = req.body.products
    const cart = await cartsManager.updateCartProducts(cid, nuevoProducto)
    res.status(200).json({ status: "success", payload: cart })
})



router.get("/", (req, res) => {
    res.status(200).json({ title: "Api carts", carritos })
})

router.get("/:cid", (req, res) => {
    res.status(404).json({ mensajes: "Carrito no encontrado" })
    res.status(200).json(carrito.productos)
})

router.post("/:cid/product/:pid", (req, res) => {})

export default router
