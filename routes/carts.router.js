import { Router } from "express"
import fs from "fs"
import { io } from "../app.js"

const cartRouter = (cartManager, productManager) => {
    const router = Router()

    router.post("/", async (req, res) => {
        try {
            const nuevoCarrito = await cartManager.createCart()
            res.status(201).json({ mensaje: `El carrito fue creado con exito` })
        } catch (error) {
            res.status(500).json({ mensaje: "Error al crear el carrito" })
        }
    })

    router.get("/", async (req, res) => {
        const carritos = await cartManager.getCarts()
        res.status(200).json({ title: "Api carts", carritos })
    })

    router.get("/:cid", async (req, res) => {
        const cid = req.params.cid
        const carrito = await cartManager.getCartById(cid)
        if (!carrito) {
            return res.status(404).json({ mensajes: "Carrito no encontrado" })
        }
        res.status(200).json(carrito.productos)
    })

    router.post("/:cid/product/:pid", async (req, res) => {
        const cid = req.params.cid
        const pid = req.params.pid

        const carritoActualizado = await cartManager.addProductToCart(cid, pid)
        if (!carritoActualizado) {
            return res.status(404).json({
                mensaje: `Carrito con ID ${cid} no encontrado.`,
            })
        }

        const productoActualizado = await productManager.restarStock(pid)
        if (productoActualizado) {
            io.emit("stockUpdated", productoActualizado)
        }

        res.status(200).json({
            mensaje: `Producto ID ${pid} agregado al carrito ID ${cid}.`,
            cart: carritoActualizado,
            product: productoActualizado,
        })
    })
    return router
}

export default cartRouter
