import { Router } from "express"
import fs from "fs"

const cartRouter = (cartManager, productManager) => {
    const router = Router()

    router.post("/", (req, res) => {
        const nuevoCarrito = cartManager.createCart()
        res.status(201).json({ mensaje: `El carrito fue creado con exito` })
    })

    router.get("/", (req, res) => {
        const carritos = cartManager.getCarts()

        res.status(200).json({ title: "Api carts", carritos }) // Si no hay carritos, devuelve []
    })

    router.get("/:cid", (req, res) => {
        const cid = req.params.cid
        const carrito = cartManager.getCartById(cid)
        if (!carrito)
            return res.status(404).json({ mensajes: "Carrito no encontrado" })
        res.status(200).json(carrito.productos)
    })

    router.post("/:cid/product/:pid", (req, res) => {
        const cid = req.params.cid
        const pid = req.params.pid

        const carritoActualizado = cartManager.addProductToCart(cid, pid)
        if (!carritoActualizado)
            return res.status(404).json({
                mensaje: `Carrito con ID ${cid} no encontrado.`,
            })

        const productoActualizado = productManager.restarStock(pid)
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
