import { Router } from "express"
import fs from "fs"
import { io } from "../app.js"

const cartRouter = (cartManager, productManager) => {
    const router = Router()

    router.post("/", async (req, res) => {
        try {
            const nuevoCarrito = await cartManager.createCart()
            res.status(201).json({
                mensaje: `El carrito ${nuevoCarrito.id} fue creado con exito`,
            })
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
        const producto = await productManager.getProductById(pid)
        if (!producto) {
            return res.status(404).json({
                mensaje: `El producto con ID ${pid} no existe.`,
            })
        }
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

    router.delete("/:cid", async (req, res) => {
        const cid = parseInt(req.params.cid)

        const carritoEliminado = await cartManager.deleteCart(cid)

        if (!carritoEliminado) {
            return res.status(404).json({ mensaje: "Carrito no encontrado" })
        }

        // Emitir por socket

        return res.json({
            mensaje: "Carrito eliminado correctamente",
            carrito: carritoEliminado,
        })
    })

    return router
}

export default cartRouter
